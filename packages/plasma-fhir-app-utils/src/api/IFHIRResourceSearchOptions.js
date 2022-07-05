"use strict";
//
// These interfaces are used to enhance searching for FHIR resources.
// They can be passed in to the methods in PlasmaFHIRApi.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.FHIRResourceSearchOptions = void 0;
// Helper methods for IFHIRResourceSearchOptions...
class FHIRResourceSearchOptions {
    // Converts each option in searchOptions to a query-string format. 
    // Values will be encoded.
    // End-result will be every key/value pair in the format: "key=value&key=value&key=value"
    static convertToQueryString(searchOptions) {
        const kvpSearchOptions = [];
        for (const searchKey in searchOptions) {
            const searchValue = encodeURIComponent(searchOptions[searchKey]);
            kvpSearchOptions.push(`${searchKey}=${searchValue}`);
        }
        return kvpSearchOptions.join("&");
    }
}
exports.FHIRResourceSearchOptions = FHIRResourceSearchOptions;
