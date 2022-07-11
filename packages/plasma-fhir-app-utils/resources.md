# Resources

Resources is a set of TypeScript objects representing FHIR resources. They are 100% compatible with the [FHIR types](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fhir) from this library. If a resource object does not exist in `Resources`, you can use the FHIR types in the linked library instead.

The Resources in this package provide:

* Constructor methods to help when constructing new instances of a resource
* Static methods that are useful when working with a resource (string formatting, filtering, etc.)

```typescript
import { Resources } from "plasma-fhir-app-utils";
```

### Patient

```typescript
// Get the patient's "official" name...
const officialName = Resources.Patient.getOfficialName(patient);
```

```typescript
// Get the patient's "home" address...
const addrHome = Resources.Patient.getHomeAddress(patient);
```

### HumanName

```typescript
// Gets all names based on the given "use"...
const names = Resources.HumanName.getNamesByUse(patient.name, "maiden");
```

```typescript
const officialName = Resources.Patient.getOfficialName(patient);

// Convert a name to a displayable string...
const sName = Resources.HumanName.toString(officialName);
```

### Reference

```typescript
// Get a reference to the given patient
const patientRef = Resources.Reference.createPatientReference(patientId);
```

### CodeableConcept

```typescript
// Create a CodeableConcept from a singl Coding resource...
const cc = Resources.CodeableConcept.fromSingleCoding(coding);
```

```typescript
// Get a displayable string for this CodeableConcept...
const onlyFirstCode = true;
const sCC = Resources.CodeableConcept.getDisplayText(cc, onlyFirstCode);
```

```typescript
let cc = [....];

// Sort a CodeableConcept by the display text
cc = cc.sort(Resources.CodeableConcept.sortByDisplayText);
```

### Quantity

```typescript
// Get displayable string...
const sQuantity = Resources.Quantity.toString(quantity);
```

### Age

```typescript
// Construct an Age from a given quantity...
const age = Resources.Age.fromQuantity(quantity);
```

```typescript
// Construct an Age from a given number of years...
const age = Resources.Age.fromYears(25);
```

### Range

```typescript
// Construct a Range from a set of numbers...
const range = Resources.Range.fromNumbers(25, 30);
```

```typescript
// Construct a Range from a string...
const range = Resources.Range.fromString("25 - 30");
```

```typescript
// Construct a Range from an age string...
const r1 = Resources.Range.fromAgeString("20's");
const r2 = Resources.Range.fromAgeString("25-30");
```

```typescript
// Get a displayable string...
const s = Resources.Range.toString(range);    // 25-30
```

```typescript
// Get a displayabe string for a Range that represents an Age...
const s = Resources.Range.toAgeString(range);    // 25-30y
```

### Period

```typescript
// Construct a Period from two strings...
const period = new Resources.Period("2000-01-01", "2010-12-31");
```

```typescript
// Get the start/end dates of the given Period...
const startDate = Resources.Period.getStartDate(period);
const endDate = Resources.Period.getEndDate(period);
```

```typescript
// Construct a Period from a Range that represents an age...
const dobPeriod = Resources.Period.fromAgeRange(age);
```

```typescript
// Construct a Period from an age string...
const dobPeriod = Resources.Period.fromAgeString("20's");
```

```typescript
// Get a displayable string...
const s = Resources.Period.toString(period);
```

### Ratio

```typescript
// Get a displayable string...
const s = Resources.Ratio.toString(ratio);
```

### Address

```typescript
// Get the address(es) that corresponds to the given "use"...
const addr = Resources.Address.getAddressesByUse(patient.address, "home");
```

```typescript
// Get a displayable string...
const s = Resources.Address.toString(address);
```

### Encounter

```typescript
let encounters = [...];

// Sort encounters by start date...
encounters = encounters.sort(Resources.Encounter.sort);
```

### AdministrativeGender

Set of values for use as "Administrative Gender"

### FamilyMemberHistory\_Relationship

Set of values to be used for the `relationship` property in a FamilyMemberHistory

### FamilyMemberHistoryCondition

```typescript
// Get a FamilyMemberHistoryCondition from a SNOMED code...
const c = Resources.FamilyMemberHistoryCondition(code, display, text, ageOfOnset);
```

### DeviceDeviceName

```typescript
// Get a displayable string...
const s = Resources.DeviceDeviceName.toString(deviceName);
```

### Flag

```typescript
// Get all flags with a given status...
const f = Resources.Flag.getFlagsByStatus(flags, "active");
```

### DocumentReference

```typescript
// Get all documents by the given status...
const d = Resources.DocumentReference.getDocumentReferencesByStatus(docs, "current");
```
