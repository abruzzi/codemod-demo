import { defineTest } from "jscodeshift/src/testUtils";

defineTest(__dirname, 'remove-feature-convert-new', null, 'code', {parser: 'ts'});