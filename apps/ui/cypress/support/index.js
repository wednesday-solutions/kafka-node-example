// ***********************************************************
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

/// <reference types="cypress" />
import "./commands";

import "@cypress/code-coverage/support";
import "cypress-jest-adapter";

import { configure } from "@testing-library/cypress";

configure({ testIdAttribute: "data-test" });
