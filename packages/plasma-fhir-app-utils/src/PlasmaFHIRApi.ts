import * as r4 from "fhir/r4";
import Client from "fhirclient/lib/Client";
import * as Resources from "./Resources";
import * as PlasmaFHIRUtils from "./PlasmaFHIRUtils";
import { FHIRResourceSearchOptions, IFHIRResourceSearchOptions, IAllergyIntoleranceSearchOptions, IConditionSearchOptions } from "./IFHIRResourceSearchOptions";

//
// APIs for interacting with FHIR resources.
//

export default class PlasmaFHIRApi {
    public serverUrl: string;
    public authToken: string;

    // Cache the conformance statement after making the first call so we don't have to keep looking it up.
    private _cachedConformanceStatementData: any | null = null;

    constructor(serverUrl: string, authToken: string) {
        this.serverUrl = serverUrl;
        this.authToken = authToken;
    }

    // Given an initialized FHIRClient, returns a PlasmaFHIRApi...
    public static fromFHIRClient(fhirClient: Client): PlasmaFHIRApi {
        const serverUrl = (fhirClient as any).state.serverUrl;
        const authToken = (fhirClient as any).state.tokenResponse.access_token;
        return new PlasmaFHIRApi(serverUrl, authToken);
    }

    // FamilyMemberHistory
    public async readFamilyMemberHistory(
        patientId: string, 
        searchOptions: IFHIRResourceSearchOptions = { }, 
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.FamilyMemberHistory[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.FamilyMemberHistory>(patientId, "FamilyMemberHistory", searchOptions, serverUrl, authToken);
    }
    
    // AllergyIntolerance
    public async readAllergyIntolerance(
        patientId: string, 
        searchOptions: IAllergyIntoleranceSearchOptions = { "clinical-status": "active" }, 
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.Observation[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.Observation>(patientId, "AllergyIntolerance", searchOptions, serverUrl, authToken);
    }
    
    // Condition
    public async readCondition(
        patientId: string, 
        searchOptions: IConditionSearchOptions = { }, 
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.Condition[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.Condition>(patientId, "Condition", searchOptions, serverUrl, authToken);
    }
    
    // Immunization
    public async readImmunization(
        patientId: string, 
        searchOptions: IFHIRResourceSearchOptions = { },
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.Immunization[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.Immunization>(patientId, "Immunization", searchOptions, serverUrl, authToken);
    }
    
    // Encounter
    public async readEncounter(
        patientId: string, 
        searchOptions: IFHIRResourceSearchOptions = { },
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.Encounter[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.Encounter>(patientId, "Encounter", searchOptions, serverUrl, authToken);
    }
    
    // Observation :: laboratory
    public async readLabs(
        patientId: string, 
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.Observation[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.Observation>(patientId, "Observation", { category: "laboratory" }, serverUrl, authToken);
    }
    
    // Observation :: vital-signs
    public async readVitals(
        patientId: string, 
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.Observation[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.Observation>(patientId, "Observation", { category: "vital-signs" }, serverUrl, authToken);
    }
    
    // Observation :: loinc|72166-2
    public async readSmokingStatus(
        patientId: string, 
        serverUrl = "", 
        authToken = ""):
    Promise<Resources.Observation[]> {

        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        return this.readPatientResource<Resources.Observation>(patientId, "Observation", { code: "http://loinc.org|72166-2" }, serverUrl, authToken);
    }
    
    // Patient
    public async readPatient(
        patientId: string, 
        searchOptions: IFHIRResourceSearchOptions = { },
        serverUrl = "", 
        authToken = ""):
    Promise<r4.Patient[]> {
        
        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
        searchOptions["_id"] = patientId;
        return this.readResource<r4.Patient>("Patient", searchOptions, serverUrl, authToken);
    }
    
    //
    // Core CRUD Methods
    //

    // Read any resource that requires a patient ID...
    public async readPatientResource<T extends r4.Resource>(patientId: string, resourceName: string, searchOptions: IFHIRResourceSearchOptions, serverUrl: string = "", authToken: string = ""): Promise<T[]> {
        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }

        // Determine which search param should be used for the patient ID. Also cache the conformance statement data...
        const searchParamData = await PlasmaFHIRUtils.getConformanceStatementPatientSearchParam(serverUrl, resourceName, this._cachedConformanceStatementData);
        const patientSearchParam = searchParamData.searchParam;
        if (!this._cachedConformanceStatementData) { this._cachedConformanceStatementData = searchParamData.conformance; }

        // Add patient search option and read the resource...
        if (patientSearchParam) { searchOptions[patientSearchParam] = patientId; }    
        return this.readResource<T>(resourceName, searchOptions, serverUrl, authToken);
    }
    
    // Read any resource...
    public async readResource<T extends r4.Resource>(resourceName: string, searchOptions: IFHIRResourceSearchOptions, serverUrl: string = "", authToken: string = ""): Promise<T[]> {

        // Default parameters...
        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }
    
        // Convert search options to a query string...
        const queryString = FHIRResourceSearchOptions.convertToQueryString(searchOptions);
        const url = `${serverUrl}/${resourceName}?${queryString}`;
    
        // Setup options...
        const headers: HeadersInit = {};
        headers["accept"] = "application/json";
        if (authToken) { headers["authorization"] = `Bearer ${authToken}`; }
        const options: RequestInit = { 
            headers: headers
        };
    
        // Get the raw response and check for errors...
        const rawResponse: Response = await fetch(url, options);
        if (!rawResponse.ok) { throw new Error(rawResponse.statusText); }
    
        // Convert to JSON and format in a useful way...
        const jsonResponse = await rawResponse.json();      // TODO: fhirclient says json() will throw error if body is empty, so use text() and JSON.parse() instead?
        if (!jsonResponse.entry) { return []; }             // This will happen if there are no results, so just return empty array
        const entries: T[] = jsonResponse.entry.map((entry: any) => { return entry.resource as T; });
        return entries.filter((x: T) => { return x.resourceType === resourceName; });
    }

    // Create any FHIR resource...
    public async createResource<T extends r4.Resource>(resource: T, serverUrl: string = "", authToken: string = ""): Promise<T> {

        // Default parameters...
        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }

        // Determine URL...
        const resourceName = resource.resourceType;
        const url = `${serverUrl}/${resourceName}`;

        // Setup options...
        const headers: HeadersInit = {};
        headers["Content-Type"] = "application/json";
        headers["accept"] = "application/json";
        if (authToken) { headers["authorization"] = `Bearer ${authToken}`; }
        const options: RequestInit = { 
            method: "POST",
            headers: headers,
            body: JSON.stringify(resource)
        };

        // Get the raw response and check for errors...
        const rawResponse: Response = await fetch(url, options);
        if (!rawResponse.ok) { throw new Error(rawResponse.statusText); }

        // Convert to JSON and format in a useful way...
        const jsonResponse = await rawResponse.json();
        return jsonResponse;
    }

    // Update any resource...
    public async updateResource<T extends r4.Resource>(resource: T, serverUrl: string = "", authToken: string = ""): Promise<T> {
        
        // Default parameters...
        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }

        // Determine URL...
        const resourceName = resource.resourceType;
        const id = resource.id || "";
        const url = `${serverUrl}/${resourceName}/${id}`;

        // Setup options...
        const headers: HeadersInit = {};
        headers["Content-Type"] = "application/json";
        headers["accept"] = "application/json";
        if (authToken) { headers["authorization"] = `Bearer ${authToken}`; }
        const options: RequestInit = { 
            method: "PUT",
            headers: headers,
            body: JSON.stringify(resource)
        };

        // Get the raw response and check for errors...
        const rawResponse: Response = await fetch(url, options);
        if (!rawResponse.ok) { throw new Error(rawResponse.statusText); }

        // Convert to JSON and format in a useful way...
        const jsonResponse = await rawResponse.json();
        return jsonResponse;
    }

    // Delete any resource...
    public async deleteResource<T extends r4.Resource>(resource: T, serverUrl: string = "", authToken: string = ""): Promise<r4.OperationOutcome> {
        return this.deleteResourceById(resource.resourceType, resource.id || "", serverUrl, authToken);
    }
    
    // Delete any resource...
    public async deleteResourceById<T extends r4.Resource>(resourceName: string, id: string, serverUrl: string = "", authToken: string = ""): Promise<r4.OperationOutcome> {
        // Default parameters...
        if (!serverUrl) { serverUrl = this.serverUrl; }
        if (!authToken) { authToken = this.authToken; }

        // Determine URL...
        const url = `${serverUrl}/${resourceName}/${id}`;

        // Setup options...
        const headers: HeadersInit = {};
        headers["accept"] = "application/json";
        if (authToken) { headers["authorization"] = `Bearer ${authToken}`; }
        const options: RequestInit = { 
            method: "DELETE",
            headers: headers,
        };

        // Get the raw response and check for errors...
        const rawResponse: Response = await fetch(url, options);
        if (!rawResponse.ok) { throw new Error(rawResponse.statusText); }

        // Convert to JSON and format in a useful way...
        const jsonResponse = await rawResponse.json();
        return jsonResponse;
    }
}