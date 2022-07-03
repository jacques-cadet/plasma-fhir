# Create an Epic App

First, follow the [Getting Started](getting-started.md) guide to setup your Plasma FHIR application. There are then some steps involved in getting it running with Epic.

## Setup for Epic Sandbox

1. Go to [https://fhir.epic.com/](https://fhir.epic.com/) and login
2. Click "Build Apps" and create a new app
3. Specify "Application Audience" is for "Patients"
4. Add resources that you need
5. Redirect URI = [https://localhost:3000/app](https://localhost:3000/app)
6. Select FHIR version
7. Complete other required fields
8. CLick "Save & Ready for Sandbox"
9. Copy your "Non-Production Client ID"

## Setup for Live Epic Health System

1. Repeat the same process as above, but select "Ready for Production" and copy your Production Client ID
2. Go to [https://open.epic.com/MyApps/Endpoints](https://open.epic.com/MyApps/Endpoints) and find the endpoint for the system you want to connect to

## Sandbox Data

* Test providers: [https://fhir.epic.com/Documentation?docId=testpatients](https://fhir.epic.com/Documentation?docId=testpatients)
  * FHIR, USER
    * Login: `FHIR` / `EpicFhir11!`
* Test patients: [https://fhir.epic.com/Documentation?docId=testpatients](https://fhir.epic.com/Documentation?docId=testpatients)
  * Explore their data here: [https://fhir.epic.com/mychart-fhir/Authentication/Login](https://fhir.epic.com/mychart-fhir/Authentication/Login)
  * Camila Lopez
    * ID: `erXuFYUfucBZaryVksYEcMg3`
    * MyChart Login: `fhircamila` / `epicepic1`
  * Derrick Lin
    * ID: `eq081-VQEgP8drUUqCWzHfw3`
    * MyChart Login: `fhirderrick` / `epicepic1`

## Other Notes

API's that will be auto-downloaded (meaning you can immediately use it on an Epic Client):

* [https://fhir.epic.com/Documentation?docId=patientfacingfhirapps](https://fhir.epic.com/Documentation?docId=patientfacingfhirapps)

### Troubleshooting

**OAuth2 Error**

If you are getting an OAuth2 error with your Epic API key, it usually means your API has not yet been setup with Epic. In my observation, it takes about 1 business day (not Saturday/Sunday) before the API key will begin working.
