module.exports = {
  // ...existing code...
  plugins: [
    // ...existing plugins...
    'unused-imports',
    'react-refresh', // Add this line if you are using react-refresh
  ],

  rules: {
    // ...existing rules...
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },

  extends: ['plugin:storybook/recommended']
};
