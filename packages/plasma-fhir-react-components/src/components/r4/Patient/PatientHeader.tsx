import React from "react";
import { Patient } from "fhir/r4";
import { HumanNameView, AddressView } from "..";
import SexAgeDOB from "./SexAgeDOB";
import { Resources } from "plasma-fhir-app-utils";

export interface IPatientHeaderProps { patient?: Patient };
export default function PatientHeader(props: IPatientHeaderProps) {
    // Check if data is available...
    if (!props.patient) { return <div />; }
    if (!props.patient.name) { return <div />; }

    const officialName = Resources.Patient.getOfficialName(props.patient);
    const homeAddress = Resources.Patient.getHomeAddress(props.patient);

    return (
        <div className="PatientHeader_container">
            <div>
                <HumanNameView humanName={officialName} />

                <div className="PatientHeader_sexAgeDOB">
                    <SexAgeDOB patient={props.patient} />
                </div>

                <div className="PatientHeader_patientId">
                    <div>
                        <label>{props.patient.id}</label>
                    </div>
                </div>

                <div className="PatientHeader_address">
                    <label>Address</label>
                </div>
                <AddressView address={homeAddress} />

            </div>
        </div>
    );
}