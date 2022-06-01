import React, { useState } from "react";
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import config, { mode, appVersion } from "../config/config";
import { FHIRVersionSelector, HealthSystemSearch, TestLaunchCard } from "./../components";


import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [version, setVersion] = useState<"r4" | "dstu2">("r4");

   // AUTH TESTING
   WebBrowser.maybeCompleteAuthSession();    
   const useProxy = true;
   const redirectUri = AuthSession.makeRedirectUri({ useProxy });
   console.log("RedirectUri", redirectUri);

   // ERM: MAJOR TESTING
   config.SMART.redirectUri = redirectUri;
   (config.SMART as any).aud = "patient";
   (config.SMART as any).scopes = config.SMART.scope.split(" ");

   const discovery = AuthSession.useAutoDiscovery('https://launch.smarthealthit.org/v/r4/fhir');
   const [request, result, promptAsync] = AuthSession.useAuthRequest(config.SMART, discovery);

   console.log(request, result, promptAsync);
   //


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Login!" onPress={() => promptAsync({ useProxy })} />
            {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
            </View>

      <FHIRVersionSelector version={version} 
        onVersionChange={(version: "r4" | "dstu2") => setVersion(version)}
      />

      {/* DEBUG CARD */}
      <View style={{ backgroundColor: "white", flex: 1 }}>
      {mode === "LOCAL" && <TestLaunchCard 
            authParams_epicSandbox1={config.EPIC_PATIENT_SANDBOX}
            authParams_epicSandbox2={config.EPIC_PATIENT_SANDBOX_2}
            authParams_smartOnFhir={config.SMART}
            authParams_ssmDSTU2={config.EPIC_PATIENT_DSTU2}
            authParams_ssmR4={config.EPIC_PATIENT_R4}
            authParams_cerner={config.CERNER_PATIENT_R4}
        />}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
