import React from "react";
import { Observation } from "fhir/r4";
import { CodeableConceptView } from "..";
import ObservationValueView from "./ObservationValueView";

export interface IObservationComponentViewProps { observation?: Observation };
export default function ObservationComponentView(props: IObservationComponentViewProps) {
    // Check if data is available...
    if (!props.observation) { return <div />; }
    if (!props.observation.component) { return <div />; }

    const elComponents = props.observation.component.map((component, index) => {
        const key="ObservationComponentView_" + index;

        if (component.code) { 
            return (
                <div key={key}>
                    <CodeableConceptView codeableConcept={component.code} />
                    <ObservationValueView value={component} />
                </div>
            );
        }
        
        return <div key={key}><ObservationValueView value={component} /></div>;
    });

    return (
        <div className="ObservationComponentView_container">
            {elComponents}
        </div>
    );
}