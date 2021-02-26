"use strict";

const currentNodeVersion = process.versions.node;
const [major] = currentNodeVersion.split(".");

if (major < 10) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "Create React App requires Node 10 or higher. \n" +
      "Please update your version of Node."
  );
  process.exit(1);
}

const init = require("./init");

init();
