const jwt = require('jsonwebtoken');
const { User } = require('@models/User');

module.exports.auth = async (req, res, next) => {
	let { authorization } = req.headers;
	const token = authorization && authorization.split(' ')[1];

	//not authorized
	if (!token) return res.status(404).json({ error: 'Login required' });

	// check if token exists
	if (token) {
		try {
			// verify token
			let decoded = await jwt.verify(token, process.env.TOKEN_KEY);
			const user = await User.find({ email: decoded.email });
			if (!user) throw Error('Unauthorized user');
			next();
		} catch (error) {
			console.log(error);
			return res.status(404).json({ error: 'Login required' });
		}
	}
};
