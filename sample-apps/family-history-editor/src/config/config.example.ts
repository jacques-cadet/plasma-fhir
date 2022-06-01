export default {    
    // SMART-on-FHIR
    "SMART": {
        "clientId":           "smart-client-id-not-needed",
        "completeInTarget":   true,
        "fhirServiceUrl":     "https://launch.smarthealthit.org/v/r4/fhir",
        "patientId":          "8de3051f-6298-43e6-9b7f-2aa6443ee760",
        "redirectUri":        "./app",
        "scope":              "launch launch/patient patient/*.read offline_access",
    },
}