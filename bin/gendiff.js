#!/usr/bin/env node

import program from 'commander';
import genDiff from '../lib/gendiff.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <formatter>', 'output format', 'stylish')
  .action((filePath1, filePath2) => console.log(genDiff(filePath1, filePath2, program.format)))
  .parse(process.argv);
