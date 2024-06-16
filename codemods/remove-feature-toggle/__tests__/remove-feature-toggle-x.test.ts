import { defineInlineTest } from "jscodeshift/src/testUtils";

import { removeFeatureToggle } from "../remove-feature-toggle";
import { createTransformer } from "../utils";

const transform = createTransformer([removeFeatureToggle("feature-x")]);

describe("remove feature toggle", () => {
  defineInlineTest(
    transform,
    {},
    `
    if (featureToggle('feature-y')) {
      console.log('feature is on');
    }
    `,
    `
    if (featureToggle('feature-y')) {
      console.log('feature is on');
    }
    `,
    "do not change"
  );

  defineInlineTest(
    transform,
    {},
    `
    if (featureToggle('feature-x')) {
      console.log('feature is on');
    }
    `,
    `
    console.log('feature is on');
    `,
    "delete the surrounding if-statement"
  );

  defineInlineTest(
    transform,
    {},
    `
    if (featureToggle('feature-x')) {
      console.log('feature is on');
      console.log('and we should do something meaningful here');
    }
    `,
    `
    console.log('feature is on');
    console.log('and we should do something meaningful here');
    `,
    "delete the surrounding if-statement multiple lines"
  );

  defineInlineTest(
    transform,
    {},
    `
    const data = featureToggle('feature-x') ? {name: 'Feature X'} : undefined;
    `,
    `
    const data = {name: 'Feature X'};
    `,
    "delete the surrounding conditional operator"
  );

  defineInlineTest(
    transform,
    {},
    `
    const func = () => {
      return featureToggle('feature-x') ? {name: 'Feature X'} : undefined;    
    }
    `,
    `
    const func = () => {
      return {name: 'Feature X'};    
    }
    `,
    "delete the surrounding conditional operator in returning"
  );
});
