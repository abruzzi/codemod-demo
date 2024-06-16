import { defineTest } from "jscodeshift/src/testUtils";

defineTest(__dirname, 'remove-feature-convert-new', null, 'code', {parser: 'ts'});

defineTest(__dirname, 'remove-feature-product-list-enhance', null, 'component', {parser: 'tsx'});