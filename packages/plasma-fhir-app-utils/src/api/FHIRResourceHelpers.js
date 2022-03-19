"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMemberHistoryCondition = exports.FamilyMemberHistory = exports.FamilyMemberHistory_Relationship = exports.AdministrativeGender = exports.Encounter = exports.Immunization = exports.Condition = exports.AllergyIntolerance = exports.Observation = exports.Age = exports.Quantity = exports.CodeableConcept = exports.Coding = exports.Reference = void 0;
class Reference {
    constructor(reference) {
        this.reference = reference;
    }
}
exports.Reference = Reference;
class Coding {
    constructor(system, code, display) {
        this.system = system;
        this.code = code;
        this.display = display;
    }
}
exports.Coding = Coding;
class CodeableConcept {
    constructor(coding, text) {
        this.coding = coding;
        this.text = text;
    }
    static fromSingleCoding(coding, text) {
        return new CodeableConcept([coding], text);
    }
    /**
     * Gets displayable text for a CodeableConcept
     * If coding exists, returns all values separated by a comma.
     * Otherwise, returns the "text" value.
     * Returns "" if nothing is found.
    */
    static getDisplayText(codeableConcept, onlyFirstCode = false) {
        if (!codeableConcept.coding && !codeableConcept.text) {
            return "";
        }
        if (codeableConcept.coding) {
            return onlyFirstCode
                ? codeableConcept.coding[0].display || ""
                : codeableConcept.coding.map((x) => x.display).join(", ");
        }
        if (codeableConcept.text) {
            return codeableConcept.text;
        }
        return "";
    }
    /** Sorts CodeableConcept by displayText */
    static sortByDisplayText(a, b) {
        if (!a || !b) {
            return -1;
        }
        const sa = CodeableConcept.getDisplayText(a);
        const sb = CodeableConcept.getDisplayText(b);
        return sb.localeCompare(sa);
    }
}
exports.CodeableConcept = CodeableConcept;
class Quantity {
    constructor(value, unit, system, code) {
        this.value = value;
        this.unit = unit;
        this.system = system;
        this.code = code;
    }
    static getDisplayText(quantity) {
        if (!quantity) {
            return "";
        }
        let s = "";
        if (quantity.comparator) {
            s += quantity.comparator;
        }
        if (quantity.value) {
            s += quantity.value;
        }
        if (quantity.unit) {
            s += " " + quantity.unit;
        }
        return s;
    }
}
exports.Quantity = Quantity;
class Age {
    // Create an age from a Quantity...
    static fromQuantity(quantity) {
        return quantity;
    }
    // Create an age from the years (actual age)...
    static fromYears(years) {
        return new Quantity(years, "yr", "http://unitsofmeasure.org", "a");
    }
}
exports.Age = Age;
class Observation {
    constructor() {
    }
}
exports.Observation = Observation;
class AllergyIntolerance {
    constructor() {
    }
}
exports.AllergyIntolerance = AllergyIntolerance;
class Condition {
    constructor() {
    }
}
exports.Condition = Condition;
class Immunization {
    constructor() {
    }
}
exports.Immunization = Immunization;
class Encounter {
    constructor() {
    }
    static sort(a, b) {
        if (!a.period || !a.period.start) {
            return -1;
        }
        if (!b.period || !b.period.start) {
            return 1;
        }
        const aDate = new Date(a.period.start);
        const bDate = new Date(b.period.start);
        return (aDate < bDate) ? 1 : -1;
    }
}
exports.Encounter = Encounter;
//
// FAMILYMEMBERHISTORY
//
// https://www.hl7.org/fhir/valueset-administrative-gender.html
exports.AdministrativeGender = {
    Male: new Coding("http://hl7.org/fhir/administrative-gender", "male", "Male"),
    Female: new Coding("http://hl7.org/fhir/administrative-gender", "female", "Female"),
    Other: new Coding("http://hl7.org/fhir/administrative-gender", "other", "Other"),
    Unknown: new Coding("http://hl7.org/fhir/administrative-gender", "unknown", "Unknown"),
};
// TODO: We can get these values from here: https://terminology.hl7.org/3.1.0/CodeSystem-v3-RoleCode.json.html
exports.FamilyMemberHistory_Relationship = {
    FamilyMember: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FAMMEMB", "family member"),
    Child: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHILD", "child"),
    AdoptedChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHLDADOPT", "adopted child"),
    AdoptedDaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUADOPT", "adopted daughter"),
    AdoptedSon: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONADOPT", "adopted son"),
    FosterChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHLDFOST", "foster child"),
    FosterDaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUFOST", "foster daughter"),
    FosterSon: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONFOST", "foster son"),
    Daughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUC", "daughter"),
    NaturalDaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAU", "natural daughter"),
    Stepdaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPDAU", "stepdaughter"),
    NaturalChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NCHILD", "natural child"),
    NaturalSon: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SON", "natural son"),
    Son: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONC", "son"),
    Stepson: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPSON", "stepson"),
    StepChild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPCHLD", "step child"),
    ExtendedFamilyMember: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "EXT", "extended family member"),
    Aunt: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "AUNT", "aunt"),
    MaternalAunt: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MAUNT", "maternal aunt"),
    PaternalAunt: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PAUNT", "paternal aunt"),
    Cousin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "COUSN", "cousin"),
    MaternalCousin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MCOUSN", "maternal cousin"),
    PaternalCousin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PCOUSN", "paternal cousin"),
    GreatGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GGRPRN", "great grandparent"),
    GreatGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GGRFTH", "great grandfather"),
    MaternalGreatGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGGRFTH", "maternal great-grandfather"),
    PaternalGreatGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGGRFTH", "paternal great-grandfather"),
    GreatGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GGRMTH", "great grandmother"),
    MaternalGreatGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGGRMTH", "maternal great-grandmother"),
    PaternalGreatGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGGRMTH", "paternal great-grandmother"),
    MaternalGreatGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGGRPRN", "maternal great-grandparent"),
    PaternalGreatGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGGRPRN", "paternal great-grandparent"),
    Grandchild: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRNDCHILD", "grandchild"),
    Granddaughter: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRNDDAU", "granddaughter"),
    Grandson: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRNDSON", "grandson"),
    Grandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRPRN", "grandparent"),
    Grandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRFTH", "grandfather"),
    MaternalGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGRFTH", "maternal grandfather"),
    PaternalGrandfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGRFTH", "paternal grandfather"),
    Grandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GRMTH", "grandmother"),
    MaternalGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGRMTH", "maternal grandmother"),
    PaternalGrandmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGRMTH", "paternal grandmother"),
    MaternalGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MGRPRN", "maternal grandparent"),
    PaternalGrandparent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PGRPRN", "paternal grandparent"),
    Inlaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "INLAW", "inlaw"),
    ChildInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "CHLDINLAW", "child-in-law"),
    DaughterInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DAUINLAW", "daughter in-law"),
    SonInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SONINLAW", "son in-law"),
    ParentInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PRNINLAW", "parent in-law"),
    FatherInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTHINLAW", "father-in-law"),
    MotherInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTHINLAW", "mother-in-law"),
    MTHINLOAW: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTHINLOAW", "mother-in-law"),
    SiblingInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIBINLAW", "sibling in-law"),
    BrotherInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "BROINLAW", "brother-in-law"),
    SisterInLaw: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SISINLAW", "sister-in-law"),
    SISLINLAW: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SISLINLAW", "sister-in-law"),
    NieceNephew: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NIENEPH", "niece/nephew"),
    Nephew: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NEPHEW", "nephew"),
    Niece: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NIECE", "niece"),
    Uncle: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "UNCLE", "uncle"),
    MaternalUncle: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MUNCLE", "maternal uncle"),
    PaternalUncle: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PUNCLE", "paternal uncle"),
    Parent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PRN", "parent"),
    AdoptiveParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ADOPTP", "adoptive parent"),
    AdoptiveFather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ADOPTF", "adoptive father"),
    AdoptiveMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ADOPTM", "adoptive mother"),
    Father: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTH", "father"),
    FosterFather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTHFOST", "foster father"),
    NaturalFather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NFTH", "natural father"),
    NaturalFatherOfFetus: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NFTHF", "natural father of fetus"),
    Stepfather: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPFTH", "stepfather"),
    Mother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTH", "mother"),
    GestationalMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "GESTM", "gestational mother"),
    FosterMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "MTHFOST", "foster mother"),
    NaturalMother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NMTH", "natural mother"),
    NaturalMotherOfFetus: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NMTHF", "natural mother of fetus"),
    Stepmother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPMTH", "stepmother"),
    NaturalParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NPRN", "natural parent"),
    FosterParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "PRNFOST", "foster parent"),
    StepParent: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPPRN", "step parent"),
    Sibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIB", "sibling"),
    Brother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "BRO", "brother"),
    HalfBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HBRO", "half-brother"),
    NaturalBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NBRO", "natural brother"),
    TwinBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "TWINBRO", "twin brother"),
    Stepbrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPBRO", "stepbrother"),
    HalfSibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HSIB", "half-sibling"),
    HalfSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HSIS", "half-sister"),
    NaturalSibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NSIB", "natural sibling"),
    NaturalSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "NSIS", "natural sister"),
    TwinSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "TWINSIS", "twin sister"),
    Twin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "TWIN", "twin"),
    FraternalTwin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTWIN", "fraternal twin"),
    FraternalTwinBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTWINBRO", "fraternal twin brother"),
    FraternalTwinSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FTWINSIS", "fraternal twin sister"),
    IdenticalTwin: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ITWIN", "identical twin"),
    IdenticalTwinBrother: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ITWINBRO", "identical twin brother"),
    IdenticalTwinSister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "ITWINSIS", "identical twin sister"),
    Sister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIS", "sister"),
    Stepsister: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPSIS", "stepsister"),
    StepSibling: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "STPSIB", "step sibling"),
    SignificantOther: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SIGOTHR", "significant other"),
    DomesticPartner: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "DOMPART", "domestic partner"),
    FormerSpouse: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "FMRSPS", "former spouse"),
    Spouse: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "SPS", "spouse"),
    Husband: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "HUSB", "husband"),
    Wife: new Coding("http://terminology.hl7.org/CodeSystem/v3-RoleCode", "WIFE", "wife"),
};
class FamilyMemberHistory {
    constructor(patientId, id, relationship) {
        this.resourceType = "FamilyMemberHistory";
        this.status = "completed";
        this.relationship = (typeof relationship === "string")
            ? CodeableConcept.fromSingleCoding(exports.FamilyMemberHistory_Relationship[relationship])
            : CodeableConcept.fromSingleCoding(relationship);
        this.patient = FamilyMemberHistory.createPatientReference(patientId);
        this.id = id;
        this.condition = [];
    }
    // Create a FamilyMemberHistory.patient value...
    static createPatientReference(patientId) {
        return new Reference("Patient/" + patientId);
    }
}
exports.FamilyMemberHistory = FamilyMemberHistory;
class FamilyMemberHistoryCondition {
    constructor(code) {
        this.code = code;
    }
    static fromSNOMED(snomedCode, codeDisplay, codeText, onsetAgeYears) {
        const conditionCoding = new Coding("http://snomed.info/sct", snomedCode, codeDisplay);
        const conditionConcept = CodeableConcept.fromSingleCoding(conditionCoding, codeText);
        const condition = new FamilyMemberHistoryCondition(conditionConcept);
        if (onsetAgeYears) {
            condition.onsetAge = Age.fromYears(onsetAgeYears);
        }
        return condition;
    }
}
exports.FamilyMemberHistoryCondition = FamilyMemberHistoryCondition;
