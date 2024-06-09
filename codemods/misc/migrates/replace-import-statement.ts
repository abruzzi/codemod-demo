import { replaceImportStatementFor } from '../utils';

const convertMap = {
    'Button': '@thoughtworks/button/basic-button',
    'FancyButton': '@thoughtworks/button/basic-button',
    'FancyButtonProps': '@thoughtworks/button/types',
    'ButtonColors': '@thoughtworks/button/constants',
    'default': '@thoughtworks/button/basic-button',
    '*': '@thoughtworks/button'
}

export default replaceImportStatementFor('@thoughtworks/button', convertMap);