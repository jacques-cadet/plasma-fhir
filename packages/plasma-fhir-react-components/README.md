# PlasmaFHIR Components
Set of React components for displaying FHIR R4 resources.

## Usage
Import the components and use them in your application. They should take a FHIR resource as a prop.

```
import { FHIRr4 } from "plasma-fhir-react-components";

export function MyComponent(props) {
    return (
        <FHIRr4.AllertyIntoleranceView allergyIntolerance={...} />
    )
}
```

## Styling
- Each component has a unique CSS class name(s). You can specify the styles for these classes in your own custom CSS file.
- If you are using SASS along with another CSS library, you can use the `@apply` operator to add classes directly

## Storybook
`yarn storybook`
`yarn build-storybook`

## Unit Tests
`yarn test`

## Rollup
`yarn rollup`

## Publish
- Increment version
- `yarn rollup`
- `npm publish`

## Install/Update Locally
- In your app: 
  - `npm install --save ../plasma-fhir-react-components`
- After making changes:
  - This package: `yarn rollup`
  - Your app: `npm install --save ../plasma-fhir-react-components`

## References:
- https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe