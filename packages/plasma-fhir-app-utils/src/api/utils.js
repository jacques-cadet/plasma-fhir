"use strict";
//
// DATE/TIME
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = exports.DateTimeUtils = void 0;
class DateTimeUtils {
    // Parse the string into a date...
    static fromString(s) {
        return new Date(s);
    }
    // Given an age, returns the highest/lowest possible DOB
    // dobStart = Date that makes you the YOUNGEST
    // dobEnd = Date that makes you the OLDEST
    // Note: dobStart comes AFTER dobEnd chronologically
    static getDOBFromAge(age, now) {
        if (!now) {
            now = new Date();
        }
        const dStart = new Date(now);
        dStart.setFullYear(dStart.getFullYear() - age);
        const dEnd = new Date(now);
        dEnd.setFullYear(dEnd.getFullYear() - age - 1);
        return { dobStart: dStart, dobEnd: dEnd };
    }
    // Return a person's age if they were born on the given date...
    static getAgeFromDOB(dob, now) {
        if (!now) {
            now = new Date();
        }
        var ageDifMs = now.getTime() - dob.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
exports.DateTimeUtils = DateTimeUtils;
//
// CONVERSION
//
class Convert {
    // Find a converter for the given units. If not found, will return undefined.
    // Example: const converter = Convert.findConverter("kg", "lbs")
    static findConverter(from, to) {
        if (ConverterLookup[from] && ConverterLookup[from][to]) {
            return ConverterLookup[from][to].convert;
        }
        return undefined;
    }
    // Lbs to kgs
    static lbsToKgs(lbs) {
        return lbs * 0.453592;
    }
    // Kgs to lbs
    static kgsToLbs(kgs) {
        return kgs * 2.20462;
    }
}
exports.Convert = Convert;
;
const ConverterLookup = {};
ConverterLookup["kg"] = {};
ConverterLookup["lbs"] = {};
ConverterLookup["kg"]["lbs"] = { from: "kg", to: "lbs", convert: Convert.kgsToLbs };
ConverterLookup["lbs"]["kg"] = { from: "lbs", to: "kg", convert: Convert.lbsToKgs };
