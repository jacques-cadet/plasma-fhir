import React from "react";
import { AllergyIntolerance } from "fhir/r2";

export interface IAllergyIntoleranceViewProps { allergyIntolerance?: AllergyIntolerance; }
export const AllergyIntoleranceView: React.FC<IAllergyIntoleranceViewProps> = (props) => {
    if (!props.allergyIntolerance) { return <div />; }
    if (!props.allergyIntolerance.reaction) { return <div />; }

    const recordedDate = (props.allergyIntolerance.recordedDate)
        ? (new Date(props.allergyIntolerance.recordedDate)).toLocaleDateString()
        : "Unknown";

    return (
        <div className="AllergyIntoleranceView_container">
            <div>
                <div className="AllergyIntoleranceView_code">
                    {props.allergyIntolerance.substance.text}
                </div>
                <p className="AllergyIntoleranceView_recordedDate">
                    Added: {recordedDate}
                </p>
            </div>
        </div>
    );
}

export default AllergyIntoleranceView;