"use strict";
//
// DATE/TIME
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeUtils = void 0;
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
}
exports.DateTimeUtils = DateTimeUtils;
