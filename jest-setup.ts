/* eslint-disable no-undef, import/no-extraneous-dependencies */

// Import built-in Jest matchers
import "@testing-library/react-native/extend-expect";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Use fake timers
beforeAll(() => {
  jest.useFakeTimers();
});

// Reset to real timers
afterAll(() => {
  jest.useRealTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});
