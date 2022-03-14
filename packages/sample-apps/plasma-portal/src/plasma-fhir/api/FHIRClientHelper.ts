import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import * as r4 from "fhir/r4";
import * as PlasmaFHIR from "./FHIRResourceHelpers";

export function getFamilyMemberHistory(fhirClient: Client): Promise<PlasmaFHIR.FamilyMemberHistory[]> {
    return getResource<PlasmaFHIR.FamilyMemberHistory>(fhirClient, "FamilyMemberHistory");
}

export function getAllergyIntolerance(fhirClient: Client): Promise<PlasmaFHIR.AllergyIntolerance[]> {
    return getResource<PlasmaFHIR.AllergyIntolerance>(fhirClient, "AllergyIntolerance", "?clinical-status=active");
}

export function getConditions(fhirClient: Client, category: "problem-list-item" | "encounter-diagnosis" | ""): Promise<PlasmaFHIR.Condition[]> {
    const queryString = category ? `?category=${category}` : "";
    return getResource<PlasmaFHIR.Condition>(fhirClient, "Condition", queryString);
}

export function getImmunizations(fhirClient: Client): Promise<PlasmaFHIR.Immunization[]> {
    return getResource<PlasmaFHIR.Immunization>(fhirClient, "Immunization");
}

export function getEncounters(fhirClient: Client): Promise<PlasmaFHIR.Encounter[]> {
    return getResource<PlasmaFHIR.Encounter>(fhirClient, "Encounter");
}

export function getLabs(fhirClient: Client): Promise<PlasmaFHIR.Observation[]> {
    return getResource<PlasmaFHIR.Observation>(fhirClient, "Observation", "?category=laboratory");
}

export function getVitals(fhirClient: Client): Promise<PlasmaFHIR.Observation[]> {
    return getResource<PlasmaFHIR.Observation>(fhirClient, "Observation", "?category=vital-signs");
}

export function getSmokingStatus(fhirClient: Client): Promise<PlasmaFHIR.Observation[]> {
    return getResource<PlasmaFHIR.Observation>(fhirClient, "Observation", "?code=http://loinc.org|72166-2");
}

/**
 * Gets a FHIR resource for a patient.
 * @param fhirClient Instance of the FHIR client with a patient.
 * @param resourceName Name of resource (Example: "Observation")
 * @param queryString Any extra query string to add (Example: "?category=laboratory")
 * @returns Array of resource requested
 */
function getResource<T extends r4.Resource>(fhirClient: Client, resourceName: string, queryString: string = ""): Promise<T[]> {
    const options = { flat: true };
    return fhirClient.patient.request<fhirclient.JsonObject>(`${resourceName}${queryString}`, options).then((value: fhirclient.JsonObject) => {
        const tValue = (value as any) as T[];

        // Filter out those "OperationOutcome" results...
        return tValue.filter((x: T) => { return x.resourceType === resourceName; });
    });
}