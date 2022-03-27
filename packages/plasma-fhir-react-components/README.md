# plasma-fhir-react-components
- Set of React components for displaying FHIR R4 resources.
- Components bind directly to FHIR resources.
- Styles can be customized using CSS.

___

## Usage
Import the components and use them in your application. They should take a FHIR resource as a prop.

```ts
import { FHIRr4 } from "plasma-fhir-react-components";

export function MyComponent(props: any) {
    return (
        <FHIRr4.AllergyIntoleranceView allergyIntolerance={...} />
    );
}
```

### Styling
- Each component has a unique CSS class name(s). You can specify the styles for these classes in your own custom CSS file.
- If you are using SASS along with another CSS library, you can use the `@apply` operator to add classes directly
- Use "Inspect Element" in the browser to determine the class names of each component

```css
.CodingSelector {
    @apply capitalize;
}
```

___
## Testing/Development

### Storybook
- `yarn storybook`
- `yarn build-storybook`

### Unit Tests
- `yarn test`

### Install/Update Locally
- In your app: 
  - `npm install --save ../plasma-fhir-react-components`
- After making changes:
  - This package: `yarn rollup`
  - Your app: `npm install --save ../plasma-fhir-react-components`

___

## Deployment

When deploying, please rollup and publish new version to NPM

### Rollup
- `yarn rollup`

### Publish/Deploy
- Increment version
- `yarn rollup`
- `npm publish`

___

## References:
- https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe

## Common Issues:

```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
```
