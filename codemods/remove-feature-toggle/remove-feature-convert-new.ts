import { removeFeatureToggle } from "./remove-feature-toggle";
import { removeUnusedImport } from "./remove-unused-import";
import { createTransformer } from "./utils";
import {removeUnusedFunction} from "./remove-unused-function";

const removeFeatureConvertNew = removeFeatureToggle("feature-convert-new");

const transform = createTransformer([
  removeFeatureConvertNew,
  removeUnusedImport,
  removeUnusedFunction,
]);

export default transform;
