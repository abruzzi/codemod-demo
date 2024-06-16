import {featureToggle} from './utils/featureToggle';

const convertOld = (input: string) => {
  return input.toLowerCase();
}

const convertNew = (input: string) => {
  return input.toUpperCase();
}

const result = featureToggle('feature-convert-new') ? convertNew("Hello, world") : convertOld("Hello, world");

console.log(result);