const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('checkout_address', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_order: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    recipient_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    recipient_phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    recipient_fulladdress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recipient_city: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    recipient_province: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    recipient_postcode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    recipient_optional_address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'checkout_address',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "checkout_address_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
