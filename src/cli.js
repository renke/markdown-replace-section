#!/usr/bin/env node

import stdin from "stdin";
import yargs from "yargs";
import {readFileSync, writeFileSync} from "fs";

import replaceSection from ".";

const argv = yargs
  .usage(
`Usage: $0 <input_file> <heading_name> [<output_file>] [--not-hungry]

Reads the Markdown file <input_file> and replaces everything between the first heading named <heading_name> and the next heading of the same level in the file with the content read from stdin.

The result is written to <output_file> or stdout.
`
  )
  .boolean("not-hungry")
  .describe("not-hungry", "Stop at the first heading")
  .default("not-hungry", false)
  .demand(2)
  .help("help")
  .alias("help", "h")
  .version()
  .argv;

const inputPath = argv._[0];
const input = readFileSync(inputPath, { encoding: "utf8" });

const headingName = argv._[1];
const hungry = !argv.notHungry;

const outputPath = argv._[2];

stdin(replacement => {
  const output = replaceSection(input, headingName, replacement.trim(), hungry);

  if (outputPath) {
    writeFileSync(outputPath, output);
  } else {
    process.stdout.write(output);
  }
});
