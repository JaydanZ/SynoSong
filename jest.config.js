// {
//   "preset": "ts-jest",
//   "testEnvironment": "jsdom",
//   "moduleNameMapper": {
//     "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
//   },
//   "transform": {
//     "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jestFileTransformer.js"
//   },
//   "setupFilesAfterEnv": ["<rootDir>/setupTests.ts"]
// }

const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

module.exports = createJestConfig(customJestConfig);
