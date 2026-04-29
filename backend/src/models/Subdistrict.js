const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Subdistrict = sequelize.define(
  "Subdistrict",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "district_id"
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
    tableName: "subdistricts",

    timestamps: true,

    underscored: true,

    indexes: [
      { fields: ["district_id"] },

      {
        unique: true,
        fields: ["district_id", "slug"]
      }
    ]
  }
);

module.exports = Subdistrict;