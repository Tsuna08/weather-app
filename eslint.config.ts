import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default defineConfigWithVueTs(
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            ["UNIQUE", "SLOT"],
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT",
          ],
          alphabetical: false,
        },
      ],
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  {
    ignores: [
      // Системные директории
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.vscode/**",
      "**/.git/**",

      // Файлы пакетных менеджеров
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",

      // Конфигурационные файлы (если нужно)
      "**/eslint.config.js",
      "**/vite.config.ts",
      "**/env.d.ts",

      // Статические файлы
      "**/public/**",
      "**/assets/**",
    ],
  },
);
