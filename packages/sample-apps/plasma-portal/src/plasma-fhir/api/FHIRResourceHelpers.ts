import * as r4 from "fhir/r4";

//
// REFERENCE
//

export interface Reference extends r4.Reference {}
export class Reference {
    constructor(reference: string) {
        this.reference = reference;
    }
}

//
// CODING
//

export interface Coding extends r4.Coding {}
export class Coding {
    constructor(system: string, code: string, display: string) {
        this.system = system;
        this.code = code;
        this.display = display;
    }
}

//
// CODEABLECONCEPT
//

export interface CodeableConcept extends r4.CodeableConcept {}
export class CodeableConcept {
    constructor(coding: Coding[], text?: string) {
        this.coding = coding;
        this.text = text;
    }

    public static fromSingleCoding(coding: Coding, text?: string): CodeableConcept {
        return new CodeableConcept([coding], text);
    }

    /** 
     * Gets displayable text for a CodeableConcept 
     * If coding exists, returns all values separated by a comma.
     * Otherwise, returns the "text" value.
     * Returns "" if nothing is found.
    */
    public static getDisplayText(codeableConcept: CodeableConcept, onlyFirstCode: boolean = false): string {
        if (!codeableConcept.coding && !codeableConcept.text) { return ""; }
        if (codeableConcept.coding) { 
            return onlyFirstCode 
                ? codeableConcept.coding[0].display || ""
                : codeableConcept.coding.map((x: Coding) => x.display).join(", "); 
        }
        if (codeableConcept.text) { return codeableConcept.text; }
        return "";
    }

    /** Sorts CodeableConcept by displayText */
    public static sortByDisplayText(a?: CodeableConcept, b?: CodeableConcept): number {
        if (!a || !b) { return -1; }

        const sa = CodeableConcept.getDisplayText(a);
        const sb = CodeableConcept.getDisplayText(b);
        return sb.localeCompare(sa);
    }
}

//
// QUANTITY
//

export interface Quantity extends r4.Quantity {}
export class Quantity {
    constructor(value: number, unit: string, system?: string, code?: string) {
        this.value = value;
        this.unit = unit;
        this.system = system;
        this.code = code;
    }

    public static getDisplayText(quantity: Quantity): string {
        if (!quantity) { return ""; }

        let s = "";
        if (quantity.comparator) { s += quantity.comparator; }
        if (quantity.value) { s += quantity.value; }
        if (quantity.unit) { s += " " + quantity.unit; }
        return s;
    }
}

//
// AGE
//

export interface Age extends r4.Age {}
export class Age {
    // Create an age from a Quantity...
    public static fromQuantity(quantity: Quantity): Age {
        return quantity;
    }

    // Create an age from the years (actual age)...
    public static fromYears(years: number) {
        return new Quantity(years, "yr", "http://unitsofmeasure.org", "a");
    }
}

//
// OBSERVATION
//

export interface Observation extends r4.Observation {}
export class Observation {
    constructor() {

    }
}

//
// ALLERGYINTOLERANCE
//

export interface AllergyIntolerance extends r4.AllergyIntolerance {}
export class AllergyIntolerance {
    constructor() {
        
    }
}

//
// CONDITION
//

export interface Condition extends r4.Condition {}
export class Condition {
    constructor() {

    }
}

//
// IMMUNIZATION
//

export interface Immunization extends r4.Immunization {}
export class Immunization {
    constructor() {

    }
}

//
// ENCOUNTER
//

export interface Encounter extends r4.Encounter {}
export class Encounter {
    constructor() {

    }

    public static sort(a: Encounter, b: Encounter): number {
        if (!a.period || !a.period.start) { return -1; }
        if (!b.period || !b.period.start) { return 1; }

        const aDate = new Date(a.period.start);
        const bDate = new Date(b.period.start);
        return (aDate < bDate) ? 1 : -1;
    }
}

//
// FAMILYMEMBERHISTORY
//

// https://www.hl7.org/fhir/valueset-administrative-gender.html
export const AdministrativeGender = {
    Male:       new Coding("http://hl7.org/fhir/administrative-gender", "male",     "Male"),
    Female:     new Coding("http://hl7.org/fhir/administrative-gender", "female",   "Female"),
    Other:      new Coding("http://hl7.org/fhir/administrative-gender", "other",    "Other"),
    Unknown:    new Coding("http://hl7.org/fhir/administrative-gender", "unknown",  "Unknown"),
};

// TODO: We can get these values from here: https://terminology.hl7.org/3.1.0/CodeSystem-v3-RoleCode.json.html
export const FamilyMemberHistory_Relationship = {
    Mother:     new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTH", "mother"),
    Father:     new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTH", "father"),
    Son:        new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SON", "natural son"),
    Daughter:   new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAU", "natural daughter"),
}

export interface FamilyMemberHistory extends r4.FamilyMemberHistory { }
export class FamilyMemberHistory {
    constructor(patientId: string, id: string, relationship: keyof typeof FamilyMemberHistory_Relationship | Coding) {
        this.resourceType = "FamilyMemberHistory";
        this.status = "completed";
        this.relationship = (typeof relationship === "string") 
            ? CodeableConcept.fromSingleCoding(FamilyMemberHistory_Relationship[relationship])
            : CodeableConcept.fromSingleCoding(relationship);
        this.patient = FamilyMemberHistory.createPatientReference(patientId);

        this.id = id;
        this.condition = [];
    }

    // Create a FamilyMemberHistory.patient value...
    private static createPatientReference(patientId: string): Reference {
        return new Reference("Patient/" + patientId);
    }
}

//
// FAMILYMEMBERHISTORYCONDITION
//
export interface FamilyMemberHistoryCondition extends r4.FamilyMemberHistoryCondition {}
export class FamilyMemberHistoryCondition {
    constructor(code: CodeableConcept) {
        this.code = code;
    }

    public static fromSNOMED(snomedCode: string, codeDisplay: string, codeText: string, onsetAgeYears?: number): FamilyMemberHistoryCondition {
        const conditionCoding = new Coding("http://snomed.info/sct", snomedCode, codeDisplay);
        const conditionConcept = CodeableConcept.fromSingleCoding(conditionCoding, codeText);

        const condition = new FamilyMemberHistoryCondition(conditionConcept);
        if (onsetAgeYears) { condition.onsetAge = Age.fromYears(onsetAgeYears); }
        return condition;
    }
}