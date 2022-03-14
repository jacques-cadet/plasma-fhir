import React from "react";
import { Range } from "fhir/r4";

export interface IRangeViewProps { range?: Range }
export default function RangeView(props: IRangeViewProps) {
    // Check if data is available...
    if (!props.range) { return <div />; }

    // Format display value...
    let display = "";
    if (props.range.low) { display += props.range.low.value; }
    if (props.range.low && props.range.high) { display += " - "; }
    if (props.range.high) { display += props.range.high.value; }

    return <span className="RangeView_container">{display}</span>;
}