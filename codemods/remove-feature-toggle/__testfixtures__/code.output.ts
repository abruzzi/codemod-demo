import {featureToggle} from './utils/featureToggle';

const convertOld = (input: string) => {
  return input.toLowerCase();
}

const convertNew = (input: string) => {
  return input.toUpperCase();
}

const result = convertNew("Hello, world");