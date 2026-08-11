const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart_items', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_cart: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'products_variants',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cart_items',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "cart_items_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
