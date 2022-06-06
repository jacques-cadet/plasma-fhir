# TODO

### Framework
- [ ] Make an easier way to get everything installed when first downloading
- [ ] Put links to `fhirclient` where needed.
  - [ ] Contact owners to notify them
  - [ ] Make sure it's ok to include it in my projects
- [ ] Add a license

### create-plasma-fhir-app
- [ ] Doesn't work on Windows?
- [ ] Can't immediately launch (because of the config file thing). Not sure if I want to fix this or not.
- [ ] Patient Portal Launch - Blank
- [ ] Patient Portal Launch - Plasma Portal
- [ ] EHR Launch - Blank
- [ ] EHR Launch - Plasma Portal

### plasma-fhir-app-utils

### plasma-fhir-client-context

### plasma-fhir-react-components
- [ ] Is the _data folder needed?
- [ ] Is the _util folder needed?
- [ ] `yarn test` doesn't work (I guess I don't have tests?)
- [ ] Publish to NPM

### plasma-fhir-react-native-components
- [ ] Need to figure out the OAUTH2 workflow
- [ ] Need to come up with a good system for customizing/styling the components on the client

### playground

### plasma-portal
- [ ] Fix patient header page
- [ ] Fix home screen (clean it up)
- [ ] Fix banners/cards - make them look nicer

### family-history-editor
- [ ] Figure out how to save/create more than one family member at a time
- [ ] Create a `FamilyMemberHistoryEdit` component that allows you to edit/create/save certain properties of a FamilyMemberHistory (no conditions for now)
- [ ] Generate the Family History relationship list from the official HL7 list (https://terminology.hl7.org/3.1.0/CodeSystem-v3-RoleCode.json.html)
- [ ] Implement a condition searching feature in Family History. Maybe we can use this API? http://ihtsdo.github.io/sct-snapshot-rest-api/api.html




___
- [ ] Get a Cerner API key / sandbox option working
- [ ] Make it work in "EHR Launch Mode"
   - Use this: https://launch.smarthealthit.org/?auth_error=&fhir_version_2=r4&iss=&launch_ehr=1&launch_url=https%3A%2F%2Flocalhost%3A3000&patient=&prov_skip_auth=1&provider=&pt_skip_auth=1&public_key=&sde=&sim_ehr=1&token_lifetime=15&user_pt=
   - This needs to be a new template or something
   - You can test with SMART, but currently the config specifies which patient to select. That should change (obviously)

