import FancyButton from '@thoughtworks/button/basic-button';
import { ButtonProps as FancyButtonProps } from '@thoughtworks/button/types';
import { ButtonColors } from '@thoughtworks/button/constants';

export default (props: FancyButtonProps) => (
  <FancyButton {...props}>Click me</FancyButton>
);