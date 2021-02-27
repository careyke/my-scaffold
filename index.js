const fs = require("fs");
const path = require("path");

fs.readdir(__dirname, (err, files) => {
  console.log(files);
});
