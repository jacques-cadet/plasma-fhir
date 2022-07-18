import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
import * as url from "url";

//
// Utility methods for working with FHIR services.
//

// Return the "Conformance Statement" for this FHIR URL...
export function getConformanceStatementURL(baseURL: string): string {
    if (!baseURL.endsWith("/")) { baseURL += "/"; }
    return `${baseURL}metadata`;        
}

// Returns the "Conformance Statement" data as a JSON object...
export async function getConformanceStatement(baseURL: string): Promise<any> {
    const url = getConformanceStatementURL(baseURL);
    const options = {  headers: { accept: "application/json" } };

    // Get the raw response and check for errors...
    const rawResponse: Response = await fetch(url, options);
    if (!rawResponse.ok) { throw new Error(rawResponse.statusText); }

    // Convert to JSON...
    return rawResponse.json();
}

// For a given resource type ("resourceType"), returns the search param that should be used to identify the patient. Or null, if we couldn't find one.
// Some of this code is taken from SMART-on-FHIR, client-js (getPatientParam): https://github.com/smart-on-fhir/client-js/blob/master/src/lib.ts
// data.rest[0].resource is a list of resource types and data about them.
// data.rest[0].resource[n].searchParam is a list of search parameters that the resource supports
// Conformance Statment data is returned so you can cache it if you want.
export async function getConformanceStatementPatientSearchParam(baseURL: string, resourceType: string, cachedConformanceStatementData: any | null = null): Promise<{ searchParam: string | undefined, conformance: any }> {

    // Check if data is cached. If not, retrieve it...
    const conformance = (!!cachedConformanceStatementData) 
        ? cachedConformanceStatementData 
        : await getConformanceStatement(baseURL);

    // Check data validity...
    if (!conformance.rest) { return { searchParam: undefined, conformance: conformance }; }
    if (conformance.length <= 0) { return { searchParam: undefined, conformance: conformance }; }
    const resources = conformance.rest[0].resource || [];

    // Find resource for the specified type...
    const resourceOfType = resources.find((resource: any) => { return resource.type === resourceType; });
    if (!resourceOfType) { return { searchParam: undefined, conformance: conformance }; }

    // If this is the "Patient" resource, it should be "_id", but check that it exists...
    if (resourceType == "Patient" && resourceOfType.searchParam.find((x: any) => x.name == "_id")) {
        return { searchParam: "_id", conformance: conformance };
    }

    // Combined (FHIR R2-R4) list of search parameters that can be used to scope a request by patient ID.
    // Find the first match...
    const patientParams = ["patient", "subject", "requester", "member", "actor", "beneficiary"];
    let searchParam = patientParams.find(p => resourceOfType.searchParam.find((x: any) => x.name == p));

    // Return the search parameter that we found, or null...
    return { searchParam, conformance }
}

// TODO: EXPERIMENTAL
// Generate a JWT with the given private-key/client-id. It will expire 5 minutes from calling this...
function getEpicJWT(privateKey: string, clientId: string, tokenUrl: string): string {
    const guid = uuidv4();
    const now = Math.floor((new Date()).getTime() / 1000);
    const exp = now + 5 * 60;   // 5 minutes from now
    const jwtData  = {
        'iss': clientId,
        'sub': clientId,
        'aud': tokenUrl,
        'jti': guid,
        'nbf': now,
        'iat': now,
        'exp': exp,
    };
    return jwt.sign(jwtData, privateKey, { algorithm: "RS384" });
}

// TODO: EXPERIMENTAL
// Get an access token. Requires NodeJS 18.x or higher.
interface ITokenResponse { access_token: string; expires_in: number; token_type: string; scope: string; };
export async function getBackendAccessCode(privateKey: string, clientId: string, tokenUrl: string): Promise<ITokenResponse> {
    // Generate the JWT...
    const jwt = getEpicJWT(privateKey, clientId, tokenUrl);

    // Request the access token...
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    const body = {
        "grant_type": "client_credentials",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion": jwt
    };
    const sBody = (new url.URLSearchParams(body)).toString();
    return fetch(tokenUrl, { method: "POST", headers, body: sBody })
        .then(response => response.json());
}