import { API, Collection, FileInfo, JSCodeshift, Options } from "jscodeshift";

type TransformFunction = { (j: JSCodeshift, root: Collection): void };

const createTransformer =
  (transform: TransformFunction[]) =>
  (fileInfo: FileInfo, api: API, options: Options) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    transform.forEach((transform) => transform(j, root));
    return root.toSource(options.printOptions || { quote: "single" });
  };

export { createTransformer };
