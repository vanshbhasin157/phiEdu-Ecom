module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define("OrderDetail", {
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return OrderDetail;
};
