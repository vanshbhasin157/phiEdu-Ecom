const db = require("../models");

const addNewProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      image,
      quantity,
      ProductCategoryId,
    } = req.body;
    await db.Product.create({
      productName: productName,
      description: description,
      price: price,
      quantity: quantity,
      image: image,
      ProductCategoryId: ProductCategoryId,
    }).then((product) => {
      res.status(201).send({
        product: product,
      });
    });
  } catch (err) {
    console.debug(12, `Error Message is ${err.message}`);
    res.status(401).send({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    await db.Product.findAll({ include: [db.ProductCategory] }).then(
      (products) => {
        res.status(200).send({
          products: products,
        });
      }
    );
  } catch (error) {
    console.debug(12, `Error Message is ${error.message}`);
    res.status(401).send({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    await db.Product.findAll({
      where: { id: req.params.id },
      include: [db.ProductCategory],
    }).then((product) => {
      res.status(200).send({
        product: product,
      });
    });
  } catch (error) {
    console.debug(12, `Error Message is ${error.message}`);
    res.status(401).send({
      message: error.message,
    });
  }
};
module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
};
