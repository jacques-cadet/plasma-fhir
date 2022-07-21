import * as fs from "fs";
import { PlasmaFHIRApi, Resources } from "plasma-fhir-app-utils";
import { plasmaForBackend } from "plasma-fhir-backend-utils";
import config from "./config/config";

const PRIVATE_KEY_FILE = __dirname + "/epic-privatekey.pem";
const privateKey = fs.readFileSync(PRIVATE_KEY_FILE).toString();
const configData = config.EPIC_BACKEND_SANDBOX;
const PATIENT_ID = "eD.LxhDyX35TntF77l7etUA3";      // Jason Argonaut (Epic Sandbox patient)

async function main() {
    // Initialize Plasma...
    const plasma: PlasmaFHIRApi = await plasmaForBackend(configData.iss, privateKey, configData.clientId, configData.tokenUrl);

    // Load patient data...
    plasma.readPatient(PATIENT_ID).then((patients: Resources.Patient[]) => {
        const patient = patients[0];
        const patientName = Resources.Patient.getOfficialName(patient);
        console.log("Patient: ", Resources.HumanName.toString(patientName!));
    });

    // Load patient Allergies...
    plasma.readAllergyIntolerance(PATIENT_ID).then((allergies: Resources.AllergyIntolerance[]) => {
        console.log("Allergies: ", allergies);
    });
}

main();