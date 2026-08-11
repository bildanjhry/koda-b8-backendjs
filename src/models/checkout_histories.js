const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('checkout_histories', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_order: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    id_checkout_address: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'checkout_address',
        key: 'id'
      }
    },
    id_payment_method: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'payment_method',
        key: 'id'
      }
    },
    id_delivery_method: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'delivery_method',
        key: 'id'
      }
    },
    id_order_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order_status',
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
    tableName: 'checkout_histories',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "checkout_histories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
