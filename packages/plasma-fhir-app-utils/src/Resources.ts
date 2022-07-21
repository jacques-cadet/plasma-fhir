import * as r4 from "fhir/r4";
import * as DateTimeUtils from "./DateTimeUtils";

//
// Helper functions associated with each FHIR resource type.
//

//
// PATIENT
//

export interface Patient extends r4.Patient {}
export class Patient {

    // Get the patient's "official" name...
    public static getOfficialName(patient: Patient): HumanName | undefined {
        if (!patient.name) { return undefined; }
        if (patient.name.length === 0) { return undefined; }
        const officialNames = HumanName.getNamesByUse(patient.name, "official");

        // If no official names, just pick one...
        return (officialNames.length > 0)
            ? officialNames[0]
            : patient.name[0];
    }

    // Get the patient's "home" address...
    public static getHomeAddress(patient: Patient): Address | undefined {
        if (!patient.address) { return undefined; }
        if (patient.address.length === 0) { return undefined; }
        const officialAddresses = Address.getAddressesByUse(patient.address, "home");

        // If no official addresses, just pick one...
        return (officialAddresses.length > 0)
            ? officialAddresses[0]
            : patient.address[0];
    }
}

//
// HUMANNAME
//

export interface HumanName extends r4.HumanName {}
export class HumanName {

    // Gets all names based on the given "use"...
    public static getNamesByUse(names: HumanName[], use: r4.HumanName["use"]): HumanName[] {
        return names.filter(name => name.use === use);
    }

    // Convert name to a string...
    public static toString(name: HumanName): string {
        // If text is available, use that...
        if (name.text) { return name.text; }
        
        // Get all name pieces...
        let pieces = [];
        if (name.prefix)    { pieces.push(Array.isArray(name.prefix) ? name.prefix.join(" ") : name.prefix); }
        if (name.given)     { pieces.push(Array.isArray(name.given) ? name.given.join(" ") : name.given); }
        if (name.family)    { pieces.push(Array.isArray(name.family) ? name.family.join(" ") : name.family); }

        // Format all pieces...
        let sName = pieces.join(" ").trim();
        return sName;
    }
}

//
// REFERENCE
//

export interface Reference extends r4.Reference {}
export class Reference {
    constructor(reference: string) {
        this.reference = reference;
    }

    public static createPatientReference(patientId: string): Reference {
        return new Reference("Patient/" + patientId);
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

    // Filter codings based on system...
    public static getCodingsBySystem(codings: Coding[], system: string): Coding[] {
        return codings.filter(coding => coding.system === system);
    }

    // Filter codings based on code...
    public static getCodingsByCode(codings: Coding[], code: string): Coding[] {
        return codings.filter(coding => coding.code === code);
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

    // Convert Quantity to a string...
    public static toString(quantity: Quantity, fractionDigits?: number): string {
        if (!quantity) { return ""; }

        // If a fractionDigits was specified, use that...
        const value = (quantity.value && fractionDigits) ? quantity.value.toFixed(fractionDigits) : quantity.value;

        let s = "";
        if (quantity.comparator) { s += quantity.comparator; }
        if (quantity.value) { s += value; }
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
// RANGE
//

export interface Range extends r4.Range {}
export class Range {
    constructor(low: Quantity | undefined, high?: Quantity | undefined) {
        this.low = low;
        if (high) { this.high = high; }
    }

    // Get a range from unspecified numbers...
    public static fromNumbers(low: number, high?: number): Range {
        return new Range(
            new Quantity(low, ""), 
            (high) ? new Quantity(high, "") : undefined
        );
    }

    // Parse a string into a Range element.
    // Valid formats:
    //      50
    //      50-75
    //      50 - 75
    public static fromString(s: string): Range | undefined {
        // Single Number...
        if (!isNaN(s as any)) {          
            const f: number = parseFloat(s);
            return Range.fromNumbers(f);
        }

        // Range (e.g. "35-40")...
        if (s.indexOf("-") >= 0) {
            const s1 = s.split("-")[0];
            const s2 = s.split("-")[1];

            if (!isNaN(s1 as any) && !isNaN(s2 as any) && s1.trim() !== "" && s2.trim() !== "") {
                const f1 = parseFloat(s1);
                const f2 = parseFloat(s2);
                return Range.fromNumbers(f1, f2);
            }
        }

        return undefined;
    }

    // Parse a string into a Range element. Specifically for age ranges.
    // This allows you to also use formats like "40's" or "40s"
    public static fromAgeString(s: string): Range | undefined {

        // Same decade (e.g. "40's", "40s") (Note: "late 40s" will just be "40s")
        if (s.indexOf("s") >= 0) {
            // All this does is convert "40s" to "40-49" to be processed by the range block (changes "s" to be like "40-49")
            let decadeString = s.split("s")[0];
            if (decadeString.indexOf("'") >= 0) { decadeString = decadeString.replace("'", ""); }
            if (!isNaN(decadeString as any)) {
                const decadeNumber = parseInt(decadeString);
                const decadeEnd = decadeNumber + 9;
                s = decadeNumber.toString() + "-" + decadeEnd.toString();
            }
        }

        // Now use the default Range parsing...
        return Range.fromString(s);
    }

    // Convert Range to a string...
    public static toString(range: Range): string {
        if (!range) { return ""; }

        let s = "";
        if (range.low && !Number.isNaN(range.low.value)) { s += range.low.value; }
        if (range.high && !Number.isNaN(range.high.value)) { s += " - " + range.high.value; }
        return s;
    }

    // Convert Range to an age string. Values MUST be in years...
    public static toAgeString(range: Range): string {
        if (!range) { return ""; }

        return Range.toString(range) + "y";
    }
}

//
// PERIOD
//

export interface Period extends r4.Period {}
export class Period {
    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }

    // Get start date as a Date object...
    public static getStartDate(period: Period): Date | undefined {
        if (!period.start) { return undefined; }
        return DateTimeUtils.fromString(period.start);
    }

    // Get end date as a Date object...
    public static getEndDate(period: Period): Date | undefined {
        if (!period.end) { return undefined; }
        return DateTimeUtils.fromString(period.end);
    }

    // Parse a Range into a Period element. The start/end dates will correspond to start/end DOBs.
    // The Range MUST represent age in years.
    public static fromAgeRange(range: Range, now?: Date): Period | undefined {
        // If it was a single number, we return the highest/lowest DOB for that age...
        if (range.low && range.low.value && !range.high) {
            const dob: { dobStart: Date, dobEnd: Date } = DateTimeUtils.getDOBFromAge(range.low.value, now);
            return new Period(dob.dobStart.toISOString(), dob.dobEnd.toISOString());
        }

        // If it was a range, we return the lowest DOB for the lower age and highest DOB for the higher age...
        if (range.low && range.low.value && range.high && range.high.value) {
            const dob1: { dobStart: Date, dobEnd: Date } = DateTimeUtils.getDOBFromAge(range.low.value, now);
            const dob2: { dobStart: Date, dobEnd: Date } = DateTimeUtils.getDOBFromAge(range.high.value, now);
            return new Period(dob1.dobStart.toISOString(), dob2.dobEnd.toISOString());
        }

        // If we got here, we couldn't parse the range, so return undefined...
        return undefined;
    }

    // Parse an age string into a Period element. The start/end dates will correspond to start/end DOBs.
    // Valid formats: 50, 50-60, 50's, 50s
    public static fromAgeString(s: string, now?: Date): Period | undefined {

        // Try parsing the string into a Range...
        const range = Range.fromAgeString(s);
        if (range !== undefined) {
            return Period.fromAgeRange(range, now);
        }

        return undefined;
    }

    // Convert Period to a string...
    public static toString(period: Period): string {
        let display = "";
        if (period.start) { display += period.start; }
        if (period.start && period.end) { display += " - "; }
        if (period.end) { display += period.end; }
        return display;
    }    
}

//
// RATIO
//

export interface Ratio extends r4.Ratio {}
export class Ratio {
    constructor(numerator: Quantity, denominator: Quantity) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    public static toString(ratio: Ratio): string {
        if (!ratio) { return ""; }

        let display = "";
        if (ratio.numerator) { display += ratio.numerator.value; }
        if (ratio.numerator && ratio.denominator) { display += " / "; }
        if (ratio.denominator) { display += ratio.denominator.value; }
        return display;
    }
}

//
// ADDRESS
//

export interface Address extends r4.Address {}
export class Address {

    // Gets all addresses based on the given "use"...
    public static getAddressesByUse(addresses: Address[], use: r4.Address["use"]): Address[] {
        return addresses.filter(address => address.use === use);
    }

    public static toString(address: Address): string {
        if (!address) { return ""; }

        return Address.__formatCityStateZip(address.city, address.state, address.postalCode);
    }

    // City, State Zip
    private static __formatCityStateZip(city?: string, state?: string, postalCode?: string): string
    {
        let s = "";
        if (city) { s += city; }
        if (city && state) { s += ", "; }
        if (state) { s += state; }
        if (postalCode) { s += " " + postalCode; }
        return s;
    }
}

//
// ANNOTATION
//

export interface Annotation extends r4.Annotation {}
export class Annotation {
    constructor(text: string) {
        this.text = text;
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

    // Sort encounters by date...
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
    FamilyMember: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FAMMEMB","family member"),
    Child: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHILD","child"),
    AdoptedChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHLDADOPT","adopted child"),
    AdoptedDaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUADOPT","adopted daughter"),      
    AdoptedSon: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONADOPT","adopted son"),
    FosterChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHLDFOST","foster child"),
    FosterDaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUFOST","foster daughter"),
    FosterSon: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONFOST","foster son"),
    Daughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUC","daughter"),
    NaturalDaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAU","natural daughter"),
    Stepdaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPDAU","stepdaughter"),
    NaturalChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NCHILD","natural child"),
    NaturalSon: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SON","natural son"),
    Son: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONC","son"),
    Stepson: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPSON","stepson"),
    StepChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPCHLD","step child"),
    ExtendedFamilyMember: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "EXT","extended family member"),
    Aunt: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "AUNT","aunt"),
    MaternalAunt: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MAUNT","maternal aunt"),
    PaternalAunt: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PAUNT","paternal aunt"),
    Cousin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "COUSN","cousin"),
    MaternalCousin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MCOUSN","maternal cousin"),
    PaternalCousin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PCOUSN","paternal cousin"),
    GreatGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GGRPRN","great grandparent"),
    GreatGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GGRFTH","great grandfather"),
    MaternalGreatGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGGRFTH","maternal great-grandfather"),
    PaternalGreatGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGGRFTH","paternal great-grandfather"),
    GreatGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GGRMTH","great grandmother"),
    MaternalGreatGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGGRMTH","maternal great-grandmother"),
    PaternalGreatGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGGRMTH","paternal great-grandmother"),
    MaternalGreatGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGGRPRN","maternal great-grandparent"),
    PaternalGreatGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGGRPRN","paternal great-grandparent"),
    Grandchild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRNDCHILD","grandchild"),
    Granddaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRNDDAU","granddaughter"),
    Grandson: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRNDSON","grandson"),
    Grandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRPRN","grandparent"),
    Grandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRFTH","grandfather"),
    MaternalGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGRFTH","maternal grandfather"),
    PaternalGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGRFTH","paternal grandfather"),
    Grandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRMTH","grandmother"),
    MaternalGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGRMTH","maternal grandmother"),
    PaternalGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGRMTH","paternal grandmother"),
    MaternalGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGRPRN","maternal grandparent"),
    PaternalGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGRPRN","paternal grandparent"),
    Inlaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "INLAW","inlaw"),
    ChildInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHLDINLAW","child-in-law"),
    DaughterInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUINLAW","daughter in-law"),
    SonInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONINLAW","son in-law"),
    ParentInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PRNINLAW","parent in-law"),
    FatherInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTHINLAW","father-in-law"),
    MotherInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTHINLAW","mother-in-law"),
    MTHINLOAW: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTHINLOAW","mother-in-law"),
    SiblingInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIBINLAW","sibling in-law"),
    BrotherInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "BROINLAW","brother-in-law"),
    SisterInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SISINLAW","sister-in-law"),
    SISLINLAW: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SISLINLAW","sister-in-law"),
    NieceNephew: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NIENEPH","niece/nephew"),
    Nephew: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NEPHEW","nephew"),
    Niece: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NIECE","niece"),
    Uncle: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "UNCLE","uncle"),
    MaternalUncle: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MUNCLE","maternal uncle"),
    PaternalUncle: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PUNCLE","paternal uncle"),
    Parent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PRN","parent"),
    AdoptiveParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ADOPTP","adoptive parent"),
    AdoptiveFather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ADOPTF","adoptive father"),
    AdoptiveMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ADOPTM","adoptive mother"),
    Father: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTH","father"),
    FosterFather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTHFOST","foster father"),
    NaturalFather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NFTH","natural father"),
    NaturalFatherOfFetus: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NFTHF","natural father of fetus"),
    Stepfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPFTH","stepfather"),
    Mother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTH","mother"),
    GestationalMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GESTM","gestational mother"),
    FosterMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTHFOST","foster mother"),
    NaturalMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NMTH","natural mother"),
    NaturalMotherOfFetus: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NMTHF","natural mother of fetus"),
    Stepmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPMTH","stepmother"),
    NaturalParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NPRN","natural parent"),
    FosterParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PRNFOST","foster parent"),
    StepParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPPRN","step parent"),
    Sibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIB","sibling"),
    Brother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "BRO","brother"),
    HalfBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HBRO","half-brother"),
    NaturalBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NBRO","natural brother"),
    TwinBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "TWINBRO","twin brother"),
    Stepbrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPBRO","stepbrother"),
    HalfSibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HSIB","half-sibling"),
    HalfSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HSIS","half-sister"),
    NaturalSibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NSIB","natural sibling"),
    NaturalSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NSIS","natural sister"),
    TwinSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "TWINSIS","twin sister"),
    Twin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "TWIN","twin"),
    FraternalTwin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTWIN","fraternal twin"),
    FraternalTwinBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTWINBRO","fraternal twin brother"),
    FraternalTwinSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTWINSIS","fraternal twin sister"),
    IdenticalTwin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ITWIN","identical twin"),
    IdenticalTwinBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ITWINBRO","identical twin brother"),
    IdenticalTwinSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ITWINSIS","identical twin sister"),
    Sister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIS","sister"),
    Stepsister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPSIS","stepsister"),
    StepSibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPSIB","step sibling"),
    SignificantOther: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIGOTHR","significant other"),
    DomesticPartner: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DOMPART","domestic partner"),
    FormerSpouse: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FMRSPS","former spouse"),
    Spouse: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SPS","spouse"),
    Husband: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HUSB","husband"),
    Wife: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "WIFE","wife"),
}

export interface FamilyMemberHistory extends r4.FamilyMemberHistory { }
export class FamilyMemberHistory {
    constructor(patientId: string, relationship: keyof typeof FamilyMemberHistory_Relationship | Coding) {
        this.resourceType = "FamilyMemberHistory";
        this.status = "completed";
        this.relationship = (typeof relationship === "string") 
            ? CodeableConcept.fromSingleCoding(FamilyMemberHistory_Relationship[relationship])
            : CodeableConcept.fromSingleCoding(relationship);
        this.patient = Reference.createPatientReference(patientId);

        this.condition = [];
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

//
// DEVICE
//

export interface Device extends r4.Device {}
export class Device {

}

export interface DeviceDeviceName extends r4.DeviceDeviceName {}
export class DeviceDeviceName {
    constructor(name: string, type: DeviceDeviceName["type"]) {
        this.name = name;
        this.type = type;
    }

    public static toString(deviceName: DeviceDeviceName): string {
        return deviceName.name;
    }
}

//
// FLAG
//

export interface Flag extends r4.Flag {}
export class Flag {

    // Gets flags by a specific status...
    public static getFlagsByStatus(flags: Flag[], status: r4.Flag["status"]): Flag[] {
        return flags.filter(flag => flag.status === status);
    }
}

//
// DOCUMENTREFERENCE
//

export interface DocumentReference extends r4.DocumentReference {}
export class DocumentReference {
    public static getDocumentReferencesByStatus(documentReferences: DocumentReference[], status: r4.DocumentReference["status"]): DocumentReference[] {
        return documentReferences.filter(documentReference => documentReference.status === status);
    }
}
