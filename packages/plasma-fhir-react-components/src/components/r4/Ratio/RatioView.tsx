import React from "react";
import { Ratio } from "fhir/r4";
import { Resources } from "plasma-fhir-app-utils";

export interface IRatioViewProps { ratio?: Ratio }
export default function RatioView(props: IRatioViewProps) {
    // Check if data is available...
    if (!props.ratio) { return <div />; }

    const display = Resources.Ratio.toString(props.ratio);
    return <span className="RatioView_container">{display}</span>;
}