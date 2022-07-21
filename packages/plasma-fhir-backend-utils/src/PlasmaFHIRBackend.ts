import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
import * as url from "url";
import { PlasmaFHIRApi } from "plasma-fhir-app-utils";

// TODO: EXPERIMENTAL
// Generate a JWT with the given private-key/client-id. It will expire 5 minutes from calling this...
export function getEpicJWT(privateKey: string, clientId: string, tokenUrl: string): string {
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
export interface ITokenResponse { access_token: string; expires_in: number; token_type: string; scope: string; };
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

// Initializes a PlasmaFHIRApi that can be used on a backend server. Requires Node 18.x or higher...
export async function plasmaForBackend(serverUrl: string, privateKey: string, clientId: string, tokenUrl: string): Promise<PlasmaFHIRApi> {
    const tokenData = await getBackendAccessCode(privateKey, clientId, tokenUrl);
    if (!tokenData.access_token) { throw new Error("Unable to initialize PlasmaFHIR::forBackend"); }
    return new PlasmaFHIRApi(serverUrl, tokenData.access_token);
}