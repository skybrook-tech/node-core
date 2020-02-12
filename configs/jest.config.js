module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/src/core"],
  coveragePathIgnorePatterns: ["<rootDir>/src/core"]
};
