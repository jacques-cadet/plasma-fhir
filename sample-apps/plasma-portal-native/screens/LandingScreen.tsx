import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import config, { mode, appVersion } from "../config/config";
import { FHIRVersionSelector, HealthSystemSearch, TestLaunchCard } from "./../components";

// Epic endpoints...
const endpointsDSTU2 = require("../assets/endpoints/Epic_DSTU2Endpoints.json");
const endpointsR4 = require("../assets/endpoints/Epic_R4Endpoints.json");

// Pre-configured auth params...
const AUTH_PARAMS_EPIC_PATIENT_DSTU2 = config.EPIC_PATIENT_DSTU2;
const AUTH_PARAMS_EPIC_PATIENT_R4 = config.EPIC_PATIENT_R4;

function LandingScreen(props: any) {
    const [version, setVersion] = useState<"r4" | "dstu2">("r4");
    const endpoints = (version === "dstu2") ? endpointsDSTU2 : endpointsR4;

    return (
        <View>
            {/* HEADER */}
            {/* <img src={require("./../assets/img/logo.jpg")} className="rounded-lg" style={{ maxHeight: "50px" }} /> */}
            <Text>Welcome to the Plasma Portal</Text>
            <Text>Version {appVersion}</Text>
            <View />

            {/* DEBUG CARD */}
            {mode === "LOCAL" && <TestLaunchCard 
                authParams_epicSandbox1={config.EPIC_PATIENT_SANDBOX}
                authParams_epicSandbox2={config.EPIC_PATIENT_SANDBOX_2}
                authParams_smartOnFhir={config.SMART}
                authParams_ssmDSTU2={config.EPIC_PATIENT_DSTU2}
                authParams_ssmR4={config.EPIC_PATIENT_R4}
                authParams_cerner={config.CERNER_PATIENT_R4}
            />}

            {/* FHIR VERSION SELECTOR */}
            <View />
            <Text>FHIR Version:</Text>
            <FHIRVersionSelector version={version} onVersionChange={setVersion} />
            
            {/* HEALTH SYSTEM SEARCH */}
            <View />
            <Text>Search for your health system below to launch the portal...</Text>          
            <View />
            <HealthSystemSearch 
                authParams={(version === "dstu2") ? AUTH_PARAMS_EPIC_PATIENT_DSTU2 : AUTH_PARAMS_EPIC_PATIENT_R4 } 
                endpoints={endpoints.entry.map((endpoint: any) => { 
                        return { name: endpoint.resource.name, address: endpoint.resource.address }
                    })
                } 
            />

        </View>
    );
}

export default LandingScreen;