module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      orderAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    Order.associate = (models) => {
      Order.hasMany(models.OrderDetail);
    };
  
    return Order;
  };