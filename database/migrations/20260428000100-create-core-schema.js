"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE EXTENSION IF NOT EXISTS pg_trgm;");

    await queryInterface.createTable("states", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      census_code: { type: Sequelize.STRING(20), unique: true },
      name: { type: Sequelize.STRING(120), allowNull: false, unique: true },
      slug: { type: Sequelize.STRING(140), allowNull: false, unique: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });

    await queryInterface.createTable("districts", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "states", key: "id" },
        onDelete: "CASCADE"
      },
      census_code: { type: Sequelize.STRING(20) },
      name: { type: Sequelize.STRING(140), allowNull: false },
      slug: { type: Sequelize.STRING(160), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });

    await queryInterface.createTable("subdistricts", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      district_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "districts", key: "id" },
        onDelete: "CASCADE"
      },
      census_code: { type: Sequelize.STRING(20) },
      name: { type: Sequelize.STRING(140), allowNull: false },
      slug: { type: Sequelize.STRING(160), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });

    await queryInterface.createTable("villages", {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      subdistrict_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "subdistricts", key: "id" },
        onDelete: "CASCADE"
      },
      census_code: { type: Sequelize.STRING(30) },
      name: { type: Sequelize.STRING(180), allowNull: false },
      slug: { type: Sequelize.STRING(220), allowNull: false },
      population: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });

    await queryInterface.createTable("api_clients", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(160), allowNull: false },
      email: { type: Sequelize.STRING(180), allowNull: false, unique: true },
      api_key: { type: Sequelize.STRING(80), allowNull: false, unique: true },
      secret_hash: { type: Sequelize.STRING(128), allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      last_used_at: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });

    await queryInterface.createTable("api_logs", {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: "api_clients", key: "id" },
        onDelete: "SET NULL"
      },
      method: { type: Sequelize.STRING(10), allowNull: false },
      path: { type: Sequelize.STRING(300), allowNull: false },
      status_code: { type: Sequelize.INTEGER, allowNull: false },
      response_time_ms: { type: Sequelize.INTEGER, allowNull: false },
      ip_address: { type: Sequelize.STRING(80) },
      user_agent: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("api_logs");
    await queryInterface.dropTable("api_clients");
    await queryInterface.dropTable("villages");
    await queryInterface.dropTable("subdistricts");
    await queryInterface.dropTable("districts");
    await queryInterface.dropTable("states");
  }
};
