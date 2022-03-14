import React from "react";

// TODO: Check format here: https://www.hl7.org/fhir/datatypes.html#date

export interface IDateViewProps { datetime?: string }
export default function DateView(props: IDateViewProps) {
    // Check if data is available...
    if (!props.datetime) { return <div />; }

    // Format display value...
    const date = new Date(props.datetime);
    const display = (isNaN(date as any)) ? "Unknown" : date.toLocaleDateString();

    return <span className="DateTimeView_container">{display}</span>;
}