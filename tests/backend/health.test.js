const request = require("supertest");
const app = require("../../backend/src/app");

describe("health endpoint", () => {
  it("returns healthy status", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
