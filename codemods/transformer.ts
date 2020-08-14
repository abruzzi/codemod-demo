import { FileInfo, API, Options } from 'jscodeshift';

export default (fileInfo: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const paths = root.find(j.ImportDeclaration)

  paths
    .filter(path => path.node.source.value === '@thoughtworks/button')
    .forEach(path => {
      const defaultSpecifier = path.value.specifiers.filter(
        specifier => specifier.type === 'ImportDefaultSpecifier'
      );

      const otherSpecifier = path.value.specifiers.filter(
        specifier => specifier.type === 'ImportSpecifier'
      );

      j(path).replaceWith(
        j.importDeclaration(defaultSpecifier, j.literal('@thoughtworks/button/basic-button'))
      );

      if(otherSpecifier.length !== 0) {
        j(path).insertAfter(
          j.importDeclaration(otherSpecifier, j.literal('@thoughtworks/button/types'))
        )
      }
    });

  return root.toSource(options.printOptions || { quote: 'single' });
}