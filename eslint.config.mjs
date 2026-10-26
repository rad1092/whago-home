import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["app/**/*.{ts,tsx}", "lib/**/*.ts"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.flat["recommended-latest"].rules,
    },
  },
  {
    files: ["tests/**/*.mjs", "scripts/**/*.mjs", "*.config.{js,mjs,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
);
