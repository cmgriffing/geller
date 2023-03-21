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
    .alias("e", "env")
    .describe("e", "env file(s) to be scanned")
    .demandOption(["g"])
    .help("h")
    .alias("h", "help")
    .epilog(`copyright ${new Date().getFullYear()}`).argv;

  const { g, e } = argv;
  const globs = arrayifyArg(g, []);
  const envs = arrayifyArg(e, [".env"]);

  const variables = getUsedEnvVarsSync(globs, {
    envs,
  });
}

function arrayifyArg(arg: unknown, defaultValue: string | string[]) {
  let args = (arg as string | string[]) || defaultValue;

  if (!Array.isArray(args)) {
    args = [args];
  }

  return args;
}
