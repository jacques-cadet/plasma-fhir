# Conversions

Functions for converting to and from units.

### Usage

```typescript
import { Conversions } from "plasma-fhir-app-utils";

const kgs = 3;

// Converter for kg -> lbs
const converter = Conversions.findConverter("kg", "lbs");
if (converter) {
    const lbs = converter(kgs);
}
```

Alternatively...

```typescript
import { Conversions } from "plasma-fhir-app-utils";

const kgs = 3;
const lbs = Conversions.kgsToLbs(kgs);
```

### Supported Conversions

`Kilograms ("kg") <-> Pounds ("lbs")`







