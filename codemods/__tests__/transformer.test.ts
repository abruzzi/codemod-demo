jest.autoMockOff();

import { defineInlineTest, defineTest } from 'jscodeshift/dist/testUtils';
import transformer from '../transformer';

describe('transfomer', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' }, 
    {},
    `
    import Badge from '@thoughtworks/badge';
  
    export default () => (
      <Badge color="red" appearance="standard" />
    );
    `,
    `
    import Badge from '@thoughtworks/badge';
  
    export default () => (
      <Badge color="red" appearance="standard" />
    );
    `,
    'do not change badge'
  );

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

defineTest(__dirname, 'transformer', null, 'button', { parser: "tsx" });
