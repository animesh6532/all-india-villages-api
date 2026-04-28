const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

function createApiKey() {
  return `aiv_${crypto.randomBytes(18).toString("hex")}`;
}

function createApiSecret() {
  return `${uuidv4()}${crypto.randomBytes(24).toString("hex")}`;
}

function hashSecret(secret) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

module.exports = {
  createApiKey,
  createApiSecret,
  hashSecret
};
