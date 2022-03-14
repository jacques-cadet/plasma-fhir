import React from "react";

export interface IFHIRVersionSelectorProps { 
    version: "r4" | "dstu2"; 
    onVersionChange: (version: "r4" | "dstu2") => void; 
}

/** Lets you toggle between "r4" and "dstu2" */
export default function FHIRVersionSelector(props: IFHIRVersionSelectorProps) {
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