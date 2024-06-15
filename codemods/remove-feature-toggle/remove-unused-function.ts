import { Collection, JSCodeshift } from "jscodeshift";

const removeUnusedFunction = (j: JSCodeshift, root: Collection) => {
  const calling = new Set();
  root.find(j.CallExpression).forEach(path => {
    if(path.node.callee.type === 'Identifier') {
      calling.add(path.node.callee.name);
    }
  });


  root.find(j.FunctionDeclaration).forEach((path) => {
    if(!calling.has(path.node.id.name)) {
      j(path).remove();
    }
  });


  root.find(j.VariableDeclarator).forEach((path) => {
    if(path.node.init.type === 'ArrowFunctionExpression' && path.node.id.type === 'Identifier') {
      if(!calling.has(path.node.id.name)) {
        j(path).remove();
      }
    }
  });

};

export { removeUnusedFunction };
