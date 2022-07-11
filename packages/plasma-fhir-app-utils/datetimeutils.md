# DateTimeUtils

Utility functions for working with date/time objects.

```typescript
import { DateTimeUtils } from "plasma-fhir-app-utils";
```

### fromString

```typescript
// Parse a string to a date...
const d = DateTimeUtils.fromString("1990-12-01");
```

### getDOBFromAge

```typescript
// Given an age, returns the highest/lowest possible DOB (relative to the given date)...
const dob = DateTimeUtils.getDOBFromAge(35, new Date());
console.log(dob.dobStart);
console.log(dob.dobEnd);
```

### getAgeFromDOB

```typescript
// Given a DOB, returns a person's age (relative to the given date)...
const date = DateTimeUtils.fromString("1990-12-01");
const age = DateTimeUtils.getAgeFromDOB(date, new Date());
```
