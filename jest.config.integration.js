const nextJest = require("next/jest");
const config = require("./jest.json");

const createJestConfig = nextJest({
  dir: "./",
});

config.testRegex = "integ\\.spec\\.ts(x)?$";
config.coveragePathIgnorePatterns = [
  ...config.coveragePathIgnorePatterns,
  ".spec.ts|tsx",
];
config.coverageThreshold = {
  global: {
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100,
  },
};

module.exports = createJestConfig(config);
