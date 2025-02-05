import prettierConfig from "@vue/eslint-config-prettier";
import typescriptConfig from "@vue/eslint-config-typescript";

export default [
  {
    files:["**/*.{.vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts}"],
    plugins: {
      prettierConfig,
      typescriptConfig,
    },
    extends: [
      'eslint:recommended',
    ]
  }
]
