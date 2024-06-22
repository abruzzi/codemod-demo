const data = featureToggle('feature-x') ? { foo: 'bar' } : {};
const anotherData = featureToggle('another-feature') ? { baz: 'qux' } : {};
