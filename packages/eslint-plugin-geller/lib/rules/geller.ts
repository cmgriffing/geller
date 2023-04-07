import { ESLintUtils } from "@typescript-eslint/utils";
import { getDotEnvVarsSync } from "geller";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

export const geller: any = createRule({
  create(context) {
    const { envs, cwd } = context.options?.[0] || {};
    const dotEnvVars = getDotEnvVarsSync(envs, cwd);

    return {
      MemberExpression(node) {
        const nodeAny = node as any;

        if (
          nodeAny?.object?.name === "process" &&
          nodeAny.property.name === "env"
        ) {
          const property = (node.parent as any)?.property;
          const member = property?.name;

          if (
            member &&
            typeof dotEnvVars[member] === "undefined" &&
            typeof process.env[member] === "undefined"
          ) {
            context.report({
              messageId: "geller",
              node: property as any,
              data: {
                envVar: member,
              },
            });
          }
        }
      },

      VariableDeclarator(node) {
        const nodeInitAny = node.init as any;
        if (
          nodeInitAny?.object?.name === "process" &&
          nodeInitAny?.property.name === "env" &&
          node.id.type === "ObjectPattern"
        ) {
          // TODO: duh
          const declaredProperties = (node.id as any).properties as any[];

          if (declaredProperties) {
            declaredProperties.forEach((prop) => {
              if (
                typeof dotEnvVars[prop.key.name] === "undefined" &&
                typeof process.env[prop.key.name] === "undefined"
              ) {
                context.report({
                  messageId: "geller",
                  node: prop,
                  data: {
                    envVar: prop.key.name,
                  },
                });
              }
            });
          }
        }
      },
    };
  },
  name: "geller",
  meta: {
    docs: {
      description: "process.env variables should be defined.",
      recommended: "error",
    },
    messages: {
      geller:
        "{{ envVar }} is not defined on the process.env or specified .env files.",
    },
    type: "problem",
    schema: [
      {
        type: "object",
        additionalProperties: false,
        properties: {
          cwd: {
            type: "string",
          },
          envs: {
            type: "array",
            uniqueItems: true,
            items: {
              type: "string",
            },
          },
        },
      },
    ],
  },
  defaultOptions: [],
});
