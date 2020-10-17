#!/usr/bin/env node

import program from 'commander';
import genDiff from '../lib/index.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action(genDiff)
  .option('-f, --format', 'output format')
  .parse(process.argv);
