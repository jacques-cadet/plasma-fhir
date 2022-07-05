//
// These interfaces are used to enhance searching for FHIR resources.
// They can be passed in to the methods in PlasmaFHIRApi.
//

// Resource search options are query-string params you can add when requesting a resource to help search for them.
// The properties of this interface will be serialized in the query-string like "&key=value"
// For example, for AllergyIntolerance, we can use { "clinical-status": "active" } and get a query string like: "AllergyIntolerance?clinical-status=active"
export interface IFHIRResourceSearchOptions {
    [key: string]: any;
}

// Search options for the AllergyIntolerance resource...
export interface IAllergyIntoleranceSearchOptions extends IFHIRResourceSearchOptions {
    "clinical-status"?: "active" | "inactive" | "resolved";
}

// Search options for the Condition resource...
export interface IConditionSearchOptions extends IFHIRResourceSearchOptions {
    "category"?: "problem-list-item" | "encounter-diagnosis" | "";
}

// Helper methods for IFHIRResourceSearchOptions...
export class FHIRResourceSearchOptions implements IFHIRResourceSearchOptions {
    // Converts each option in searchOptions to a query-string format. 
    // Values will be encoded.
    // End-result will be every key/value pair in the format: "key=value&key=value&key=value"
    public static convertToQueryString(searchOptions: IFHIRResourceSearchOptions): string {
        const kvpSearchOptions = [];
        for (const searchKey in searchOptions) {
            const searchValue = encodeURIComponent(searchOptions[searchKey]);
            kvpSearchOptions.push(`${searchKey}=${searchValue}`);
        }
        return kvpSearchOptions.join("&");
    }
}