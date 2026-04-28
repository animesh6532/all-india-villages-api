const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Village = sequelize.define(
  "Village",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    subdistrictId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "subdistrict_id"
    },
    censusCode: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: "census_code"
    },
    name: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: "villages",
    underscored: true,
    indexes: [
      { fields: ["subdistrict_id"] },
      { fields: ["slug"] },
      { unique: true, fields: ["subdistrict_id", "slug"] }
    ]
  }
);

module.exports = Village;
