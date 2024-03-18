module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    // if your using tsconfig.paths thers is no harm in telling jest
    // '@components/(.*)$': '<rootDir>/src/components/$1',
    'src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    // mocking assests and styling
    // '^.+\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.ts',
    /* mock models and services folder */
    // '(assets|models|services)': '<rootDir>/tests/mocks/fileMock.ts',
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
};
