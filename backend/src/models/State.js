const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const State = sequelize.define(
  "State",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    censusCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
      field: "census_code"
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING(140),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "states",
    underscored: true
  }
);

module.exports = State;
