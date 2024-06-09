import { defineInlineTest } from "jscodeshift/src/testUtils";

import { removeFeatureToggle } from "../transformer";

const transform = removeFeatureToggle("feature-x");

describe("transformer", () => {
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
});
