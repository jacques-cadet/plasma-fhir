// Parse the string into a date...
export function fromString(s: string): Date {
    return new Date(s);
}

// Given an age, returns the highest/lowest possible DOB
// dobStart = Date that makes you the YOUNGEST
// dobEnd = Date that makes you the OLDEST
// Note: dobStart comes AFTER dobEnd chronologically
export function getDOBFromAge(age: number, now?: Date): { dobStart: Date, dobEnd: Date } {
    if (!now) { now = new Date(); }

    const dStart = new Date(now);
    dStart.setFullYear(dStart.getFullYear() - age);

    const dEnd = new Date(now);
    dEnd.setFullYear(dEnd.getFullYear() - age - 1);

    return { dobStart: dStart, dobEnd: dEnd };
}

// Return a person's age if they were born on the given date...
export function getAgeFromDOB(dob: Date, now?: Date): number {
    if (!now) { now = new Date(); }

    var ageDifMs = now.getTime() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}