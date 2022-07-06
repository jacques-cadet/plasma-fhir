// Create a dictionary to look up converters from string-based units...
interface IConverter { from: string, to: string, convert: (v: number) => number };
type ConverterDict = { [from: string]: { [to: string ]: IConverter } };

const ConverterLookup: ConverterDict = {};
ConverterLookup["kg"] = {};
ConverterLookup["lbs"] = {};
ConverterLookup["kg"]["lbs"] = { from: "kg", to: "lbs", convert: kgsToLbs };
ConverterLookup["lbs"]["kg"] = { from: "lbs", to: "kg", convert: lbsToKgs };

// Find a converter for the given units. If not found, will return undefined.
// Example: const converter = Convert.findConverter("kg", "lbs")
export function findConverter(from: string, to: string): ((x: number) => number) | undefined {
    if (ConverterLookup[from] && ConverterLookup[from][to]) {
        return ConverterLookup[from][to].convert;
    }

    return undefined;
}

// Lbs to kgs
export function lbsToKgs(lbs: number): number {
    return lbs * 0.453592;
}

// Kgs to lbs
export function kgsToLbs(kgs: number): number {
    return kgs * 2.20462;
}