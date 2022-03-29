#!/usr/bin/env node
import { program } from 'commander'

program
  .name('gendiff')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
  
program.command
  .option('-V, --version', 'output the version number')

program.parse()
