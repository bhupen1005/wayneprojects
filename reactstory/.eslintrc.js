module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended", // for sonarjs rules, npm package "eslint-plugin-sonarjs": "^0.21.0",
    "plugin:import/recommended",
    "airbnb",
    "prettier",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  // settings: { react: { version: "18.2" } },
  plugins: [
    // "react-refresh",
    "@typescript-eslint",
    "sonarjs",
    "react",
    "react-hooks",
    // "jsx-a11y", no need for ap
    "import",
  ],
  rules: {
    // "react-refresh/only-export-components": [
    //   "warn",
    //   { allowConstantExport: true },
    // ],
    "sonarjs/no-duplicate-string": ["error", { threshold: 6 }], // this rule prevents duplication of strings for better maintainability, threshold is set to 6 which means if a string is used more than 6 times, it should be declared as a constant
    complexity: ["error", 15],
    "no-undef": "error",
    "no-nested-ternary": "error",
    "no-dupe-keys": "error",
    "no-shadow": "error",
    "no-use-before-define": "off",
    "prefer-destructuring": "off",

    "@typescript-eslint/prefer-for-of": "error",

    "linebreak-style": 0, // override airbnb
    quotes: ["error", "double"], // override airbnb
    "import/extensions": 0, // override import

    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-props-no-spreading": "off",

    // "import/no-default-export": "error",
    "import/prefer-default-export": "off",

    // this rule is conflicting with typescript/no-unused-vars
    "no-unused-vars": "off",
    "arrow-body-style": "off",
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
