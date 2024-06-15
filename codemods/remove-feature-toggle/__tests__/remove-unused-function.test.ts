import {defineInlineTest} from "jscodeshift/src/testUtils";

import {removeUnusedFunction} from "../remove-unused-function";
import {createTransformer} from "../utils";

const transform = createTransformer([removeUnusedFunction]);

describe("remove unused import", () => {
  defineInlineTest(
    transform,
    {},
    `
    const convertNew = (input) => {
      return input.toUpperCase();
    }
    
    const result = convertNew("Hello, world");
    `,
    `
     const convertNew = (input) => {
      return input.toUpperCase();
    }
    
    const result = convertNew("Hello, world");
    `,
    "do not change",
  );

  defineInlineTest(
    transform,
    {},
    `
    function convert (input) {
      console.log('convert string');
    }
    `,
    ``,
    "remove unused function declaration"
  );

  defineInlineTest(
    transform,
    {},
    `
    const convert = (input) => {
      console.log('convert string');
    }
    `,
    ``,
    "remove unused arrow function declaration"
  );
});
