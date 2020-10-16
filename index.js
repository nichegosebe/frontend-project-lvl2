#!/usr/bin/env node

import program from 'commander';
import parser from './src/parser.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action((filePath1, filePath2) => {
    console.log(parser(filePath1, filePath2) || 'Something went wrong!');
  })
  .option('-f, --format', 'output format')
  .parse(process.argv);
