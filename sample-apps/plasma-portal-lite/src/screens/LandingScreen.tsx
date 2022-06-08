import React from "react";
import { Link } from "react-router-dom";
import config from "../config/config";

// Pre-configured auth params...
const AUTH_PARAMS_SMART = config.SMART;

function LandingScreen(props: any) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 relative overflow-hidden sm:py-12">
            {/* HEADER */}
            <img src={require("./../assets/img/logo.jpg")} alt="logo" className="rounded-lg" style={{ maxHeight: "50px" }} />
            <h1 className="text-3xl font-bold text-center">Plasma Portal (Lite)</h1>
            <div className="py-3" />

            <div>
                <Link to="/launch" state={{ authParams: AUTH_PARAMS_SMART }} className="text-center">
                    <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Launch SMART-on-FHIR Sandbox
                    </div>
                    <span className="mx-3 text-black text-xs">Gerardo Botello</span>
                </Link>
            </div>
        </div>
    );
}

export default LandingScreen;