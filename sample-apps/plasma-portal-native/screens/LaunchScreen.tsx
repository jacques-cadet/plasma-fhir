import React from 'react';
import { View, Text } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import { FHIRClientLauncher } from "../plasma-fhir/FHIRClient";

interface ILocationState {
  authParams?: any;
}

function LaunchScreen() {
  // ERM: TODO: Get authParams
  //const baseUrl = "https://localhost:3000";
  const baseUrl = "http://192.168.1.121:19006";
  const authParams = { 
        "clientId":           "smart-client-id-not-needed",
        "completeInTarget":   true,
        "fhirServiceUrl":     "https://launch.smarthealthit.org/v/r4/fhir",
        "patientId":          "8de3051f-6298-43e6-9b7f-2aa6443ee760",
        "redirectUri":        `${baseUrl}/app`,
        "scope":              "launch launch/patient patient/*.read offline_access",
    };
  //const { authParams } = useLinkProps({ authParams });
  //const locationState = location.state as ILocationState;

  // Element to show while authorization is getting ready...
  const defaultElement = (
    <View>
        <Text>Loading...</Text>
    </View>
  );

  return (
    <FHIRClientLauncher 
      authParams={authParams}
      defaultElement={defaultElement}
    />
  );
}

export default LaunchScreen;
