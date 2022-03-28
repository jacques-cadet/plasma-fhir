
//
// DATE/TIME
//

export class DateTimeUtils {
    // Parse the string into a date...
    public static fromString(s: string): Date {
        return new Date(s);
    }

    // Given an age, returns the highest/lowest possible DOB
    // dobStart = Date that makes you the YOUNGEST
    // dobEnd = Date that makes you the OLDEST
    // Note: dobStart comes AFTER dobEnd chronologically
    public static getDOBFromAge(age: number, now?: Date): { dobStart: Date, dobEnd: Date } {
        if (!now) { now = new Date(); }

        const dStart = new Date(now);
        dStart.setFullYear(dStart.getFullYear() - age);

        const dEnd = new Date(now);
        dEnd.setFullYear(dEnd.getFullYear() - age - 1);

        return { dobStart: dStart, dobEnd: dEnd };
    }

    // Return a person's age if they were born on the given date...
    public static getAgeFromDOB(dob: Date, now?: Date): number {
        if (!now) { now = new Date(); }

        var ageDifMs = now.getTime() - dob.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}

//
// CONVERSION
//

export class Convert {

    // Find a converter for the given units. If not found, will return undefined.
    // Example: const converter = Convert.findConverter("kg", "lbs")
    public static findConverter(from: string, to: string): ((x: number) => number) | undefined {
        if (ConverterLookup[from] && ConverterLookup[from][to]) {
            return ConverterLookup[from][to].convert;
        }

        return undefined;
    }

    // Lbs to kgs
    public static lbsToKgs(lbs: number): number {
        return lbs * 0.453592;
    }

    // Kgs to lbs
    public static kgsToLbs(kgs: number): number {
        return kgs * 2.20462;
    }
}

// Create a dictionary to look up converters from string-based units...
interface IConverter { from: string, to: string, convert: (v: number) => number };
type ConverterDict = { [from: string]: { [to: string ]: IConverter } };

const ConverterLookup: ConverterDict = {};
ConverterLookup["kg"] = {};
ConverterLookup["lbs"] = {};
ConverterLookup["kg"]["lbs"] = { from: "kg", to: "lbs", convert: Convert.kgsToLbs };
ConverterLookup["lbs"]["kg"] = { from: "lbs", to: "kg", convert: Convert.lbsToKgs };

