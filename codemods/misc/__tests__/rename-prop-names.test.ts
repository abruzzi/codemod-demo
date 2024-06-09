jest.autoMockOff();

import { defineInlineTest } from 'jscodeshift/dist/testUtils';
import renamePropName from '../migrates/rename-prop-names';
import { createTransformer } from '../utils';

const transformer = createTransformer([renamePropName]);

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
    import Button from '@thoughtworks/button';
  
    export default () => (
      <Button>Click me</Button>
    );
    `,
    'do not change when no loading defined'
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' }, 
    {},
    `
    import Button from '@thoughtworks/button';
  
    export default () => (
      <Button loading >Click me</Button>
    );
    `,
    `
    import Button from '@thoughtworks/button';
  
    export default () => (
      <Button isLoading >Click me</Button>
    );
    `,
    'change loading to isLoading'
  );
});
