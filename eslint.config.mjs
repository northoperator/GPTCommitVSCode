import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["out/**", "dist/**", "**/*.d.ts", "src/gptcommit/scm/types.ts"],
  },
  {
    files: ["**/*.ts"],
    extends: tseslint.configs.recommended,
    rules: {
      "@typescript-eslint/naming-convention": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "curly": "warn",
      "eqeqeq": "warn",
      "no-throw-literal": "warn",
      "semi": "off",
    },
  }
);
