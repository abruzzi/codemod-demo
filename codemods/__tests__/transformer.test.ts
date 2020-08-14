import { defineInlineTest } from 'jscodeshift/dist/testUtils';
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
})
