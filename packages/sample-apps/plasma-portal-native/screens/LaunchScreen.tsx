import React from 'react';
import { useLinkProps } from '@react-navigation/native';
import { FHIRClientLauncher } from "../plasma-fhir/FHIRClient";

interface ILocationState {
  authParams?: any;
}

function LaunchScreen() {
  // ERM: TODO: Get authParams
  const authParams = {};
  //const { authParams } = useLinkProps({ authParams });
  //const locationState = location.state as ILocationState;

  // Element to show while authorization is getting ready...
  const defaultElement = (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-6 relative overflow-hidden sm:py-12">
        <h1 className="text-3xl font-bold text-center">Loading...</h1>
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
