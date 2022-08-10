const { User } = require('@models/User');
const bcrypt = require('bcryptjs');
const { createToken } = require('@helpers/createToken');
const { checkErrors } = require('@helpers/checkErrors');
const { uploadTocloudinary } = require('@helpers/CloudinarySetup');

const register = async (req, res) => {
	try {
		checkErrors(req, res);

		const { username, email, password } = req.body;

		const isUserExist = await User.findOne({ email });

		if (isUserExist) {
			return res.status(409).send('A user with this email exists');
		}

		//Encrypt user password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// Create user in our database
		const image = req?.file?.path ? await uploadTocloudinary(req.file.path, 'farm-images') : '';

		const user = await User.create({
			username,
			email: String(email).toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
			profile: image?.url,
		});

		const token = await createToken(user._id, user.email);
		user.token = token;

		const finalUserObject = {};

		// remove password from object
		Object.keys(user._doc).forEach(
			(key) => key !== 'password' && (finalUserObject[key] = user[key])
		);

		res.status(201).json({ user: finalUserObject });
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error.message);
	}
};

const login = async (req, res) => {
	try {
		checkErrors(req, res);

		const { password, email } = req.body;

		// Validate if user exist in our database
		const user = await User.findOne({ email: String(email).toLowerCase() });

		const compare = user ? await bcrypt.compare(password, user?.password) : null;

		if (user && compare) {
			// Create token
			const token = await createToken(user._id, user.email);
			user.token = token;

			const finalUserObject = {};

			// remove password from object
			Object.keys(user._doc).forEach(
				(key) => key !== 'password' && (finalUserObject[key] = user[key])
			);

			return res.status(201).json({ user: finalUserObject });
		}
		return res.status(400).send('Invalid credentials');
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error.message);
	}
};

module.exports = { register, login };
