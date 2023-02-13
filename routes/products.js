const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// app.use(`${api}/products`, productsRouter);
const {Product} = require('../models/product')

router.get('/', async (req, res) => {
	const allProducts = await Product.find();

	if (!allProducts) {
		res.status(500).json({ succes: false });
	}
	res.send(allProducts);
});

router.post('/', async (req, res) => {
	const product = await new Product({
		name: req.body.name,
		image: req.body.image,
		countInStock: req.body.countInStock,
	});
	product
		.save()
		.then((createdProduct) => {
			res.status(201).json(createdProduct);
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
				success: false,
			});
		});
});

module.exports = router;
