import { removeFeatureToggle } from "./remove-feature-toggle";
import { removeUnusedImport } from "./remove-unused-import";
import { removeUnusedFunction } from "./remove-unused-function";

import { API, FileInfo, Options } from "jscodeshift";

const transform = (fileInfo: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const featureName = options.featureName;

  if (!featureName) {
    throw new Error("Feature name must be provided using --featureName=<name>");
  }

  const removeFeatureToggleTransform = removeFeatureToggle(featureName);

  [
    removeFeatureToggleTransform,
    removeUnusedImport,
    removeUnusedFunction,
  ].forEach((tf) => tf(j, root));

  return root.toSource(options.printOptions || { quote: "single" });
};

export default transform;
