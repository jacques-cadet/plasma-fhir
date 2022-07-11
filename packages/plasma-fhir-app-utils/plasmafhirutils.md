# PlasmaFHIRUtils

This is a set of somewhat random FHIR-related utility functions. If you are using the `PlasmaFHIRApi`, then you won't need to use these functions as the API will use them internally for you.

```typescript
import { PlasmaFHIRUtils } from "plasma-fhir-app-utils";
```

### getConformanceStatementURL

Returns the URL of the "metadata" endpoint for a given FHIR server.

```typescript
const url = PlasmaFHIRUtils.getConformanceStatementURL(baseURL);
```

### getConformanceStatement

Returns the full "Conformance Statement" as a JSON object

```typescript
const conformance = await PlasmaFHIRUtils.getConformanceStatement(baseURL);
```

### getConformanceStatementPatientSearchParam

For a given FHIR resource, returns the search param that should be used to identify the patient, or null if one could not be found. You can also cache the "Conformance Statement" if you need to call this multiple times.

This is used by the `PlasmaFHIRApi` whenever you call `readPatientResource`.

```typescript
const confStatement = {};
const searchParam = await PlasmaFHIRUtils.getConformanceStatementPatientSearchParam(
    baseURL, "Immunization", confStatement);
```

