"use strict";
//
// Utility methods for working with FHIR services.
//
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
exports.PlasmaFHIRUtils = void 0;
class PlasmaFHIRUtils {
    // Return the "Conformance Statement" for this FHIR URL...
    static getConformanceStatementURL(baseURL) {
        if (!baseURL.endsWith("/")) {
            baseURL += "/";
        }
        return `${baseURL}metadata`;
    }
    // Returns the "Conformance Statement" data as a JSON object...
    static getConformanceStatement(baseURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = PlasmaFHIRUtils.getConformanceStatementURL(baseURL);
            const options = { headers: { accept: "application/json" } };
            // Get the raw response and check for errors...
            const rawResponse = yield fetch(url, options);
            if (!rawResponse.ok) {
                throw new Error(rawResponse.statusText);
            }
            // Convert to JSON...
            return rawResponse.json();
        });
    }
    // For a given resource type ("resourceType"), returns the search param that should be used to identify the patient. Or null, if we couldn't find one.
    // Some of this code is taken from SMART-on-FHIR, client-js (getPatientParam): https://github.com/smart-on-fhir/client-js/blob/master/src/lib.ts
    // data.rest[0].resource is a list of resource types and data about them.
    // data.rest[0].resource[n].searchParam is a list of search parameters that the resource supports
    // Conformance Statment data is returned so you can cache it if you want.
    static getConformanceStatementPatientSearchParam(baseURL, resourceType, cachedConformanceStatementData = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if data is cached. If not, retrieve it...
            const conformance = (!!cachedConformanceStatementData)
                ? cachedConformanceStatementData
                : yield PlasmaFHIRUtils.getConformanceStatement(baseURL);
            // Check data validity...
            if (!conformance.rest) {
                return { searchParam: undefined, conformance: conformance };
            }
            if (conformance.length <= 0) {
                return { searchParam: undefined, conformance: conformance };
            }
            const resources = conformance.rest[0].resource || [];
            // Find resource for the specified type...
            const resourceOfType = resources.find((resource) => { return resource.type === resourceType; });
            if (!resourceOfType) {
                return { searchParam: undefined, conformance: conformance };
            }
            // If this is the "Patient" resource, it should be "_id", but check that it exists...
            if (resourceType == "Patient" && resourceOfType.searchParam.find((x) => x.name == "_id")) {
                return { searchParam: "_id", conformance: conformance };
            }
            // Combined (FHIR R2-R4) list of search parameters that can be used to scope a request by patient ID.
            // Find the first match...
            const patientParams = ["patient", "subject", "requester", "member", "actor", "beneficiary"];
            let searchParam = patientParams.find(p => resourceOfType.searchParam.find((x) => x.name == p));
            // Return the search parameter that we found, or null...
            return { searchParam, conformance };
        });
    }
}
exports.PlasmaFHIRUtils = PlasmaFHIRUtils;
