const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const District = sequelize.define(
  "District",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "state_id"
    },
    censusCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "census_code"
    },
    name: {
      type: DataTypes.STRING(140),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(160),
      allowNull: false
    }
  },
  {
    tableName: "districts",
    underscored: true,
    indexes: [
      { fields: ["state_id"] },
      { unique: true, fields: ["state_id", "slug"] }
    ]
  }
);

module.exports = District;
