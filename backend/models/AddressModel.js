module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
      },
    });
    Address.associate = (models) => {
        Address.belongsTo(models.User);
    };
    return Address;
  };