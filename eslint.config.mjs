//eslint.config.mjs
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactNative from "eslint-plugin-react-native";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "node_modules/",
      "android/",
      "ios/",
      "babel.config.js",
      "metro.config.js",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"], // Target TypeScript and React TypeScript files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      reactNative,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
