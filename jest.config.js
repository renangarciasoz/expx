const nextJest = require("next/jest");
const config = require("./jest.json");
process.env.TZ = "UTC";

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig(config);
