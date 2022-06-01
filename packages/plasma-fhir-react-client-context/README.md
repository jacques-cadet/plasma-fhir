# plasma-fhir-react-client-context
A React component that provides access to the `fhirclient` in a React app.

## Usage
___

### Installation
Make sure to install `fhirclient`.
- `yarn add plasma-fhir-react-client-context`

### Usage In Application
- See sample applications for usage and examples.
- `FHIRClientLauncher` handles redirecting for OAUTH2
- Wrap your screens in a `<FHIRClientContextWrapper>` to access `fhirclient`
- In your screen: `const context = useContext(FHIRClientContext);`

## Development
___

### Build
- `yarn build`