jest.autoMockOff();

import { defineInlineTest } from 'jscodeshift/dist/testUtils';
import replaceImportStatement from '../migrates/replace-import-statement';
import { createTransformer } from '../utils';

const transformer = createTransformer([replaceImportStatement]);

describe('transfomer', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' }, 
    {},
    `
    import Button from '@thoughtworks/button';
  
    export default () => (
      <Button>Click me</Button>
    );
    `,
    `
    import Button from '@thoughtworks/button/basic-button';
  
    export default () => (
      <Button>Click me</Button>
    );
    `,
    'split button package to smaller chunks'
  );
});
