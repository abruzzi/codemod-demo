import { FileInfo, API, Options, JSCodeshift } from 'jscodeshift';

const replaceImportStatementFor = (pkg: string, convertMap: any) => (j: JSCodeshift, root: any) => {
  root.find(j.ImportDeclaration)
    .filter(path => path.node.source.value === pkg)
    .forEach(path => {
      const defaultSpecifier = path.value.specifiers.filter(
        specifier => specifier.type === 'ImportDefaultSpecifier'
      );

      const defaultDeclarations = defaultSpecifier.map(s => {
        const localName = s.local.name;
        return j.importDeclaration([s], j.literal(convertMap['default']));
      })

      const otherSpecifier = path.value.specifiers.filter(
        specifier => specifier.type === 'ImportSpecifier'
      );

      j(path).replaceWith(defaultDeclarations);

      const otherDeclarations = otherSpecifier.map(s => {
        const localName = s.local.name;
        if(convertMap[localName]) {
          return j.importDeclaration([s], j.literal(convertMap[localName]))
        } else {
          return j.importDeclaration([s], j.literal(convertMap['*']))
        }
      });

      j(path).insertAfter(otherDeclarations);
    });
}

export default (fileInfo: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const convertMap = {
    'Button': '@thoughtworks/button/basic-button',
    'FancyButton': '@thoughtworks/button/basic-button',
    'FancyButtonProps': '@thoughtworks/button/types',
    'ButtonColors': '@thoughtworks/button/constants',
    'default': '@thoughtworks/button/basic-button',
    '*': '@thoughtworks/button'
  }
 
  const replace = replaceImportStatementFor('@thoughtworks/button', convertMap);
  replace(j, root);

  return root.toSource(options.printOptions || { quote: 'single' });
}