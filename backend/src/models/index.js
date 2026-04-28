const sequelize = require("../config/database");
const State = require("./State");
const District = require("./District");
const Subdistrict = require("./Subdistrict");
const Village = require("./Village");
const ApiClient = require("./ApiClient");
const ApiLog = require("./ApiLog");

State.hasMany(District, { foreignKey: "stateId", as: "districts" });
District.belongsTo(State, { foreignKey: "stateId", as: "state" });

District.hasMany(Subdistrict, { foreignKey: "districtId", as: "subdistricts" });
Subdistrict.belongsTo(District, { foreignKey: "districtId", as: "district" });

Subdistrict.hasMany(Village, { foreignKey: "subdistrictId", as: "villages" });
Village.belongsTo(Subdistrict, { foreignKey: "subdistrictId", as: "subdistrict" });

ApiClient.hasMany(ApiLog, { foreignKey: "clientId", as: "logs" });
ApiLog.belongsTo(ApiClient, { foreignKey: "clientId", as: "client" });

module.exports = {
  sequelize,
  State,
  District,
  Subdistrict,
  Village,
  ApiClient,
  ApiLog
};
