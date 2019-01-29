const parser = require('makefile-parser');
const cliSelect = require('cli-select');
const chalk = require('chalk');

const options = {
    values: ['cats', 'dogs'],
    valueRenderer: (value, selected)  => {
        if (selected) return chalk.bgWhite(value);
        return value;
    },
};

cliSelect(options)
    .then(() => {
        console.log('wow!!!');
    });