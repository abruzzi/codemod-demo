import {FileInfo, API, Options, ASTPath, ImportDeclaration} from 'jscodeshift';

export default (fileInfo: FileInfo, api: API, options: Options) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);
  
    root.find(j.ImportDeclaration)
    .filter(path => path.node.source.value === '@thoughtworks/button')
    .forEach(path => {
        j(path).replaceWith(
            j.importDeclaration(path.value.specifiers, j.literal('@thoughtworks/button/basic-button'))
        )
    })

    return root.toSource({quote: 'single'});
}