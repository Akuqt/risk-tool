/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: "./",
  testMatch: ["./test/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  testEnvironment: "jsdom",
  detectOpenHandles: false,
  silent: false,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "./coverage",
};
