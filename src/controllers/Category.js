const { checkErrors } = require('@helpers/checkErrors');
const { uploadTocloudinary } = require('@helpers/CloudinarySetup');
const { Category } = require('@models/Category');

const create = async (req, res) => {
	try {
		checkErrors(req, res);
		const { name, description } = await req.body;
		const data = await uploadTocloudinary(req.file.path, 'bl-images');
		const category = await Category.create({ name, description, image: data.url });

		return res.status(201).json(category);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const update = async (req, res) => {
	try {
		checkErrors(req, res);
		const { name, description } = await req.body;
		const { id } = req.params;
		let image = req?.file?.path && (await uploadTocloudinary(req.file.path, 'bl-images'));

		const category = await Category.findByIdAndUpdate(
			id,
			{
				...(name && { name }),
				...(description && { description }),
				...(req?.file?.path && { image: image?.url }),
			},
			{ new: true }
		);

		if (!category) {
			return res.status(400).json({ error: "Item doesn't exist" });
		}

		return res.status(201).json(category);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const del = async (req, res) => {
	try {
		checkErrors(req, res);
		const { id } = req.params;

		const category = await Category.findByIdAndDelete(id);

		if (!category) {
			return res.status(400).json({ error: "Category doesn't exist" });
		}

		return res.status(201).json({ message: 'Category deleted' });
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const get = async (req, res) => {
	try {
		const categories = await Category.find();
		return res.status(201).json(categories);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { create, del, update, get };
