import React from "react";
import { Link } from "react-router-dom";
import config from "../config/config";

const SIMPLE_VIEW = false;

// Pre-configured auth params...
const AUTH_PARAMS_SMART = config.SMART;
const AUTH_PARAMS_SMART_PATIENT = config.SMART_PATIENT;
const AUTH_PARAMS_EPIC_PATIENT_SANDBOX = config.EPIC_PATIENT_SANDBOX;
const AUTH_PARAMS_EPIC_CLINICIAN_SANDBOX = config.EPIC_CLINICIAN_SANDBOX;
const AUTH_PARAMS_EPIC_PATIENT_LIVE_R4 = config.EPIC_PATIENT_LIVE_R4;

function LandingScreen(props: any) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 relative overflow-hidden sm:py-12">
            {/* HEADER */}
            <img src={require("./../assets/img/logo.jpg")} alt="logo" className="rounded-lg" style={{ maxHeight: "50px" }} />
            <h1 className="text-3xl font-bold text-center">Plasma Portal (Lite)</h1>
            <div className="py-3" />

            {(!SIMPLE_VIEW) &&
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Platform</th>
                        <th scope="col" className="px-6 py-3">Context</th>
                        <th scope="col" className="px-6 py-3">Launch Type</th>
                        <th scope="col" className="px-6 py-3">FHIR Version</th>
                        <th scope="col" className="px-6 py-3">Notes</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Launch</span></th>
                    </tr>
                    </thead>

                    <tbody>

                    {/* SMART-HEALTH-IT PATIENT STANDALONE */}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">SMART Health IT (Sandbox)</th>
                        <td className="px-6 py-4 whitespace-nowrap">🤒 Patient</td>
                        <td className="px-6 py-4">Standalone</td>
                        <td className="px-6 py-4 text-center">R4</td>
                        <td className="px-6 py-4 text-xs">Hard-coded patient: <br /><em>Gerardo Botello</em></td>
                        <td className="px-6 py-4 text-right">
                            <Link to="/launch" state={{ authParams: AUTH_PARAMS_SMART_PATIENT }} className="text-center">
                                <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Launch
                                </div>
                            </Link>
                        </td>
                    </tr>

                    {/* SMART-HEALTH-IT CLINICIAN STANDALONE */}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">SMART Health IT (Sandbox)</th>
                        <td className="px-6 py-4 whitespace-nowrap">👨‍⚕️ Clinician</td>
                        <td className="px-6 py-4">Standalone</td>
                        <td className="px-6 py-4 text-center">R4</td>
                        <td className="px-6 py-4 text-xs">Hard-coded patient: <br /><em>Gerardo Botello</em></td>
                        <td className="px-6 py-4 text-right">
                            <Link to="/launch" state={{ authParams: AUTH_PARAMS_SMART_PATIENT }} className="text-center">
                                <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Launch
                                </div>
                            </Link>
                        </td>
                    </tr>

                    {/* SMART-HEALTH-IT PATIENT PORTAL LAUNCH */}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">SMART Health IT (Sandbox)</th>
                        <td className="px-6 py-4 whitespace-nowrap">🤒 Patient</td>
                        <td className="px-6 py-4">Patient Portal</td>
                        <td className="px-6 py-4 text-center">R4</td>
                        <td className="px-6 py-4 text-xs">
                                <strong>Instructions:</strong><br />
                                <ul className="list-disc px-6">
                                    <li>
                                        Navigate to <a className="underline text-blue-600" href="https://launch.smarthealthit.org/" target="_blank">SMART App Launcher</a>
                                    </li>                                    
                                    <li>
                                        Select "Patient Portal Launch"
                                    </li>
                                    <li>
                                        In "App Launch URL", type <code>https://localhost:3000/launch</code> and launch
                                    </li>
                                    <li>
                                        Type the ID of a patient (e.g. 87a339d0-8cae-418e-89c7-8651e6aab3c6) and anything for a password
                                    </li>
                                </ul>
                        </td>
                        <td className="px-6 py-4 text-right">                            
                        </td>
                    </tr>

                    {/* SMART-HEALTH-IT EHR LAUNCH */}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">SMART Health IT (Sandbox)</th>
                        <td className="px-6 py-4 whitespace-nowrap">👨‍⚕️ Clinician</td>
                        <td className="px-6 py-4">EHR</td>
                        <td className="px-6 py-4 text-center">R4</td>
                        <td className="px-6 py-4 text-xs">
                                <strong>Instructions:</strong><br />
                                <ul className="list-disc px-6">
                                    <li>
                                        Navigate to <a className="underline text-blue-600" href="https://launch.smarthealthit.org/" target="_blank">SMART App Launcher</a>
                                    </li>                                    
                                    <li>
                                        Select "Provider EHR Launch"
                                    </li>
                                    <li>
                                        In "App Launch URL", type <code>https://localhost:3000/launch</code> and launch
                                    </li>
                                </ul>
                        </td>
                        <td className="px-6 py-4 text-right">                            
                        </td>
                    </tr>

                    {/* EPIC (SANDBOX) PATIENT STANDALONE */}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">Epic (Sandbox)</th>
                        <td className="px-6 py-4 whitespace-nowrap">🤒 Patient</td>
                        <td className="px-6 py-4">Standalone</td>
                        <td className="px-6 py-4 text-center">R4</td>
                        <td className="px-6 py-4 text-xs">
                                <strong>Instructions:</strong><br />
                                <ul className="list-disc px-6">
                                    <li>
                                    Edit <code>EPIC_PATIENT_SANDBOX</code> in <code>config.ts</code> and set use your "Non-Production Client ID" for a <em>Patient App</em><br /><br />
                                    </li>
                                </ul>
                                
                                <strong>Logins (partial list):</strong><br />
                                <ul className="list-disc px-6">
                                    <li><em>fhircamila / epicepic1</em></li>
                                    <li><em>fhirjason / epicepic1</em></li>
                                    <li><em>fhirderrick / epicepic1</em></li>
                                </ul>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <Link to="/launch" state={{ authParams: AUTH_PARAMS_EPIC_PATIENT_SANDBOX }} className="text-center">
                                <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    Launch
                                </div>
                            </Link>
                        </td>
                    </tr>

                    {/* EPIC (SANDBOX) CLINICIAN STANDALONE */}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">Epic (Sandbox)</th>
                        <td className="px-6 py-4 whitespace-nowrap">👨‍⚕️ Clinician</td>
                        <td className="px-6 py-4">Standalone</td>
                        <td className="px-6 py-4 text-center">R4</td>
                        <td className="px-6 py-4 text-xs">
                                <strong>Instructions:</strong><br />
                                <ul className="list-disc px-6">
                                    <li>
                                    Edit <code>EPIC_CLINICIAN_SANDBOX</code> in <code>config.ts</code> and set use your "Non-Production Client ID" for a <em>Clinician App</em><br /><br />
                                    </li>
                                </ul>

                                <strong>Login:</strong><br />
                                <ul className="list-disc px-6">
                                    <li><em>FHIR / EpicFhir11!</em></li>
                                </ul>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <Link to="/launch" state={{ authParams: AUTH_PARAMS_EPIC_CLINICIAN_SANDBOX }} className="text-center">
                                <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    Launch
                                </div>
                            </Link>
                        </td>
                    </tr>

                    {/* EPIC (PRODUCTION) PATIENT STANDALONE */}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">Epic (Live Client)</th>
                        <td className="px-6 py-4 whitespace-nowrap">🤒 Patient</td>
                        <td className="px-6 py-4">Standalone</td>
                        <td className="px-6 py-4 text-center">R4</td>
                        <td className="px-6 py-4 text-xs">
                                <strong>Instructions:</strong><br />
                                <ul className="list-disc px-6">
                                    <li>
                                        Edit <code>EPIC_PATIENT_LIVE_R4</code> in <code>config.ts</code> and set use your "Client ID" for a <em>Patient App</em>
                                    </li>
                                    <li>
                                        Edit <code>EPIC_PATIENT_LIVE_R4</code> in <code>config.ts</code> and set "iss" to the endpoint you want to connect to
                                    </li>
                                </ul>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <Link to="/launch" state={{ authParams: AUTH_PARAMS_EPIC_PATIENT_LIVE_R4 }} className="text-center">
                                <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    Launch
                                </div>
                            </Link>
                        </td>
                    </tr>


                    </tbody>
                </table>
            </div>
            }

            
            {/* SIMPLE VIEW (only has 1 button) */}
            {(SIMPLE_VIEW) && <>
                <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h2 className="font-bold">SMART Health IT</h2>
                    <div>
                        <Link to="/launch" state={{ authParams: AUTH_PARAMS_SMART }} className="text-center">
                            <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Launch SMART-on-FHIR Sandbox
                            </div>
                        </Link>
                    </div>
                </div></>
            }

        </div>
    );
}

export default LandingScreen;