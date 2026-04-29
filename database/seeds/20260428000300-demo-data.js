"use strict";

const { hashSecret } = require("../../src/utils/crypto");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("states", [
      { id: 1, census_code: "27", name: "Maharashtra", slug: "maharashtra", created_at: new Date(), updated_at: new Date() },
      { id: 2, census_code: "29", name: "Karnataka", slug: "karnataka", created_at: new Date(), updated_at: new Date() },
      { id: 3, census_code: "10", name: "Bihar", slug: "bihar", created_at: new Date(), updated_at: new Date() }
    ]);

    await queryInterface.bulkInsert("districts", [
      { id: 1, state_id: 1, census_code: "521", name: "Pune", slug: "pune", created_at: new Date(), updated_at: new Date() },
      { id: 2, state_id: 1, census_code: "519", name: "Mumbai", slug: "mumbai", created_at: new Date(), updated_at: new Date() },
      { id: 3, state_id: 2, census_code: "572", name: "Bengaluru Urban", slug: "bengaluru-urban", created_at: new Date(), updated_at: new Date() },
      { id: 4, state_id: 3, census_code: "230", name: "Patna", slug: "patna", created_at: new Date(), updated_at: new Date() }
    ]);

    await queryInterface.bulkInsert("subdistricts", [
      { id: 1, district_id: 1, census_code: "04189", name: "Haveli", slug: "haveli", created_at: new Date(), updated_at: new Date() },
      { id: 2, district_id: 1, census_code: "04190", name: "Mulshi", slug: "mulshi", created_at: new Date(), updated_at: new Date() },
      { id: 3, district_id: 3, census_code: "05542", name: "Bengaluru North", slug: "bengaluru-north", created_at: new Date(), updated_at: new Date() },
      { id: 4, district_id: 4, census_code: "01412", name: "Patna Rural", slug: "patna-rural", created_at: new Date(), updated_at: new Date() }
    ]);

    await queryInterface.bulkInsert("villages", [
      { subdistrict_id: 1, census_code: "556099", name: "Wagholi", slug: "wagholi", population: 33900, created_at: new Date(), updated_at: new Date() },
      { subdistrict_id: 1, census_code: "556100", name: "Lohegaon", slug: "lohegaon", population: 24000, created_at: new Date(), updated_at: new Date() },
      { subdistrict_id: 2, census_code: "556210", name: "Pirangut", slug: "pirangut", population: 14500, created_at: new Date(), updated_at: new Date() },
      { subdistrict_id: 3, census_code: "612910", name: "Yelahanka", slug: "yelahanka", population: 31200, created_at: new Date(), updated_at: new Date() },
      { subdistrict_id: 4, census_code: "245870", name: "Sabalpur", slug: "sabalpur", population: 8200, created_at: new Date(), updated_at: new Date() }
    ]);

    await queryInterface.bulkInsert("api_clients", [
      {
        name: process.env.DEFAULT_CLIENT_NAME || "Demo Client",
        email: process.env.DEFAULT_CLIENT_EMAIL || "demo@example.com",
        api_key: process.env.DEFAULT_API_KEY || "demo_key_123456",
        api_secret: hashSecret(process.env.DEFAULT_API_SECRET || "demo_secret_123456"),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("api_clients", null, {});
    await queryInterface.bulkDelete("villages", null, {});
    await queryInterface.bulkDelete("subdistricts", null, {});
    await queryInterface.bulkDelete("districts", null, {});
    await queryInterface.bulkDelete("states", null, {});
  }
};
