import React from "react";
import { Range } from "fhir/r4";
import { Resources } from "plasma-fhir-app-utils";

export interface IRangeViewProps { range?: Range }
export default function RangeView(props: IRangeViewProps) {
    // Check if data is available...
    if (!props.range) { return <div />; }

    // Format display value...
    let display = Resources.Range.toString(props.range);
    return <span className="RangeView_container">{display}</span>;
}