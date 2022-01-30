module.exports = {
  verbose: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: './coverage/',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['cobertura', 'html', 'text', 'text-summary'],
}
