import React from "react";
import { Ratio } from "fhir/r4";

export interface IRatioViewProps { ratio?: Ratio }
export default function RatioView(props: IRatioViewProps) {
    // Check if data is available...
    if (!props.ratio) { return <div />; }

    // TODO: Move to app-utils
    // Format display value...
    let display = "";
    if (props.ratio.numerator) { display += props.ratio.numerator; }
    if (props.ratio.numerator && props.ratio.denominator) { display += " / "; }
    if (props.ratio.denominator) { display += props.ratio.denominator; }

    return <span className="RatioView_container">{display}</span>;
}