# Gendiff: generator of differences

Compares two configuration files: JSON, ini or YAML, and shows the difference.
New data structure contains differences (including unchanged).

[![Build and eslint test](https://github.com/nichegosebe/frontend-project-lvl2/workflows/Build%20and%20eslint%20test/badge.svg)]https://github.com/nichegosebe/frontend-project-lvl2/actions

[![Maintainability](https://api.codeclimate.com/v1/badges/6d8685d6f03ce866868d/maintainability)](https://codeclimate.com/github/nichegosebe/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/6d8685d6f03ce866868d/test_coverage)](https://codeclimate.com/github/nichegosebe/frontend-project-lvl2/test_coverage)

## Features

Can be used as a library or as CLI util.

- Input formats: Yaml, JSON, Ini
- Output formats: plain, strucrured, JSON

## Installation

npm install

## Usage as cli-command

Usage: gendiff [options] <filepath1> <filepath2>

Options: -V, --version output the version number -f, --format <formatter> output
format (default: "stylish") -h, --help display help for command

[![asciicast](https://asciinema.org/a/sZJHv6byIOBCHVLvIntx2oE2h.svg)](https://asciinema.org/a/sZJHv6byIOBCHVLvIntx2oE2h)

## Usage as a library

import genDiff from 'gendiff';

genDiff(<filePath1>, <filePath2>, <format>);
