import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // ===== IMPORT SORTING RULES =====

      // Sort imports automatically
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. External libraries (node built-ins, npm packages)
            // Side effect imports (e.g., "import './styles.css'")
            ["^\\u0000"],
            // React first, then other external packages
            ["^react$", "^react-dom$", "^next", "^@?\\w"],
            // 2. Internal imports (@/ aliases)
            ["^@/"],
            // 3. Type imports (import type ...)
            ["^@?\\w.*\\u0000$", "^@/.*\\u0000$", "^\\..*\\u0000$"],
          ],
        },
      ],
      // Sort exports
      "simple-import-sort/exports": "error",

      // Disable default import ordering (let simple-import-sort handle it)
      "import/order": "off",

      // ERROR: Don't use "import * as React" or "import React"
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message:
                "Use destructured imports like \"import { useState, useEffect } from 'react'\" instead of \"import React from 'react'\"",
            },
          ],
          patterns: [
            {
              group: ["react"],
              importNames: ["*"],
              message:
                "Use destructured imports like \"import { useState, useEffect } from 'react'\" instead of \"import * as React from 'react'\"",
            },
          ],
        },
      ],

      // ===== STRICT TYPE SAFETY RULES =====

      // WARN: No explicit 'any' in our own code (relaxed for now)
      "@typescript-eslint/no-explicit-any": "warn",

      // WARN: No unsafe operations with 'any' types (relaxed for now)
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",

      // ERROR: Unused variables (with some exceptions)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // WARN: Functions should have explicit return types
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],

      // ERROR: Consistent type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      // ERROR: Prefer nullish coalescing
      "@typescript-eslint/prefer-nullish-coalescing": "error",

      // ERROR: Prefer optional chain
      "@typescript-eslint/prefer-optional-chain": "error",

      // WARN: No unnecessary type assertions
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",

      // ERROR: No floating promises
      "@typescript-eslint/no-floating-promises": "error",

      // ERROR: No misused promises
      "@typescript-eslint/no-misused-promises": "error",

      // WARN: Prefer const over let when not reassigned
      "prefer-const": "warn",

      // ERROR: No console.log in production (allow console.warn, console.error)
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  {
    // Config files can use require and console
    files: ["*.config.js", "*.config.ts", "*.config.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-console": "off",
    },
  },
  {
    // Type definition files can use 'any' when necessary
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // ===== PRETTIER INTEGRATION =====
  // Disable ESLint formatting rules that conflict with Prettier
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Run Prettier as an ESLint rule
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
