import { Collection, JSCodeshift } from "jscodeshift";

const removeFeatureToggle = (name: string) => {
  return (j: JSCodeshift, root: Collection) => {
    root.find(j.IfStatement).forEach((isf) => {
      const test = isf.node.test;

      if (
        test.type === "CallExpression" &&
        test.callee.type === "Identifier" &&
        test.callee.name === "featureToggle"
      ) {
        if (
          test.arguments.length === 1 &&
          test.arguments[0].type === "Literal" &&
          test.arguments[0].value === name
        ) {
          if (isf.node.consequent.type === "BlockStatement") {
            j(isf).replaceWith(isf.node.consequent.body);
          }
        }
      }
    });

    root.find(j.ConditionalExpression).forEach(path => {
      const test = path.node.test;

      if (
        test.type === "CallExpression" &&
        test.callee.type === "Identifier" &&
        test.callee.name === "featureToggle"
      ) {
        if (
          test.arguments.length === 1 &&
          (test.arguments[0].type === "Literal" ||
            test.arguments[0].type === "StringLiteral") &&
          test.arguments[0].value === name
        ) {
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
        }
      }
    });
  };
};

export { removeFeatureToggle };
