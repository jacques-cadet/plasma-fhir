import React from "react";

export interface IAgeViewProps { dob?: string };
export default function AgeView(props: IAgeViewProps) {
    // Check if data is available...
    if (!props.dob) { return <div />; }

    const dob = new Date(props.dob + "T00:00:00");    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    const age = getAgeFromDate(dob);
    return <span className="AgeView_age">{age + "y"}</span>
}

// Returns the age from the given DOB (based on today's date). Got this from StackOverflow.
function getAgeFromDate(dob: Date): number {
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}