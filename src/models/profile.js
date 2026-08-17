const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('profile', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    fullname: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    address_ID: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    id_cart: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    id_favorite: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'favorite',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    tableName: 'profile',
    schema: 'public',
    timestamps: true
  });
};
