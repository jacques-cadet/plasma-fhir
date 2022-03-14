import React from "react";
import { Quantity } from "fhir/r4";

export interface IQuantityViewProps { quantity?: Quantity };
export default function QuantityView(props: IQuantityViewProps) {
    // Check if data is available...
    if (!props.quantity) { return <div />; }

    // Format display value...
    let display = "";
    if (props.quantity.comparator) { display += props.quantity.comparator; }
    if (props.quantity.value) { display += props.quantity.value; }
    if (props.quantity.unit) { display += " " + props.quantity.unit; }

    return <span className="QuantityView_container">{display}</span>;
}