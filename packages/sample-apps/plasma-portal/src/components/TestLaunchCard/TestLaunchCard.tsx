import React from "react";
import { Link } from "react-router-dom";

export interface ITestLaunchCardProps {
    authParams_epicSandbox1: any;
    authParams_epicSandbox2: any;
    authParams_smartOnFhir: any;
    authParams_ssmDSTU2: any;
    authParams_ssmR4: any;
    authParams_cerner: any;
}

/** Just for convenience. Let's you quickly launch to several platforms */
export default function TestingLaunchCard(props: ITestLaunchCardProps) {
    return (
        <div className="w-full">
            <div className="p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Testing</h5>
                </a>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are some test environments to try out:
                </p>
                
                <div>
                    <Link to="/launch" state={{ authParams: props.authParams_epicSandbox1 }} className="text-center">
                        <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Launch Epic Sandbox (1)
                        </div>
                        <span className="mx-3 dark:text-white text-black text-xs">fhircamila / epicepic1</span>
                    </Link>
                </div>

                <div>
                    <Link to="/launch" state={{ authParams: props.authParams_epicSandbox2 }} className="text-center">
                        <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Launch Epic Sandbox (2)
                        </div>
                        <span className="mx-3 dark:text-white text-black text-xs">fhirjason / epicepic1</span>
                    </Link>
                </div>

                <div>
                    <Link to="/launch" state={{ authParams: props.authParams_smartOnFhir }} className="text-center">
                        <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Launch SMART-on-FHIR Sandbox
                        </div>
                        <span className="mx-3 dark:text-white text-black text-xs">Gerardo Botello</span>
                    </Link>
                </div>

                <div>
                    <Link to="/launch" state={{ authParams: props.authParams_ssmDSTU2 }} className="text-center">
                        <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Launch SSM Health (in Madison) [DSTU2]
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/launch" state={{ authParams: props.authParams_ssmR4 }} className="text-center">
                        <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Launch SSM Health (in Madison) [R4]
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/launch" state={{ authParams: props.authParams_cerner }} className="text-center">
                        <div className="my-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Launch Cerner Sandbox [R4]
                        </div>
                        <span className="mx-3 dark:text-white text-black text-xs">(Not currently working)</span>
                        <span className="mx-3 dark:text-white text-black text-xs">Logins: https://docs.google.com/document/d/10RnVyF1etl_17pyCyK96tyhUWRbrTyEcqpwzW-Z-Ybs/edit#</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}