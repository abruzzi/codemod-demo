import { Collection, JSCodeshift } from "jscodeshift";

const removeUnusedImport = (j: JSCodeshift, root: Collection) => {
  const usedIds = new Set();

  root.find(j.Identifier).forEach((path) => {
    if (!path.parent.node.type.includes("Import")) {
      usedIds.add(path.node.name);
    }
  });

  root.find(j.ImportDeclaration).forEach((path) => {
    const specifiers = path.node.specifiers.filter((specifier) =>
      usedIds.has(specifier.local.name)
    );

    if (specifiers.length === 0) {
      j(path).remove();
    } else {
      path.node.specifiers = specifiers;
    }
  });

  root.find(j.FunctionDeclaration).forEach((path) => {
    if (!usedIds.has(path.node.id.name)) {
      j(path).remove();
    }
  });
};

export { removeUnusedImport };
