import { Identifier, Project, SyntaxKind } from "ts-morph";

export function getUsedEnvVarsSync(globs: string[], config: {}) {
  // load in all file paths to TS
  const project = new Project({});
  project.addSourceFilesAtPaths(globs);

  // TODO?: possibly handle JS separately

  const processNodes: Identifier[] = [];
  const processEnvNodes: Identifier[] = [];

  project.getSourceFiles().forEach((sourceFile, index) => {
    const fileProcessNodes = sourceFile
      .getDescendantsOfKind(SyntaxKind.Identifier)
      .filter((identifier) => identifier.getText() === "process");

    if (fileProcessNodes.length) {
      processNodes.push(...fileProcessNodes);

      const fileProcessEnvNodes = fileProcessNodes
        .map((processIdentifier) =>
          processIdentifier
            .getNextSiblingIfKind(SyntaxKind.DotToken)
            ?.getNextSiblingIfKind(SyntaxKind.Identifier)
        )
        .filter((envIdentifier) => typeof envIdentifier !== "undefined")
        .filter(
          (envIdentifier) => envIdentifier?.getText() === "env"
        ) as Identifier[];

      if (fileProcessEnvNodes.length) {
        processEnvNodes.push(...fileProcessEnvNodes);
      }
    }
  });

  // handle process.env.BLANK

  const basicEnvVars: string[] = [];
  const destructuredEnvVars: string[] = [];

  processEnvNodes.forEach((envNode) => {
    const varNode = envNode
      .getParent()
      .getNextSiblingIfKind(SyntaxKind.DotToken)
      ?.getNextSiblingIfKind(SyntaxKind.Identifier);

    if (varNode) {
      // basic: process.env.FOO
      basicEnvVars.push(varNode.getText());
    } else if (
      envNode?.getParent()?.getParent()?.isKind(SyntaxKind.VariableDeclaration)
    ) {
      // destructured: const { FOO } = process.env
      const syntaxList = envNode
        .getParent()
        ?.getParent()
        ?.getFirstDescendantByKind(SyntaxKind.SyntaxList);

      const identifiers = syntaxList
        ?.getDescendantsOfKind(SyntaxKind.Identifier)
        .map((identifier) => identifier.getText())
        .filter((identifier) => !!identifier) as string[];

      if (identifiers.length) {
        destructuredEnvVars.push(...identifiers);
      }
    }
  });

  // edge case?:  if const { env } = process;
  //    look for env.BLANK

  // edge case?: const foo = process.env['foo']

  const usedEnvVars = [...basicEnvVars, ...destructuredEnvVars] as string[];

  const undefinedEnvVars = usedEnvVars.filter((envVar) => {
    return typeof process.env[envVar] === "undefined";
  });

  if (undefinedEnvVars.length) {
    console.error("There are ENV vars that are undefined: ", undefinedEnvVars);
    process.exit(1);
  }
}
