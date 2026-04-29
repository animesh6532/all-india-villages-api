const { ApiClient } = require("../models");
const { createApiKey, createApiSecret, hashSecret } = require("../utils/crypto");

async function generateKey(payload) {
  const apiKey = createApiKey();
  const apiSecret = createApiSecret();

  const [client, created] = await ApiClient.findOrCreate({
    where: { email: payload.email },
    defaults: {
      name: payload.name,
      email: payload.email,
      apiKey,
      apiSecret: hashSecret(apiSecret),
      isActive: true
    }
  });

  if (!created) {
    client.name = payload.name;
    client.apiKey = apiKey;
    client.apiSecret = hashSecret(apiSecret);
    client.isActive = true;
    await client.save();
  }

  return {
    client: {
      id: client.id,
      name: client.name,
      email: client.email,
      apiKey: client.apiKey
    },
    apiSecret
  };
}

module.exports = { generateKey };
