const commander = require("commander"); // 解析命令行的命令和参数
const inquirer = require("inquirer"); // 用于和用户进行交互
const chalk = require("chalk"); // 给终端文字加上颜色
const logSymbols = require("log-symbols"); // 给终端的输出加入状态符号
const fs = require("fs-extra");

const packageJson = require("../package.json");

async function init() {
  let projectName;
  let templateName;
  let canCleanDir = false;
  const program = new commander.Command(packageJson.name);

  // 分析用户的命令
  program
    .version(packageJson.version)
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .action((name) => {
      projectName = name;
    })
    .option("--verbose", "print additional logs")
    .option("--info", "print environment debug info")
    .on("--help", () => {
      console.log();
      console.log(`Only ${chalk.green("<project-directory>")} is required.`);
    })
    .parse(process.argv);

  if (typeof projectName === "undefined") {
    console.log("Please specify the project directory.");
    console.log();
    process.exit(1);
  }
  if (fs.existsSync(projectName)) {
    await inquirer
      .prompt([
        {
          type: "confirm",
          message: "当前文件夹已经存在，请问是否可以清空里面的内容",
          name: "canCleanDir",
        },
      ])
      .then((answer) => {
        canCleanDir = answer.canCleanDir;
        if (!answer.canCleanDir) {
          console.log(logSymbols.info, "请重新输入其他项目名称");
          process.exit(0);
        }
      });
  }

  // 选择模板
  await inquirer
    .prompt([
      {
        type: "list",
        message: "请选择模板类型",
        name: "templateName",
        choices: ["react-template-webpack"], // 选择列表，暂时只有一个选项
      },
    ])
    .then((answer) => {
      templateName = answer.templateName;
    });

  require("./createApp")(projectName, templateName, canCleanDir);
}

module.exports = init;
