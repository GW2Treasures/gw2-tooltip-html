import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  ...createDefaultPreset(),

  // don't inject globals (import from @jest/globals instead)
  injectGlobals: false,
};

export default config;
