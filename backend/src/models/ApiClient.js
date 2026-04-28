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
      allowNull: false,
      unique: true
    },
    apiKey: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
      field: "api_key"
    },
    secretHash: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: "secret_hash"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active"
    },
    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_used_at"
    }
  },
  {
    tableName: "api_clients",
    underscored: true
  }
);

module.exports = ApiClient;
