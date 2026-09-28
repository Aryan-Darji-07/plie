module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(?:@react-native|react-native|@react-navigation|immer|redux-persist|lucide-react-native)/)',
  ],
};
