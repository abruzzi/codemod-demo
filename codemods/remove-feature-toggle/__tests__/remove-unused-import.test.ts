import { defineInlineTest } from "jscodeshift/src/testUtils";

import { removeUnusedImport } from "../remove-unused-import";
import { createTransformer } from "../utils";

const transform = createTransformer([removeUnusedImport]);

describe("remove unused import", () => {
  defineInlineTest(
    transform,
    {},
    `
    import {func} from './library';

    func('abc');
    `,
    `
    import {func} from './library';

    func('abc');
    `,
    "do not change"
  );

  defineInlineTest(
    transform,
    {},
    `
    import {func} from './library';
    
    function convert (input) {
      console.log('convert string');
    }
    `,
    `
    function convert (input) {
      console.log('convert string');
    }
    `,
    "remove unused import func"
  );

  defineInlineTest(
    transform,
    {},
    `
    import {func, func2} from './library';
    
    func('abc');
    
    function convert (input) {
      console.log('convert string');
    }
    `,
    `
    import { func } from './library';
    
    func('abc');
    
    function convert (input) {
      console.log('convert string');
    }
    `,
    "remove unused import func2"
  );
});
