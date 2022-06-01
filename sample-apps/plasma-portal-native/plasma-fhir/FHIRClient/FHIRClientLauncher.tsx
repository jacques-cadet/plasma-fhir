import React, { useEffect } from "react";
import FHIR from "fhirclient";
import { fhirclient } from "fhirclient/lib/types";

//
// Launches a FHIR app with oauth2.
//

export interface IFHIRClientLauncherProps {
    authParams: fhirclient.AuthorizeParams;
    defaultElement: JSX.Element;
}

export const FHIRClientLauncher: React.FC<IFHIRClientLauncherProps> = (props) => {
    useEffect(() => {
        FHIR.oauth2.authorize(props.authParams);
    });

    return props.defaultElement;
}