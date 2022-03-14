import React from "react";
import { Period } from "fhir/r4";

export interface IPeriodViewProps { period?: Period }
export default function PeriodView(props: IPeriodViewProps) {
    // Check if data is available...
    if (!props.period) { return <div />; }

    // Format display value...
    let display = "";
    if (props.period.start) { display += props.period.start; }
    if (props.period.start && props.period.end) { display += " - "; }
    if (props.period.end) { display += props.period.end; }

    return <span className="PeriodView_container">{display}</span>;
}