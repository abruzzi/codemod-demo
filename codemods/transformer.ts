import { createTransformer } from './utils';

import replaceImportStatement from './migrates/replace-import-statement';

export default createTransformer([replaceImportStatement]);