import React, { useContext, useState, useEffect } from "react";
import { Grid, Card } from "@mantine/core";

import { PlasmaFHIRApi, Resources } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { FHIRr4, FHIRdstu2 } from "plasma-fhir-react-components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function AllergiesScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: allergyIntolerance, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<Resources.AllergyIntolerance>({
        context: context,
        getData: (patientId: string) => (PlasmaFHIRApi.fromFHIRClient(context.client as any)).readAllergyIntolerance(patientId)
    });

    // Determine which FHIR release version we're using...
    const [fhirVersion, setFhirVersion] = useState<number>(0);
    useEffect(() => {
        const fhirClient = context.client;
        if (fhirClient) {
            fhirClient.getFhirRelease().then((value: number) => {
                setFhirVersion(value);
            });
        }
    }, [setFhirVersion]);    

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold pb-4 flex content-center flex-row items-center">
                🤧 Allergies
            </h1>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Allergies */}
            {isDataLoaded && !hasErrorLoading ? 
            <Grid>
            {
                allergyIntolerance.map((allergy, idx) => { 
                    return (
                        <Grid.Col md={4} key={"AllergyIntoleranceItem_" + idx.toString()}>
                            {fhirVersion === 2 ? <FHIRdstu2.AllergyIntoleranceView allergyIntolerance={allergy as any} /> : null}

                            {fhirVersion === 4
                                ? <Card shadow="sm" className="border">
                                    <div>
                                        <FHIRr4.AllergyIntoleranceView allergyIntolerance={allergy} />
                                        {allergy.reaction ? allergy.reaction.map((reaction: any, idx: number) => {
                                            return <FHIRr4.AllergyIntoleranceReactionView reaction={reaction} />
                                        }) : null}                                        
                                    </div>
                                </Card>
                                : null
                            }                            
                        </Grid.Col>
                    );
                })
            }
            </Grid> : null}
        </div>
    );
}