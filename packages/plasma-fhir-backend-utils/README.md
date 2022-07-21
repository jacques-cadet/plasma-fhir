# plasma-fhir-backend-utils

Utility functions and APIs to help with building backend apps.

## Installation

* `yarn add plasma-fhir-backend-utils`

## Usage
Create a `PlasmaFHIRApi` instance:

```typescript
import { plasmaForBackend } from "plasma-fhir-backend-utils";

const plasma: PlasmaFHIRApi = await plasmaForBackend(iss, privateKey, clientId, tokenUrl);
```

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