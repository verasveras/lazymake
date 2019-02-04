const fs = require("fs");
const exec = require("child_process").exec;
const parser = require("@kba/makefile-parser");
const cliSelect = require("cli-select");
const chalk = require("chalk");
const path = require("path");

const args = process.argv.splice(2);
const makefilePath = args[0] ? args[0] : "./Makefile";
const resolvedPath = path.resolve(__dirname, makefilePath);

const makeFile = fs.readFileSync(resolvedPath, "utf8");
const parsedMake = parser(makeFile);

const targets = [];
const recipes = {};

parsedMake.ast.forEach(target => {
  const targetName = target.target;
  targets.push(targetName);
  recipes[targetName] = {
    ...target
  };
  delete recipes[targetName].target;
});

const options = {
  values: targets,
  valueRenderer: (value, selected) => {
    if (selected) return chalk.bgWhite(value);
    return value;
  }
};

console.log("Select a makefile target to run.");
cliSelect(options).then(response => {
  const { value } = response;
  console.log(recipes[value]);
  exec(`make ${value}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    } else {
      console.log(stdout);
    }
  });
});
