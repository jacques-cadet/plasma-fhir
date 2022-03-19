import React, { useState } from "react";
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import config, { mode, appVersion } from "../config/config";
import { FHIRVersionSelector, HealthSystemSearch, TestLaunchCard } from "./../components";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [version, setVersion] = useState<"r4" | "dstu2">("r4");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

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
