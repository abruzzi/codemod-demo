import { removeFeatureToggle } from "./remove-feature-toggle";
import { removeUnusedImport } from "./remove-unused-import";
import { createTransformer } from "./utils";
import {removeUnusedFunction} from "./remove-unused-function";

const removeFeatureProductListEnhance = removeFeatureToggle("feature-product-list-enhance");

const transform = createTransformer([
  removeFeatureProductListEnhance,
  removeUnusedImport,
  removeUnusedFunction,
]);

export default transform;
