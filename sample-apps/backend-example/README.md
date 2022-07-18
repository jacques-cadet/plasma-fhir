# Backend-Example

Example of a SMART-on-FHIR app for a backend server.
(Only tested with Epic)

## Setup
1. Register an app with Epic and specify the type as "Backend"
2. Create a Publice/Private Key Pair
   1. Instructions: https://fhir.epic.com/Documentation?docId=oauth2&section=Creating-Key-Pair
      1. `openssl genrsa -out /path_to_key/privatekey.pem 2048`
      2. `openssl req -new -x509 -key /path_to_key/privatekey.pem -out /path_to_key/publickey509.pem -subj '/CN=myapp'`

## Configuration
1. Update `src/config.ts` with the Client ID of the application you created
2. Update `/src/index.ts` to load the private key you generated (in the example, it is loaded from a .pem file)

## Run
1. `npm run start`