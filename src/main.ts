#!/usr/bin/env node

import yargs from "yargs";
import { getUsedEnvVarsSync } from "./functions";

main();

async function main() {
  const argv = await yargs(process.argv.slice(2))
    .usage("Usage: $0 <command> [options]")
    .command(
      "scan",
      "Scan for undefined environment variables within a glob(s)"
    )
    .example("$0 scan -g ./src/**/*.js", "count the lines in the given file")
    .alias("g", "glob")
    .describe("g", "Glob(s) to be scanned")
    .demandOption(["g"])
    .help("h")
    .alias("h", "help")
    .epilog(`copyright ${new Date().getFullYear()}`).argv;

  const { g } = argv;

  let globs = g as string | string[];

  console.log({ globs });

  if (!Array.isArray(globs)) {
    globs = [globs];
  }

  const variables = getUsedEnvVarsSync(globs, {});
}
