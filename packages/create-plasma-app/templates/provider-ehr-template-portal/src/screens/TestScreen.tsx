import { useContext, useEffect, useState } from 'react';
import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { Patient } from 'fhir/r4';
import { FHIRr4 } from "plasma-fhir-react-components";
import { PlasmaFHIRApi, Resources } from "plasma-fhir-app-utils";

interface ITestScreenProps { };
function TestScreen(props: ITestScreenProps) {
    const context = useContext(FHIRClientContext);    
    const [patientData, setPatientData] = useState<Patient | undefined>(undefined);
    const [isPatientDataLoaded, setIsPatientDataLoaded] = useState<boolean>(false);

    // Load patient data...
    useEffect(() => {
        // If we already loaded, exit...
        if (isPatientDataLoaded) { return; }

        // Get FHIR client...
        const fhirClient = context.client;
        if (!fhirClient) { return; }
        const plasma = PlasmaFHIRApi.fromFHIRClient(fhirClient);
        const patientId = fhirClient.patient.id + "";

        // Read patient resource...
        fhirClient.patient.read().then((value: Patient) => {
            console.log("patient", value);
            setIsPatientDataLoaded(true);
            setPatientData(value);
        });

        // Load vitals...
        plasma.readVitals(patientId).then((value: Resources.Observation[]) => {
            console.log("vitals", value);
        });

    }, [isPatientDataLoaded, context.client]);

    return (
        <div className="p-5">
            {/* Loading Spinner */}
            {!isPatientDataLoaded ? 
            <div style={{ position: "absolute", paddingTop: "20px", left: "50%"}}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div> : null}

            {/* Patient Header */}
            {isPatientDataLoaded ? 
            <div className="g-4">
                <div>
                    <FHIRr4.PatientHeader patient={patientData} />
                </div>
            </div> : null}

            <br /><br /><br />
            <span>Vitals have been loaded (check console)</span>

        </div>
    )
}

export default TestScreen;