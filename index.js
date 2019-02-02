const parser = require("@kba/makefile-parser");
const fs = require("fs");
const cliSelect = require("cli-select");
const chalk = require("chalk");

// TODO take as command
// absolute path to this folder and then you append the location of the makefile

const makeFile = fs.readFileSync("./Makefile", "utf8");
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

cliSelect(options).then(() => {
  console.log("wow!!!");
});
