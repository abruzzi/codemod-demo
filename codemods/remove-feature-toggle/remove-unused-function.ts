import {
  CallExpression,
  Collection,
  JSCodeshift,
  JSXOpeningElement,
  VariableDeclarator,
} from "jscodeshift";

const removeUnusedFunction = (j: JSCodeshift, root: Collection) => {
  const calling = new Set();
  root
    .find(j.CallExpression, {
      callee: { type: "Identifier" },
    })
    .forEach((path) => {
      const node = path.node as CallExpression;
      const name = (node.callee as any).name;
      calling.add(name);
    });

  const exporting = new Set();
  root.find(j.ExportNamedDeclaration).forEach((path) => {
    path.node.specifiers.forEach((sp) => exporting.add(sp.local.name));
  });

  const jsxCalling = new Set();
  root
    .find(j.JSXOpeningElement, {
      name: { type: "JSXIdentifier" },
    })
    .forEach((path) => {
      const node = path.node as JSXOpeningElement;
      const name = (node.name as any).name;
      jsxCalling.add(name);
    });

  root.find(j.FunctionDeclaration).forEach((path) => {
    if (
      !calling.has(path.node.id.name) &&
      !exporting.has(path.node.id.name) &&
      !jsxCalling.has(path.node.id.name)
    ) {
      j(path).remove();
    }
  });

  root
    .find(j.VariableDeclarator, {
      init: { type: "ArrowFunctionExpression" },
      id: { type: "Identifier" },
    })
    .forEach((path) => {
      const node = path.node as VariableDeclarator;
      const name = (node.id as any).name;
      if (!calling.has(name) && !exporting.has(name) && !jsxCalling.has(name)) {
        j(path).remove();
      }
    });
};

export { removeUnusedFunction };
