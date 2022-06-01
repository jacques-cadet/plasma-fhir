# plasma-fhir
Plasma FHIR Framework

## Packages
- `create-plasma-fhir-app` Command Line Interface (CLI) for creating a PlasmaFHIR app. You can choose from various templates to get started with.
- `plasma-fhir-app-utils` Utility functions and APIs to help with building apps
- `plasma-fhir-react-client-context` A React component that provides access to the `fhirclient` in a React app
- `plasma-fhir-react-components` A library of React components for displaying and interacting with FHIR resources. Styles can be customized as needed.
- `plasma-fhir-react-native-components` A library of React Native components for displaying and interacting with FHIR resources.

## Sample Apps
- `playground` Package for testing things out (not actually a real app)
- `plasma-portal` Patient Portal application

## Tools
- Tools used to help with development (scraping data, generating code, etc.)



- TODO: `plasma-fhir-client-api` A set of APIs for interacting with FHIR resources

## Getting Started - Development

### Build All Packages
- `cd packages/create-plasma-fhir-app`
- `yarn`
- `cd packages/plasma-fhir-app-utils`
- `yarn`
- `cd packages/plasma-fhir-react-components`
- `yarn`
- `cd packages/playground`
- `yarn`
- Etc.

## Getting Started - Create a New App
- It is recommended that you use `create-plasma-fhir-app` to get started. This will setup a basic template for you to start working with.

## Register an App with Epic

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

## Register an App with Cerner

## Testing Your App (Patient Standalone App)
-- How to simulate a patient-standalone launch

### SMART on FHIR
-- How to launch from the SMART console

### Epic Sandbox

### Cerner Sandbox


## Tips and Tricks:

### Launch App With HTTPS (Needed when connecting to a live Epic System)
- Google Chrome Address bar: `chrome://flags/#allow-insecure-localhost`
  - Enable the setting
- Windows Powershell: `($env:HTTPS = "true") -and (npm start)`
- Mac: `HTTPS=true npm start`
- Other platforms: https://create-react-app.dev/docs/using-https-in-development/

### OAuth2 Error (Epic)
- This usually means your API has not yet been setup with Epic

## Other Notes

### Libraries/Packages
- Plasma Portal
  - Install SASS
  - TailwindCSS
  - React Table
  - fhirclient

___

Open Tasks:
- [ ] Get a Cerner API key / sandbox option working
- [ ] Make it work in "EHR Launch Mode"
   - Use this: https://launch.smarthealthit.org/?auth_error=&fhir_version_2=r4&iss=&launch_ehr=1&launch_url=https%3A%2F%2Flocalhost%3A3000&patient=&prov_skip_auth=1&provider=&pt_skip_auth=1&public_key=&sde=&sim_ehr=1&token_lifetime=15&user_pt=
   - This needs to be a new template or something
   - You can test with SMART, but currently the config specifies which patient to select. That should change (obviously)
 - [ ] Create templates for these options.
   - [ ] Patient Standalone - Blank
   - [ ] Patient Standalone - Plasma Portal
   - [ ] Patient Portal Launch - Blank
   - [ ] Patient Portal Launch - Plasma Portal
   - [ ] EHR Launch - Blank
   - [ ] EHR Launch - Plasma Portal
 - [ ] Figure out how to save/create more than one family member at a time
 - [ ] Create a `FamilyMemberHistoryEdit` component that allows you to edit/create/save certain properties of a FamilyMemberHistory (no conditions for now)
 - [ ] Generate the Family History relationship list from the official HL7 list (https://terminology.hl7.org/3.1.0/CodeSystem-v3-RoleCode.json.html)
 - [ ] Implement a condition searching feature in Family History. Maybe we can use this API? http://ihtsdo.github.io/sct-snapshot-rest-api/api.html







