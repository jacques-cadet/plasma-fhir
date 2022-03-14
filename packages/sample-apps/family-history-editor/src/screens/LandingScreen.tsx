import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../config/config";

// Pre-configured auth params...
const AUTH_PARAMS_SMART = config.SMART;

function LandingScreen(props: any) {
    const [version, setVersion] = useState<"r4" | "dstu2">("r4");

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 py-6 relative overflow-hidden sm:py-12">
            <h1 className="text-3xl font-bold text-center">Family History Editor</h1>
            <div className="py-3" />

            <div>
                <Link to="/launch" state={{ authParams: AUTH_PARAMS_SMART }} className="text-center">
                    <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Launch SMART-on-FHIR Sandbox
                    </div>
                    <span className="mx-3 dark:text-white text-black text-xs">Gerardo Botello</span>
                </Link>
            </div>
            
            <div className="py-3" />
            <div className="font-bold">FHIR Version:</div>
            <FHIRVersionSelector version={version} onVersionChange={setVersion} />

        </div>
    );
}

/** Toggle between R4/DSTU2 */
interface IFHIRVersionSelectorProps { version: "r4" | "dstu2"; onVersionChange: (version: "r4" | "dstu2") => void; }
function FHIRVersionSelector(props: IFHIRVersionSelectorProps) {
    return (
        <div className="flex justify-center">
            <div>
                <div className="form-check">
                    <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" 
                        checked={props.version === "r4"}
                        onChange={() => props.onVersionChange((props.version === "r4") ? "dstu2" : "r4")}
                    />
                    <label className="form-check-label inline-block text-gray-800">
                        R4
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" 
                        checked={props.version === "dstu2"}
                        onChange={() => props.onVersionChange((props.version === "r4") ? "dstu2" : "r4")}
                    />
                    <label className="form-check-label inline-block text-gray-800">
                        DSTU2
                    </label>
                </div>
                
            </div>
        </div>
    );
}


export default LandingScreen;