import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  env: {
    'cypress-plugin-snapshots': {
      autoCleanUp: false,
      autopassNewSnapshots: true,
      diffLines: 3,
      excludeFields: [],
      ignoreExtraArrayItems: false,
      ignoreExtraFields: false,
      normalizeJson: true,
      prettier: true,
      imageConfig: {
        createDiffImage: true,
        resizeDevicePixelRatio: true,
        threshold: 0.01,
        thresholdType: 'percent',
      },
      screenshotConfig: {
        blackout: [],
        capture: 'fullPage',
        clip: null,
        disableTimersAndAnimations: true,
        log: false,
        scale: false,
        timeout: 30000,
      },
      serverEnabled: true,
      serverHost: 'localhost',
      serverPort: 3002,
      updateSnapshots: false,
      backgroundBlend: 'difference',
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    specPattern: 'cypress/e2e/VisualTesting/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
});
