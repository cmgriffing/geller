"use strict";

module.exports = {
  root: true,
  rules: {
    "geller/geller": [
      "error",
      {
        cwd: __dirname,
        envs: [".env"],
      },
    ],
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "geller"],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
};
