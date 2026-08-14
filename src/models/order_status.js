const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('order_status', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: true
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
    tableName: 'order_status',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "order_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
