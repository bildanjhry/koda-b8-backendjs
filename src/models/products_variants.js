const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_variants', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_product: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    id_color: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'colors',
        key: 'id'
      }
    },
    id_size: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'sizes',
        key: 'id'
      }
    },
    stocks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sku: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products_variants',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "products_variants_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
