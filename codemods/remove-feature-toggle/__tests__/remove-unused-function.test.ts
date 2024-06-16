import { defineInlineTest } from "jscodeshift/dist/testUtils";

import { removeUnusedFunction } from "../remove-unused-function";
import { createTransformer } from "../utils";

const transform = createTransformer([removeUnusedFunction]);

describe("remove unused import", () => {
  // defineInlineTest(
  //   transform,
  //   {},
  //   `
  //   const convertNew = (input) => {
  //     return input.toUpperCase();
  //   }
  //
  //   const result = convertNew("Hello, world");
  //   `,
  //   `
  //    const convertNew = (input) => {
  //     return input.toUpperCase();
  //   }
  //
  //   const result = convertNew("Hello, world");
  //   `,
  //   "do not change",
  // );
  //
  // defineInlineTest(
  //   transform,
  //   {},
  //   `
  //   function convert (input) {
  //     console.log('convert string');
  //   }
  //   `,
  //   ``,
  //   "remove unused function declaration"
  // );
  //
  // defineInlineTest(
  //   transform,
  //   {},
  //   `
  //   const convert = (input) => {
  //     console.log('convert string');
  //   }
  //   `,
  //   ``,
  //   "remove unused arrow function declaration"
  // );
  //
  // defineInlineTest(
  //   transform,
  //   {},
  //   `
  //   const convert = (input) => {
  //     console.log('convert string');
  //   }
  //
  //   const convertWrapper = (input) => {
  //     return convert(input);
  //   }
  //
  //   export { convertWrapper };
  //   `,
  //   `
  //   const convert = (input) => {
  //     console.log('convert string');
  //   }
  //
  //   const convertWrapper = (input) => {
  //     return convert(input);
  //   }
  //
  //   export { convertWrapper };
  //   `,
  //   "remove unused arrow function declaration"
  // );
  //
  // defineInlineTest(
  //   transform,
  //   {},
  //   `
  //   const convert = (input) => {
  //     console.log('convert string');
  //   }
  //
  //   export {convert};
  //   `,
  //   `
  //   const convert = (input) => {
  //     console.log('convert string');
  //   }
  //
  //   export {convert};
  //   `,
  //   "don not remove unused but exposed"
  // );

  defineInlineTest(
    { default: transform, parser: "tsx" },
    {},
    `
    const NewProductList = (props: ProductListProps) => {
      return (
        <ul>
          {props.list.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    };

    const ProductList = (props: ProductListProps) => {
      return (<NewProductList {...props} />);
    };
    
    export { ProductList };
    `,
    `
    const NewProductList = (props: ProductListProps) => {
      return (
        <ul>
          {props.list.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    };

    const ProductList = (props: ProductListProps) => {
      return (<NewProductList {...props} />);
    };
    
    export { ProductList };
    `,
    "do not remove tsx component function"
  );
});
