# plasma-fhir
Plasma FHIR Framework.

## Summary

### Packages
- `create-plasma-app` Command Line Interface (CLI) for creating a PlasmaFHIR app. You can choose from various templates to get started with.
- `plasma-fhir-app-utils` Utility functions and APIs to help with building apps
- `plasma-fhir-react-client-context` A React component that provides access to the `fhirclient` in a React app
- `plasma-fhir-react-components` A library of React components for displaying and interacting with FHIR resources. Styles can be customized as needed.

### Sample Apps
- `playground` Package for testing things out (not actually a real app)
- `plasma-portal` Patient Portal application
- `plasma-portal-lite` This is used as the template for `create-plasma-app`
- 🔜 `family-history-editor`
- 🔜 `plasma-pedigree`
- 🔜 `family-history-social-network`
- 🔜 `risk-calculator`

### Tools
- Tools used to help with development (scraping data, generating code, etc.)

## Getting Started - Create a New App
___
- `npx create-plasma-app my-app`
  - This will setup a basic template for you to start working with

## Getting Started - Testing Your App

### Patient Standalone App
___

#### Local Testing (SMART-on-FHIR Sandbox)
#### Epic Sandbox
#### Epic Live Health System
#### Cerner Sandbox

### Provider EHR App
___

#### Local Testing (SMART-on-FHIR Sandbox)
- `yarn start`
- Navigate to https://launch.smarthealthit.org/?auth_error=&fhir_version_2=r4&iss=&launch_ehr=1&launch_url=https%3A%2F%2Flocalhost%3A3000%2Flaunch&patient=&prov_skip_auth=1&provider=&pt_skip_auth=0&public_key=&sde=&sim_ehr=1&token_lifetime=15&user_pt=
- Choose `Provider EHR Launch` (Simulate launch within the EHR)
- Set App Launch URL = `https://localhost:3000/launch`

#### Epic Sandbox
#### Epic Live Health System
#### Cerner Sandbox


## Development (on PlasmaFHIR)
___

### Build All Packages
- `cd` into each package and run `yarn` or `npm install`
- For `plasma-fhir-react-components`
  - `npm install`
  - `yarn rollup`

## Integrating with EHR Vendors - Epic
___
### Setup for Epic Sandbox
1. Go to https://fhir.epic.com/ and login
2. Click "Build Apps" and create a new app
3. Specify "Application Audience" is for "Patients"
4. Add resources that you need
5. Redirect URI = https://localhost:3000/app
6. Select FHIR version
7. Complete other required fields
8. CLick "Save & Ready for Sandbox"
9. Copy your "Non-Production Client ID"

### Setup for Live Epic Health System
1. Repeat the same process as above, but select "Ready for Production" and copy your Production Client ID
2. Go to https://open.epic.com/MyApps/Endpoints and find the endpoint for the system you want to connect to

### Other Notes

#### OAuth2 Error
If you are getting an OAuth2 error with your Epic API key, it usually means your API has not yet been setup with Epic. In my observation, it takes about 1 business day (not Saturday/Sunday) before the API key will begin working.

## Integrating with EHR Vendors - Cerner
___
TODO:

## Tips / Tricks / Common Issues:
___

### Launch App With HTTPS
You should try to use HTTPS when testing. This is required in some cases (like Epic live health systems)

- Google Chrome Address bar: `chrome://flags/#allow-insecure-localhost`
  - Enable the setting
- Windows Powershell: `($env:HTTPS = "true") -and (npm start)`
- Mac: `HTTPS=true npm start`
- Other platforms: https://create-react-app.dev/docs/using-https-in-development/



### Invalid Hook Call
```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
```

- Make sure React versions are the same.
- Try: `npm link ../../packages/plasma-fhir-react-client-context/node_modules/react` or `npm link ../../node_modules/react`
  - Might have to remove `plasma-fhir-client-context` from the `package.json` and then put it back

## Technical Notes
___
### Libraries/Packages Being Used
- Plasma Portal
  - Install SASS
  - TailwindCSS
  - React Table
  - fhirclient


## References
___
### SMART-on-FHIR
- App Launcher: https://launch.smarthealthit.org/
- `fhirclient`: https://github.com/smart-on-fhir/client-js
  - Docs: http://docs.smarthealthit.org/client-js/typedoc/index.html

### Epic
- Test providers: https://fhir.epic.com/Documentation?docId=testpatients
  - FHIR, USER
    - Login: `FHIR` / `EpicFhir11!`
- Test patients: https://fhir.epic.com/Documentation?docId=testpatients
  - Explore their data here: https://fhir.epic.com/mychart-fhir/Authentication/Login
  - Camila Lopez
    - ID: `erXuFYUfucBZaryVksYEcMg3`
    - MyChart Login: `fhircamila` / `epicepic1`
  - Derrick Lin
    - ID: `eq081-VQEgP8drUUqCWzHfw3`
    - MyChart Login: `fhirderrick` / `epicepic1`

- API's that will be auto-downloaded (meaning you can immediately use it on an Epic Client):
  - https://fhir.epic.com/Documentation?docId=patientfacingfhirapps