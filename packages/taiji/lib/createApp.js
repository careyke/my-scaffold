const chalk = require("chalk"); // 给终端文字加上颜色
const logSymbols = require("log-symbols"); // 给终端的输出加入状态符号
const fs = require("fs-extra");
const path = require("path");
const os = require("os");

function createApp(projectPath, projectName, templateName) {
  fs.ensureDirSync(projectPath);

  console.log();
  console.log(`Creating a new app in ${chalk.green(projectPath)}`);
  console.log();

  // 写入package.json
  // const packageJson = {
  //   name: projectName,
  //   version: "0.1.0",
  //   private: true,
  // };
  // fs.writeFileSync(
  //   path.join(projectPath, "package.json"),
  //   JSON.stringify(packageJson, null, 2) + os.EOL
  // );

  // 运行npm init -y

  // 下载template

  // 合并package.json

  // 执行npm i

  // finish
}

module.exports = createApp;
