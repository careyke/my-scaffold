const chalk = require("chalk"); // 给终端文字加上颜色
const logSymbols = require("log-symbols"); // 给终端的输出加入状态符号
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const spawn = require("cross-spawn");
const downloadGitRepo = require("download-git-repo");
const ora = require("ora"); // 终端loading

const templateStoreName = "template";

async function createApp(projectPath, projectName, templateName) {
  fs.ensureDirSync(projectPath);

  console.log();
  console.log(`Creating a new app in ${chalk.green(projectPath)}`);
  console.log();

  // 写入package.json
  const packageJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
  };
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  // cd到目标文件夹
  console.log(`${chalk.green("1.")} Enter the target folder`);
  process.chdir(projectName);
  console.log();

  // 运行npm init -y
  console.log(`${chalk.green("2.")} Run 'npm init -y'`);
  spawn.sync("npm", ["init", "-y"], { stdio: "inherit" });
  console.log(logSymbols.success, "Run 'npm init -y' complete");
  console.log();

  // 下载template
  console.log(`${chalk.green("3.")} Download template from github`);
  await downloadTemplate(templateStoreName);
  console.log();

  // 复制模板文件并清理多余文件
  console.log(`${chalk.green("4.")} Move and clear files from template`);
  const moveSpinner = ora("Move template files ...");
  moveSpinner.start();
  const srcPath = path.join(
    projectPath,
    `${templateStoreName}/packages/${templateName}`
  );
  fs.copySync(srcPath, projectPath);
  fs.removeSync(path.join(projectPath, templateStoreName));
  moveSpinner.succeed();
  console.log();

  // 合并package.json

  // 执行npm i

  // finish
}

function downloadTemplate(templateTargetName) {
  return new Promise((resolve, reject) => {
    const spinner = ora("Downloading template ...");
    spinner.start();
    downloadGitRepo("careyke/my-scaffold#main", templateTargetName, (err) => {
      if (err) {
        spinner.fail();
        reject(err);
      } else {
        spinner.succeed();
        resolve();
      }
    });
  });
}

module.exports = createApp;
