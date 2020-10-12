#!/usr/bin/env node

import program from 'commander';
import genDiff from './src/gendiff.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2) || 'Something went wrong!');
  })
  .option('-f, --format', 'output format')
  .parse(process.argv);

export default genDiff;
