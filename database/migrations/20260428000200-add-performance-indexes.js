"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex("districts", ["state_id", "slug"], { unique: true, name: "districts_state_slug_uidx" });
    await queryInterface.addIndex("subdistricts", ["district_id", "slug"], {
      unique: true,
      name: "subdistricts_district_slug_uidx"
    });
    await queryInterface.addIndex("villages", ["subdistrict_id", "slug"], { unique: true, name: "villages_subdistrict_slug_uidx" });
    await queryInterface.addIndex("districts", ["state_id"], { name: "districts_state_id_idx" });
    await queryInterface.addIndex("subdistricts", ["district_id"], { name: "subdistricts_district_id_idx" });
    await queryInterface.addIndex("villages", ["subdistrict_id"], { name: "villages_subdistrict_id_idx" });
    await queryInterface.addIndex("api_logs", ["client_id", "created_at"], { name: "api_logs_client_created_idx" });
    await queryInterface.addIndex("api_logs", ["path"], { name: "api_logs_path_idx" });

    await queryInterface.sequelize.query("CREATE INDEX states_name_trgm_idx ON states USING GIN (name gin_trgm_ops);");
    await queryInterface.sequelize.query("CREATE INDEX districts_name_trgm_idx ON districts USING GIN (name gin_trgm_ops);");
    await queryInterface.sequelize.query("CREATE INDEX subdistricts_name_trgm_idx ON subdistricts USING GIN (name gin_trgm_ops);");
    await queryInterface.sequelize.query("CREATE INDEX villages_name_trgm_idx ON villages USING GIN (name gin_trgm_ops);");
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("api_logs", "api_logs_path_idx");
    await queryInterface.removeIndex("api_logs", "api_logs_client_created_idx");
    await queryInterface.removeIndex("villages", "villages_subdistrict_id_idx");
    await queryInterface.removeIndex("subdistricts", "subdistricts_district_id_idx");
    await queryInterface.removeIndex("districts", "districts_state_id_idx");
    await queryInterface.removeIndex("villages", "villages_subdistrict_slug_uidx");
    await queryInterface.removeIndex("subdistricts", "subdistricts_district_slug_uidx");
    await queryInterface.removeIndex("districts", "districts_state_slug_uidx");
    await queryInterface.sequelize.query("DROP INDEX IF EXISTS villages_name_trgm_idx;");
    await queryInterface.sequelize.query("DROP INDEX IF EXISTS subdistricts_name_trgm_idx;");
    await queryInterface.sequelize.query("DROP INDEX IF EXISTS districts_name_trgm_idx;");
    await queryInterface.sequelize.query("DROP INDEX IF EXISTS states_name_trgm_idx;");
  }
};
