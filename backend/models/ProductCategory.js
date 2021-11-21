module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define("ProductCategory", {
    productCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Product);
  };
  return ProductCategory;
};
