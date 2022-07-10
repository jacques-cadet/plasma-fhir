# plasma-fhir-react-components

This package is a set of React components for displaying FHIR resources (mostly R4, but there are a few DSTU2 components). The components bind directly to FHIR resources.

Out of the box, components are not styled. The styles can and should be customized using CSS. The components are merely to provide logic and structure to components. It is up to you (the developer) to style them in a way that matches your application.

## Demo (Storybook)

Check out our Storybook project to see a demo of each component.

[https://plasmafhir.com/plasma-fhir-react-components](https://plasmafhir.com/plasma-fhir-react-components)

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

* Each component has a unique CSS class name(s). You can specify the styles for these classes in your own custom CSS file.
* If you are using SASS along with another CSS library, you can use the `@apply` operator to add classes directly
* Use "Inspect Element" in the browser to determine the class names of each component.

```css
.CodingSelector {
    @apply capitalize;
}
```

## Testing/Development (of Package)

### Storybook

* `yarn storybook`
* `yarn build-storybook`

### Unit Tests

* `yarn test`

### Install/Update Locally

* In your app:
  * `npm install --save ../../packages/plasma-fhir-react-components`
* After making changes:
  * This package: `yarn rollup`
  * Your app: `npm install --save ../../packages/plasma-fhir-react-components`

## Deployment (of Package)

When deploying, please rollup and publish new version to NPM

### Rollup

* `yarn rollup`

### Publish/Deploy

* Increment version
* `yarn rollup`
* `yarn storybook` (make sure everything looks ok)
* `npm publish`
* `yarn build-storybook`
* Publish the static files to plasmafhir.com/plasma-fhir-react-components

## References:

* [https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe)
