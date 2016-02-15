#!/usr/bin/env node

import stdin from "stdin";
import yargs from "yargs";
import {readFileSync} from "fs";

import replaceSection from ".";

const argv = yargs
  .usage(
`Usage: $0 <input_file> <heading_name> [--not-hungry]

Reads the Markdown file <input_file> and replaces everything between the first heading named <heading_name> and the next heading of the same level in the file with the content read from stdin. The result is written to stdout.
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

const documentPath = argv._[0];
const document = readFileSync(documentPath, { encoding: "utf8" });

const headingName = argv._[1];
const hungry = !argv.notHungry;

stdin(replacement => {
  process.stdout.write(replaceSection(document, headingName, replacement.trim(), hungry));
});
