import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fhirclient } from "fhirclient/lib/types";
import { FHIRClientLauncher } from 'plasma-fhir-react-client-context';

import config from "../config/config";
const AUTH_PARAMS_SMART = config.SMART;

interface ILocationState {
  authParams?: any;
}

function LaunchScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const locationState = location.state as ILocationState;
  const launch = searchParams.get("launch");    // EHR-Launch will provide this parameter

  // If authParams were passed from the previous page, use those. Otherwise, use the ones we loaded...
  let authParams: fhirclient.AuthorizeParams = Object.assign({}, AUTH_PARAMS_SMART);
  if (locationState && locationState.authParams) { authParams = locationState.authParams; }
  if (launch) { authParams.launch = launch; }

  // Element to show while authorization is getting ready...
  const defaultElement = (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-6 relative overflow-hidden sm:py-12">
        <h1 className="text-3xl font-bold text-center pt-8">Loading...</h1>
    </div>
  );

  return (
    <FHIRClientLauncher 
      authParams={authParams}
      defaultElement={defaultElement}
    />
  );
}

export default LaunchScreen;
