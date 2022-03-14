import React from "react";
import { AllergyIntolerance } from "fhir/r4";
import { CodeableConceptView, DateView } from "..";

export interface IAllergyIntoleranceViewProps { allergyIntolerance?: AllergyIntolerance; }
export const AllergyIntoleranceView: React.FC<IAllergyIntoleranceViewProps> = (props) => {
    if (!props.allergyIntolerance) { return <div />; }
    if (!props.allergyIntolerance.code) { return <div />; }
    if (!props.allergyIntolerance.code.coding) { return <div />; }
    if (!props.allergyIntolerance.code.coding[0]) { return <div />; }

    return (
        <div className="AllergyIntoleranceView_container">
            <div>
                <div className="AllergyIntoleranceView_code">
                    <CodeableConceptView codeableConcept={props.allergyIntolerance.code} />
                </div>
                <p className="AllergyIntoleranceView_recordedDate">
                    Added: <DateView datetime={props.allergyIntolerance.recordedDate} />
                </p>
            </div>
        </div>
    );
}

export default AllergyIntoleranceView;