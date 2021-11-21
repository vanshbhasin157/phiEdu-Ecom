const db = require("../models");

const createProductCategory = async (req, res) => {
  try {
    const { productCategoryName, description } = req.body;
    await db.ProductCategory
      .create({
        productCategoryName: productCategoryName,
        description: description,
      })
      .then((categoryName) => {
        res.status(201).send({
          categoryName: categoryName,
        });
      });
  } catch (error) {
    console.debug(12, `Error Message is ${error.message}`);
    res.status(401).send({
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    await db.ProductCategory.findAll().then((categories) => {
      res.status(200).send({
        categories: categories,
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
  createProductCategory,
  getAllCategories,
};
