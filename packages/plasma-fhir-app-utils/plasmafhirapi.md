# PlasmaFHIRApi

The `PlasmaFHIRApi` allows you to perform basic CRUD operations on FHIR resources. This API supports TypeScript and has full type support for FHIR resources.

## Initialization

The `PlasmaFHIRApi` requires two pieces of data to initialize:

* FHIR Server URL (so it knows where to query for data)
* Auth Token (to prove to the server that you have permission to query for data)

```typescript
const plasma = new PlasmaFHIRApi(serverUrl, authToken);
```

### Initialization with client-js

If you are using the [client-js](https://github.com/smart-on-fhir/client-js) library, you can initialize a `PlasmaFHIRApi` directly from the initialized client object.

```typescript
const plasma = PlasmaFHIRApi.fromFHIRCLient(fhirClient);
```

## Reading Data

Any resource can be read using `readResource` and specifying the type of resource you want to read, along with any query string parameters you want to include.

```typescript
import { PlasmaFHIRApi, Resources } from "plasma-fhir-app-utils";

const plasma = new PlasmaFHIRApi(serverUrl, authToken);
plasma.readResource<Resources.Immunization>("Immunization",  { "patient": patientId })
    .then((immunizations: Resources.Immunization[]) => {
        console.log("Immunizations", immunizations);
    });
```

**NOTE:** that you can also pass in the `serverUrl` and `authToken` if you'd like. If you don't pass them in, then the values provided when the API was initialized will be used.

**NOTE:** If you don't want to use `Resources` from `plasma-fhir-app-utils`, you can also import the resource you need from the [FHIR types](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fhir) (they are compatible).

### Reading Data (Patient Specific)

When you are working with patient-specific data, it's recommended to use `readPatientResource`. This function will specifically ask you to provide the `patientId` so you don't forget.

```typescript
import { PlasmaFHIRApi, Resources } from "plasma-fhir-app-utils";

const plasma = new PlasmaFHIRApi(serverUrl, authToken);
plasma.readPatientResource<Resources.Immunization>(patientId, "Immunization",  {})
    .then((immunizations: Resources.Immunization[]) => {
        console.log("Immunizations", immunizations);
    });
```

### Reading Data (Resource Specific)

In _some_ cases, we have resource-specific APIs. The purpose of this is to 1) provide more specificity to the search parameters you are allowed to pass in, and 2) to provide some abstraction for some common data types.

For example, vital signs are a type of `Observation` with a `category` of `vital-signs`, so you could get that data like this:

```typescript
plasma.readPatientResource<Resources.Observation>(patientId, "Observation", 
    { "category": "vital-signs" })
```

But an easier method would be:

```typescript
plasma.readVitals(patientId)
```

## Writing Data

### Creating New Resources

```typescript
const immunization: Resources.Immunization = new Resources.Immunization();
immunization.patient = patientRef;
        
plasma.createResource<Resources.Immunization>(immunization)
    .then((immunization: Resources.Immunization) => {
        console.log("Created immunization", immunization);        
    });
```

### Updating an Existing Resource

```typescript
plasma.updateResource<Resources.Immunization>(immunization)
    .then((immunization: Resources.Immunization) => {
        console.log("Resource updated", immunization);
    });
```

### Deleting an Existing Resource

```typescript
plasma.deleteResource<Resources.Immunization>(immunization)
    .then((outcome: r4.OperationOutcome) => { /* Check outcome */ });
```

Or

```typescript
plasma.deleteResourceById<Resources.Immunization>("Immunization", immunization.id + "")
    .then((outcome: r4.OperationOutcome) => { /* Check outcome */ });
```

