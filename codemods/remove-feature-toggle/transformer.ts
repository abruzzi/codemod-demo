import { API, FileInfo, Options } from "jscodeshift";

const removeFeatureToggle = (name: string) => {
  return (fileInfo: FileInfo, api: API, options: Options) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    root.find(j.IfStatement).forEach(isf => {
      const test = isf.node.test;

      if(test.type === 'CallExpression' && test.callee.type === 'Identifier' && test.callee.name === 'featureToggle') {
        if(test.arguments.length === 1 && test.arguments[0].type === 'Literal' && test.arguments[0].value === name) {
          if(isf.node.consequent.type === 'BlockStatement') {
            j(isf).replaceWith(isf.node.consequent.body);
          }
        }
      }
    })

    root.find(j.VariableDeclarator).forEach(vd => {
      const init = vd.node.init;
      if(init.type === 'ConditionalExpression') {
        const test = init.test;

        if(test.type === 'CallExpression' && test.callee.type === 'Identifier' && test.callee.name === 'featureToggle') {
          if(test.arguments.length === 1 && test.arguments[0].type === 'Literal' && test.arguments[0].value === name) {
            vd.node.init = init.consequent;
          }
        }
      }
    })

    return root.toSource(options.printOptions || { quote: "single" });
  };
};

export { removeFeatureToggle };
