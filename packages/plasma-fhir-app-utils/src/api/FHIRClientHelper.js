"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSmokingStatus = exports.getVitals = exports.getLabs = exports.getEncounters = exports.getImmunizations = exports.getConditions = exports.getAllergyIntolerance = exports.getFamilyMemberHistory = void 0;
function getFamilyMemberHistory(fhirClient) {
    return getResource(fhirClient, "FamilyMemberHistory");
}
exports.getFamilyMemberHistory = getFamilyMemberHistory;
function getAllergyIntolerance(fhirClient) {
    return getResource(fhirClient, "AllergyIntolerance", "?clinical-status=active");
}
exports.getAllergyIntolerance = getAllergyIntolerance;
function getConditions(fhirClient, category) {
    const queryString = category ? `?category=${category}` : "";
    return getResource(fhirClient, "Condition", queryString);
}
exports.getConditions = getConditions;
function getImmunizations(fhirClient) {
    return getResource(fhirClient, "Immunization");
}
exports.getImmunizations = getImmunizations;
function getEncounters(fhirClient) {
    return getResource(fhirClient, "Encounter");
}
exports.getEncounters = getEncounters;
function getLabs(fhirClient) {
    return getResource(fhirClient, "Observation", "?category=laboratory");
}
exports.getLabs = getLabs;
function getVitals(fhirClient) {
    return getResource(fhirClient, "Observation", "?category=vital-signs");
}
exports.getVitals = getVitals;
function getSmokingStatus(fhirClient) {
    return getResource(fhirClient, "Observation", "?code=http://loinc.org|72166-2");
}
exports.getSmokingStatus = getSmokingStatus;
/**
 * Gets a FHIR resource for a patient.
 * @param fhirClient Instance of the FHIR client with a patient.
 * @param resourceName Name of resource (Example: "Observation")
 * @param queryString Any extra query string to add (Example: "?category=laboratory")
 * @returns Array of resource requested
 */
function getResource(fhirClient, resourceName, queryString = "") {
    const options = { flat: true };
    return fhirClient.patient.request(`${resourceName}${queryString}`, options).then((value) => {
        const tValue = value;
        // Filter out those "OperationOutcome" results...
        return tValue.filter((x) => { return x.resourceType === resourceName; });
    });
}
