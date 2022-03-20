import React from "react";
import { FHIRClientProvider } from "./FHIRClientProvider";

//
// Wrap a component with FHIRClientContextWrapper to give it access to the "fhirclient" instance.
//

export interface IFHIRClientContextWrapperProps { }
export const FHIRClientContextWrapper: React.FC<IFHIRClientContextWrapperProps> = (props) => {
    return (
        <FHIRClientProvider>
            {props.children}
        </FHIRClientProvider>
    );
}