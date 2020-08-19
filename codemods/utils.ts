import { FileInfo, API, Options, JSCodeshift, JSXAttribute, Collection, ASTPath, JSXElement } from 'jscodeshift';

const getAttributesByName = (j: JSCodeshift, element: ASTPath<JSXElement>, name: string) => {
  return j(element)
    .find(j.JSXOpeningElement)
    .find(j.JSXAttribute)
    .filter(attr => {
      const matches = j(attr)
        .find(j.JSXIdentifier)
        .filter(id => id.value.name === name);

      return Boolean(matches.length);
    })
}
const renamePropName = (pkg: string, from: string, to: string) => (j: JSCodeshift, root: Collection) => {
  const specifiers = root.find(j.ImportDeclaration)
    .filter(path => path.node.source.value === pkg)
    .find(j.ImportDefaultSpecifier);

  if (specifiers.length === 0) {
    return;
  }

  const defaultSpecifier = specifiers.nodes()[0].local.name;
  root
    .findJSXElements(defaultSpecifier)
    .forEach((element) => {
      getAttributesByName(j, element, from).forEach(attr => {
        j(attr).replaceWith(
          j.jsxAttribute(j.jsxIdentifier(to), attr.node.value),
        )
      })
    })
}

const replaceImportStatementFor = (pkg: string, convertMap: any) => (j: JSCodeshift, root: Collection) => {
  root.find(j.ImportDeclaration)
    .filter(path => path.node.source.value === pkg)
    .forEach(path => {
      const defaultSpecifier = path.value.specifiers.filter(
        specifier => specifier.type === 'ImportDefaultSpecifier'
      );

      const defaultDeclarations = defaultSpecifier.map(s => {
        return j.importDeclaration([s], j.literal(convertMap['default']));
      })

      const otherSpecifier = path.value.specifiers.filter(
        specifier => specifier.type === 'ImportSpecifier'
      );

      j(path).replaceWith(defaultDeclarations);

      const otherDeclarations = otherSpecifier.map(s => {
        const localName = s.local.name;
        if (convertMap[localName]) {
          return j.importDeclaration([s], j.literal(convertMap[localName]))
        } else {
          return j.importDeclaration([s], j.literal(convertMap['*']))
        }
      });

      j(path).insertAfter(otherDeclarations);
    });
}

type TransformFunc = { (j: JSCodeshift, root: Collection): void }

const createTransformer = (transFuncs: TransformFunc[]) => (fileInfo: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  transFuncs.forEach(tf => tf(j, root));
  return root.toSource(options.printOptions || { quote: 'single' });
}

export {
  replaceImportStatementFor,
  renamePropName,
  createTransformer
}