
const baseUrl = "https://localhost:3000";

export default {
    // SMART-on-FHIR
    "SMART": { 
        "clientId":           "smart-client-id-not-needed",
        "completeInTarget":   true,
        "fhirServiceUrl":     "https://launch.smarthealthit.org/v/r4/fhir",
        "patientId":          "8de3051f-6298-43e6-9b7f-2aa6443ee760",
        "redirectUri":        `${baseUrl}/app`,
        "scope":              "launch launch/patient patient/*.read offline_access",
    },

    // Epic (Patient-Context, Sandbox)
    "EPIC_PATIENT_SANDBOX": { },

    // Epic (Patient Context, Production, DSTU2)
    "EPIC_PATIENT_DSTU2": { },

    // Epic (Patient Context, Production, R4)
    "EPIC_PATIENT_R4": { },

    // Cerner (R4)
    "CERNER_PATIENT_R4": { },
}