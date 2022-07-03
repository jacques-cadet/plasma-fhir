# plasma-fhir-react-client-context

A React component that provides access to the `fhirclient` in a React app.

## Installation

* Make sure to install `fhirclient`.
* `yarn add plasma-fhir-react-client-context`

## Usage In Application

* See sample applications for usage and examples.
* `FHIRClientLauncher` handles redirecting for OAUTH2
* Wrap your screens in a `<FHIRClientContextWrapper>` to access `fhirclient`
* In your screen: `const context = useContext(FHIRClientContext);`

## Development

### Build

* `yarn build`

### Deploy

* Increment version
* `npm publish` (Make sure you install `json` via `npm install -g json`)
