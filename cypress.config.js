const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "koj7bs",
  e2e: {
    experimentalStudio: true,
    baseUrl : "http://localhost:3000"
  },
  viewportHeight: 900,
  viewportWidth: 1440,
});
