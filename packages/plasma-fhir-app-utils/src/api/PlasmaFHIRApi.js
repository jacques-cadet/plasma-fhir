"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlasmaFHIRApi = void 0;
const PlasmaFHIRUtils_1 = require("./PlasmaFHIRUtils");
const IFHIRResourceSearchOptions_1 = require("./IFHIRResourceSearchOptions");
//
// APIs for interacting with FHIR resources.
//
class PlasmaFHIRApi {
    constructor(serverUrl, authToken) {
        // Cache the conformance statement after making the first call so we don't have to keep looking it up.
        this._cachedConformanceStatementData = null;
        this.serverUrl = serverUrl;
        this.authToken = authToken;
    }
    // Given an initialized FHIRClient, returns a PlasmaFHIRApi...
    static fromFHIRClient(fhirClient) {
        const serverUrl = fhirClient.state.serverUrl;
        const authToken = fhirClient.state.tokenResponse.access_token;
        return new PlasmaFHIRApi(serverUrl, authToken);
    }
    // FamilyMemberHistory
    readFamilyMemberHistory(patientId, searchOptions = {}, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "FamilyMemberHistory", searchOptions, serverUrl, authToken);
        });
    }
    // AllergyIntolerance
    readAllergyIntolerance(patientId, searchOptions = { "clinical-status": "active" }, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "AllergyIntolerance", searchOptions, serverUrl, authToken);
        });
    }
    // Condition
    readCondition(patientId, searchOptions = {}, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "Condition", searchOptions, serverUrl, authToken);
        });
    }
    // Immunization
    readImmunization(patientId, searchOptions = {}, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "Immunization", searchOptions, serverUrl, authToken);
        });
    }
    // Encounter
    readEncounter(patientId, searchOptions = {}, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "Encounter", searchOptions, serverUrl, authToken);
        });
    }
    // Observation :: laboratory
    readLabs(patientId, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "Observation", { category: "laboratory" }, serverUrl, authToken);
        });
    }
    // Observation :: vital-signs
    readVitals(patientId, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "Observation", { category: "vital-signs" }, serverUrl, authToken);
        });
    }
    // Observation :: loinc|72166-2
    readSmokingStatus(patientId, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            return this.readPatientResource(patientId, "Observation", { code: "http://loinc.org|72166-2" }, serverUrl, authToken);
        });
    }
    // Patient
    readPatient(patientId, searchOptions = {}, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            searchOptions["_id"] = patientId;
            return this.readResource("Patient", searchOptions, serverUrl, authToken);
        });
    }
    // Read any resource that requires a patient ID...
    readPatientResource(patientId, resourceName, searchOptions, serverUrl = "", authToken = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverUrl) {
                serverUrl = this.serverUrl;
            }
            if (!authToken) {
                authToken = this.authToken;
            }
            // Determine which search param should be used for the patient ID. Also cache the conformance statement data...
            const searchParamData = yield PlasmaFHIRUtils_1.PlasmaFHIRUtils.getConformanceStatementPatientSearchParam(serverUrl, resourceName, this._cachedConformanceStatementData);
            const patientSearchParam = searchParamData.searchParam;
            if (!this._cachedConformanceStatementData) {
                this._cachedConformanceStatementData = searchParamData.conformance;
            }
            // Add patient search option and read the resource...
            if (patientSearchParam) {
                searchOptions[patientSearchParam] = patientId;
            }
            return this.readResource(resourceName, searchOptions, serverUrl, authToken);
        });
    }
    // Read any resource...
    readResource(resourceName, searchOptions, serverUrl, authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // Convert search options to a query string...
            const queryString = IFHIRResourceSearchOptions_1.FHIRResourceSearchOptions.convertToQueryString(searchOptions);
            const url = `${serverUrl}/${resourceName}?${queryString}`;
            // Setup options...
            const options = {
                headers: {
                    accept: "application/json",
                    authorization: "Bearer " + authToken,
                }
            };
            // Get the raw response and check for errors...
            const rawResponse = yield fetch(url, options);
            if (!rawResponse.ok) {
                throw new Error(rawResponse.statusText);
            }
            // Convert to JSON and format in a useful way...
            const jsonResponse = yield rawResponse.json(); // TODO: fhirclient says json() will throw error if body is empty, so use text() and JSON.parse() instead?
            const entries = jsonResponse.entry.map((entry) => { return entry.resource; });
            return entries.filter((x) => { return x.resourceType === resourceName; });
        });
    }
}
exports.PlasmaFHIRApi = PlasmaFHIRApi;
