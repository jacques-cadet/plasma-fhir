import React, { useState } from "react";
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
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 relative overflow-hidden sm:py-12">
            {/* HEADER */}
            <img src={require("./../assets/img/logo.jpg")} className="rounded-lg" style={{ maxHeight: "50px" }} />
            <h1 className="text-3xl font-bold text-center">Welcome to the Plasma Portal</h1>
            <span className="text-xs">Version {appVersion}</span>
            <div className="py-3" />

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
            <div className="py-3" />
            <div className="font-bold">FHIR Version:</div>
            <FHIRVersionSelector version={version} onVersionChange={setVersion} />
            
            {/* HEALTH SYSTEM SEARCH */}
            <div className="py-3" />
            <span>Search for your health system below to launch the portal...</span>          
            <div className="py-3" />
            <HealthSystemSearch 
                authParams={(version === "dstu2") ? AUTH_PARAMS_EPIC_PATIENT_DSTU2 : AUTH_PARAMS_EPIC_PATIENT_R4 } 
                endpoints={endpoints.entry.map((endpoint: any) => { 
                        return { name: endpoint.resource.name, address: endpoint.resource.address }
                    })
                } 
            />

        </div>
    );
}

export default LandingScreen;