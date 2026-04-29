const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const ApiClient = sequelize.define(
  "ApiClient",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(160),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(180),
      allowNull: false
    },

    apiKey: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "api_key"
    },

    apiSecret: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: "api_secret"
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active"
    }
  },
  {
    tableName: "api_clients",
    timestamps: false
  }
);

module.exports = ApiClient;