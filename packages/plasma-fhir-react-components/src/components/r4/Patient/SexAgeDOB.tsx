import React from "react";
import { Patient } from "fhir/r4";

export interface ISexAgeDOBProps { patient?: Patient };
export default function SexAgeDOB(props: ISexAgeDOBProps) {
    // Check if data is available...
    if (!props.patient) { return <div />; }

    // If patient has DOB, build that element...
    let elAgeDOB = null;
    if (props.patient.birthDate) {
        const dob = new Date(props.patient.birthDate + "T00:00:00");    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        const age = getAgeFromDate(dob);
        elAgeDOB = (
            <>{', '}
                <label className="SexAgeDOB_age">{age + "y"}</label>{', '}
                <label className="SexAgeDOB_dob">{dob.toLocaleDateString()}</label>
            </>
        );
    }
    
    // Get patient's sex...
    const elSex = <label className="SexAgeDOB_gender">{props.patient.gender}</label>;

    return (
        <div className="SexAgeDOB_container">
            {elSex}
            {elAgeDOB}
        </div>
    );
}

// Returns the age from the given DOB (based on today's date). Got this from StackOverflow.
function getAgeFromDate(dob: Date): number {
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}