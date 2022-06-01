import RoleCodes from '../data/RoleCodes.json';

/**
 * This function 
 *    1) reads the "RoleCodes" JSON file (from the FHIR website)
 *    2) extracts all FamilyMemberHistory relationship values
 *    3) creates static "Coding" objects for each relationship in the form of code that can be copied into a module
 */

export default function start() {

    // Filter out any bad data so we can avoid crashes when accessing properties...
    const CLEAN_ROLE_CODES = RoleCodes.filter(x => { return x.property && Array.isArray(x.property) });

    // Build an object of parent -> children keys.
    // Example: parentToChildrenKeys["UNCLE"] = ["MUNCLE", "PUNCLE"]
    const parentToChildrenKeys: { [key: string]: string[] } = {};
    CLEAN_ROLE_CODES.forEach(roleCode => {
        // Get this roleCode's parent...
        const parent = (roleCode.property as any[]).find((item: any) => item.code === "subsumedBy")?.valueCode;
        if (!parent) { return; }

        // Add this roleCode to its parent's children array...
        if (!parentToChildrenKeys.hasOwnProperty(parent)) { parentToChildrenKeys[parent] = []; }
        parentToChildrenKeys[parent].push(roleCode.code);
    });

    // Starting with "FAMMEMB", build out a flat list of all family members...
    // Format to begin with is something like: familyMemberRoleCodes["UNCLE"] = { };
    // But eventually, that object will be filled in with the actual roleCode data
    const familyMemberRoleCodes: any = {};
    getDerivedRoleCodes(parentToChildrenKeys, ["FAMMEMB"], familyMemberRoleCodes);

    // Now fill in the actual data from the JSON file...
    CLEAN_ROLE_CODES.forEach(roleCode => {
        if (familyMemberRoleCodes.hasOwnProperty(roleCode.code)) {
            familyMemberRoleCodes[roleCode.code] = roleCode;
        }
    });

    // "code" will be a string containing the actual TypeScript code we are generating...
    let code = "";
    code += "export const FamilyMemberHistory_Relationship = {\n";

    // Now generate the code for each family member...
    const usedKeys: { [key: string]: boolean } = {};
    const system = "http://terminology.hl7.org/CodeSystem/v3-RoleCode";    
    Object.values(familyMemberRoleCodes).forEach((roleCode: any) => {
        // For the key, remove invalid characters and convert to capital case...
        let key = roleCode.display
            .replaceAll("-", " ")
            .replaceAll("/", " ")
            .split(" ")
            .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
            .join("");

        // A couple values map to the same key (e.g. "mother-in-law"), so if that happens, just fallback to the code...
        if (usedKeys.hasOwnProperty(key)) { key = roleCode.code; }
        usedKeys[key] = true;
        
        // Generate the actual TS code...
        code += `\t${key}: new Coding("${system}", "${roleCode.code}","${roleCode.display}"),\n`;
    });

    code += "}\n";

    // Print out the code...
    console.log(code);
}

function getDerivedRoleCodes(parentToChildrenKeys: { [key: string]: string[] }, parentKeys: string[], output: { [key: string]: any }) {
    // Loop through all the parent keys. Look up their children and recursively iterate through them all...
    parentKeys.forEach(function(parentKey: string) {
        // Add this RoleCode object to the output...
        output[parentKey] = {};

        // Add all of its children to output (if it has children)...
        if (parentToChildrenKeys.hasOwnProperty(parentKey)) {
            getDerivedRoleCodes(parentToChildrenKeys, parentToChildrenKeys[parentKey], output);
        }
    });
}

start();