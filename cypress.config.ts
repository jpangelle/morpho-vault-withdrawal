import synpressPlugins from "@synthetixio/synpress/plugins";
import { defineConfig } from "cypress";

module.exports = defineConfig({
  userAgent: "synpress",
  chromeWebSecurity: true,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    testIsolation: true,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/e2e/support/support.ts",
  },
});
