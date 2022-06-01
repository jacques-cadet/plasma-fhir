import React, { useState } from "react";
import config from "../config/config";
import { TestLaunchCard } from "./../components";

function LandingScreen(props: any) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 relative overflow-hidden sm:py-12">
            {/* HEADER */}
            <img src={require("./../assets/img/logo.jpg")} className="rounded-lg" style={{ maxHeight: "50px" }} />
            <h1 className="text-3xl font-bold text-center">Plasma Playground</h1>
            <div className="py-3" />

            {/* DEBUG CARD */}
            <TestLaunchCard 
                authParams_epicSandbox1={config.EPIC_PATIENT_SANDBOX}
                authParams_epicSandbox2={config.EPIC_PATIENT_SANDBOX_2}
                authParams_smartOnFhir={config.SMART}
                authParams_ssmDSTU2={config.EPIC_PATIENT_DSTU2}
                authParams_ssmR4={config.EPIC_PATIENT_R4}
                authParams_cerner={config.CERNER_PATIENT_R4}
            />

        </div>
    );
}

export default LandingScreen;