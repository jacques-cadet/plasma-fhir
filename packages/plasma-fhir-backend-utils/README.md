# plasma-fhir-backend-utils

Utility functions and APIs to help with building backend apps for NodeJS.

## Installation

`yarn add plasma-fhir-backend-utils`

## Usage
Create a `PlasmaFHIRApi` instance:

```typescript
import { plasmaForBackend } from "plasma-fhir-backend-utils";
import { PlasmaFHIRApi, Resources } from "plasma-fhir-app-utils";

const plasma: PlasmaFHIRApi = await plasmaForBackend(iss, privateKey, clientId, tokenUrl);

plasma.readResource<Resources.Immunization>("Immunization",  { "patient": patientId })
    .then((immunizations: Resources.Immunization[]) => {
        console.log("Immunizations", immunizations);
    });
```

- `iss`: URL to the FHIR server you are connecting to
- `privateKey`: The text of the private key
  - See here for details on generating one: https://fhir.epic.com/Documentation?docId=oauth2&section=Creating-Key-Pair
- `clientId`: Client ID of your app
- `tokenUrl`: URL of the token endpoint for your FHIR server
  - This can be found at:
    - <iss>/.well-known/smart-configuration
    - <iss>/metadata

___
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