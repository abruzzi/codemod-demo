jest.autoMockOff();

import { defineInlineTest } from 'jscodeshift/dist/testUtils';
import addNewPropWhen from '../migrates/add-new-prop-when';
import { createTransformer } from '../utils';

const transformer = createTransformer([addNewPropWhen]);

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
    'do not change'
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
      <Button loading title=''>Click me</Button>
    );
    `,
    'change add title when loading loading is set'
  );
});
