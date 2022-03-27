
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
}