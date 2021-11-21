module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId:{
          type: DataTypes.UUID,
          allowNull:true,
          primaryKey:true
      }
    });
    User.associate = (models) => {
      User.hasMany(models.Address);
    };
    User.associate = (models) => {
      User.hasMany(models.Order);
    };
    
    return User;
  };