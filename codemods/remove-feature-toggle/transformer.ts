import { API, FileInfo, Options } from "jscodeshift";

const removeFeatureToggle = (name: string) => {
  return (fileInfo: FileInfo, api: API, options: Options) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    root.find(j.IfStatement).forEach(isf => {
      const test = isf.node.test;

      if(test.type === 'CallExpression' && test.callee.type === 'Identifier' && test.callee.name === 'featureToggle') {
        if(test.arguments.length === 1 && test.arguments[0].type === 'Literal' && test.arguments[0].value === name) {
          console.log(`feature toggle ${name} is tested`);

          
        }
      }
    })

    return root.toSource(options.printOptions || { quote: "single" });
  };
};

export { removeFeatureToggle };
