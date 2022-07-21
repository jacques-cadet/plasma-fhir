# plasma-fhir-app-utils

Utility functions and APIs to help with building apps.

## Installation

* `yarn add plasma-fhir-app-utils`

## Util Functions

* Calculate an age from a DOB
* Convert units

## FHIR Client APIs

* APIs for querying for resources with type info

## Development

### Build

* `yarn build`
  * or `tsc` if that doesn't work

### Unit Tests

* `yarn test`

### Publish/Deploy
- `yarn build`
- `yarn test`
  - Windows: `npx mocha -r ts-node/register tests/**/*.spec.ts`
- Login as `plasmafhir`
- Increment version
- `npm publish`