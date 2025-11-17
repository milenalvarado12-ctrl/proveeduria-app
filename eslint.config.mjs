import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        process: "readonly",
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {},
  },
]);
