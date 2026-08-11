const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_events', {
    id_event: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products_events',
    schema: 'public',
    timestamps: false
  });
};
