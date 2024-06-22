import { Collection, JSCodeshift } from "jscodeshift";

const removeFeatureToggle = (name: string) => {
  return (j: JSCodeshift, root: Collection) => {
    root
      .find(j.IfStatement, {
        test: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "featureToggle",
          },
          arguments: [
            {
              type: "Literal",
              value: name,
            },
          ],
        },
      })
      .forEach((isf) => {
        if (isf.node.consequent.type === "BlockStatement") {
          j(isf).replaceWith(isf.node.consequent.body);
        }
      });

    root
      .find(j.ConditionalExpression, {
        test: {
          type: "CallExpression",
          callee: { type: "Identifier", name: "featureToggle" },
          arguments: [
            {
              type: (t: any) => t === "Literal" || t === "StringLiteral",
              value: name,
            },
          ],
        },
      })
      .forEach((path) => {
        const consequent = path.node.consequent;

        // Handle VariableDeclarator
        if (path.parent.node.type === "VariableDeclarator") {
          path.parent.get("init").replace(consequent);
        }

        // Handle ReturnStatement
        else if (path.parent.node.type === "ReturnStatement") {
          path.parent.get("argument").replace(consequent);
        }

        // Handle AssignmentExpression
        else if (path.parent.node.type === "AssignmentExpression") {
          path.parent.get("right").replace(consequent);
        }

        // Handle other possible parent nodes as needed
        else {
          console.log(`Unhandled parent type: ${path.parent.node.type}`);
        }
      });
  };
};

export { removeFeatureToggle };
