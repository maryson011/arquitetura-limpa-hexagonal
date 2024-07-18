/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  // testEnvironment: "node",
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //   "^.+.tsx?$": ["ts-jest",{}],
  // },
  setupFiles: ["<rootDir>/test/.env.ts"]
};