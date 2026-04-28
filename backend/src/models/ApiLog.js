const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ApiLog = sequelize.define(
  "ApiLog",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "client_id"
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    path: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "status_code"
    },
    responseTimeMs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "response_time_ms"
    },
    ipAddress: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: "ip_address"
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "user_agent"
    }
  },
  {
    tableName: "api_logs",
    underscored: true,
    updatedAt: false
  }
);

module.exports = ApiLog;
