import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Patient } from 'fhir/r4';
import { fhirclient } from "fhirclient/lib/types";

import { 
    Button, ConfirmationDialog, FamilyMemberHistoryEditDialog,
    FamilyHistoryTable, FamilyHistoryTableColumns 
} from "../components";
import { FHIRr4 } from "plasma-fhir-react-components";
import { FHIRClientContext } from "../plasma-fhir/FHIRClient";
import * as FHIRClientHelper from '../plasma-fhir/api/FHIRClientHelper';
import { FamilyMemberHistory, FamilyMemberHistoryCondition, CodeableConcept, Age, Coding,
    AdministrativeGender, FamilyMemberHistory_Relationship 
} from "../plasma-fhir/api/FHIRResourceHelpers";

interface ITestScreenProps { };
function TestScreen(props: ITestScreenProps) {
    const context = useContext(FHIRClientContext);    
    const [patientData, setPatientData] = useState<Patient | undefined>(undefined);
    const [isPatientDataLoaded, setIsPatientDataLoaded] = useState<boolean>(false);
    const [familyMemberHistory, setFamilyMemberHistory] = useState<FamilyMemberHistory[]>([]);
    const [isFamilyMemberHistoryLoaded, setIsFamilyMemberHistoryLoaded] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [indexOfActiveFamilyMember, setIndexOfActiveFamilyMember] = useState<number>(-1);

    // Family Member properties (this should be a control)...
    const [name, setName] = useState<string>("");
    const [relationship, setRelationship] = useState<Coding>(FamilyMemberHistory_Relationship.Father);
    const [sex, setSex] = useState<Coding | null>(AdministrativeGender.Female);

    // Load patient data...
    useEffect(() => {
        // If we already loaded, exit...
        if (isPatientDataLoaded) { return; }

        // Get FHIR client...
        const fhirClient = context.client;
        if (!fhirClient) { return; }

        // Query for FamilyMemberHistory...
        FHIRClientHelper.getFamilyMemberHistory(fhirClient).then((data: FamilyMemberHistory[]) => {
            console.log("famhx", data);
            setFamilyMemberHistory(data);
            setIsFamilyMemberHistoryLoaded(true);
        });

        // Read patient resource...
        fhirClient.patient.read().then((value: Patient) => {
            console.log("patient", value);
            setIsPatientDataLoaded(true);
            setPatientData(value);
        });
    }, [isPatientDataLoaded]);

    const onCreateTestFamilyClick = useCallback(() => {
        const fhirClient = context.client;
        if (!fhirClient) { return; }
        if (!fhirClient.patient.id) { return; }

        const testFamily = createTestFamily(fhirClient.patient.id);
        testFamily.forEach((familyMemberHistory: FamilyMemberHistory) => {
            fhirClient.create(familyMemberHistory as fhirclient.FHIR.Resource).then(() => {
                console.log("Added new Family Member");
            });
        });


    }, [context]);

    //
    // EDIT ACTIONS
    //

    const onEditFamilyMemberClick = useCallback((index: number) => {
        setShowEditDialog(true);
        setIndexOfActiveFamilyMember(index);
    }, [setShowEditDialog, setIndexOfActiveFamilyMember]);

    //
    // CREATE ACTIONS
    //

    // Occurs when "Add Family Member" is clicked...
    const onAddFamilyMemberClick = useCallback(() => {
        setShowEditDialog(true);
        setIndexOfActiveFamilyMember(-1);


        /*
        const fhirClient = context.client;
        if (!fhirClient)  { return; }

        console.log(relationship);

        if (!fhirClient.patient || !fhirClient.patient.id) { return; }
        if (!relationship) { return; }

        console.log(sex);

        // Construct the FamilyMemberHistory object...
        // TODO: The condition and ID are all hard-coded...
        const famHxObj = new FamilyMemberHistory(fhirClient.patient.id, "ID-002", relationship);
        famHxObj.name = name;
        if (sex) { famHxObj.sex = CodeableConcept.fromSingleCoding(sex); }
        // TODO: Why am I even allowed to do this? famHxObj.sex = sex;  // There should be a type error
        famHxObj.condition!.push(FamilyMemberHistoryCondition.fromSNOMED("371041009", "Embolic Stroke", "Stroke", 56));

        // CREATE the FamilyMemberHistory...
        fhirClient.create(famHxObj as fhirclient.FHIR.Resource).then(() => {
            console.log("Added new Family Member", famHxObj);
        });
        */
    }, [sex, relationship, name]);

    const onSaveEditFamilyMemberClick = useCallback(() => {
        setShowEditDialog(false);
    }, []);

    const onCancelEditFamilyMemberClick = useCallback(() => {
        setShowEditDialog(false);
    }, []);


    //
    // DELETE ACTIONS   
    //

    // Occurs when "Delete" is clicked for a family member...
    const onDeleteFamilyMemberClick = useCallback((index: number) => {
        setIndexOfActiveFamilyMember(index);
        setShowDeleteDialog(true);
    }, [familyMemberHistory, setIndexOfActiveFamilyMember, setShowDeleteDialog]);

    const onConfirmDeleteFamilyMemberClick = useCallback(() => {
        const fhirClient = context.client;
        if (!fhirClient)  { return; }
        
        setIsLoading(true);
        const relative = familyMemberHistory[indexOfActiveFamilyMember];
        fhirClient.delete(`FamilyMemberHistory/${relative.id}`).then(() => {
            setIndexOfActiveFamilyMember(-1);
            setShowDeleteDialog(false);
            setIsLoading(false);
        });
    }, [familyMemberHistory, indexOfActiveFamilyMember, setIsLoading, setIndexOfActiveFamilyMember, setShowDeleteDialog]);

    const onCancelDeleteFamilyMemberClick = useCallback(() => {
        setIndexOfActiveFamilyMember(-1);
        setShowDeleteDialog(false);
    }, [setIndexOfActiveFamilyMember, setShowDeleteDialog]);

    //
    // RENDERING
    //

    // Format table data...
    const data = React.useMemo((): FamilyHistoryTableColumns[] => {
        return familyMemberHistory.map((familyMemberHistory, idx) => {
            const sConditions = (familyMemberHistory.condition)
                ? familyMemberHistory.condition.map((c) => { return c.code.text; }).join(", ")
                : "";

            return {
                delete: <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => onDeleteFamilyMemberClick(idx)}>Delete</button>,
                edit: <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => onEditFamilyMemberClick(idx)}>Edit</button>,
                relationship: <FHIRr4.CodeableConceptView codeableConcept={familyMemberHistory.relationship} />,
                name: familyMemberHistory.name || "",
                sex: familyMemberHistory?.sex?.text || "",
                age: familyMemberHistory?.ageAge?.value?.toString() || "",
                conditions: sConditions
            };
        });
    }, [familyMemberHistory]);

    return (
        <div className="p-5">
            <h1>Family History</h1>

            <ConfirmationDialog 
                show={showDeleteDialog}
                onHide={() => setShowDeleteDialog(false)}
                onYesClick={onConfirmDeleteFamilyMemberClick}
                onNoClick={onCancelDeleteFamilyMemberClick}
                title="Delete"
                message="Are you sure you want to delete this family member?"
            />

            <FamilyMemberHistoryEditDialog
                show={showEditDialog}
                onHide={() => setShowEditDialog(false)}
                onSaveClick={onSaveEditFamilyMemberClick}
                onCancelClick={onCancelEditFamilyMemberClick}
                title={(indexOfActiveFamilyMember === -1) ? "Add Family Member" : "Edit Family Member"}
                familyMemberHistory={(indexOfActiveFamilyMember === -1) ? null : familyMemberHistory[indexOfActiveFamilyMember]}
            />

            {isLoading ? 
            <div style={{ position: "absolute", paddingTop: "20px", left: "50%"}}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div> : null}

            {/* Loading Spinner */}
            {!isPatientDataLoaded ? 
            <div style={{ position: "absolute", paddingTop: "20px", left: "50%"}}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div> : null}

            {patientData && <FHIRr4.PatientHeader patient={patientData} />}

            {/* Button to create test family */}
            <div className="pt-5" />
            <Button onClick={onCreateTestFamilyClick}>Create Test Family</Button>
            
            <div className="pt-5" />
            {isFamilyMemberHistoryLoaded ?
                <FamilyHistoryTable data={data} />
                : null
            }

            {/* Inputs for name and relationship 
            <input type="text" placeholder="Name" className="border-2 border-black my-2 p-2" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <FHIRr4.CodingSelector 
                codes={Object.keys(FamilyMemberHistory_Relationship).map((key) => (FamilyMemberHistory_Relationship as any)[key])} 
                selectedCode={relationship}
                onChange={(code: Coding) => setRelationship(code)} 
            /><br /><br />
            <FHIRr4.CodingSelector 
                codes={Object.keys(AdministrativeGender).map((key) => (AdministrativeGender as any)[key])} 
                selectedCode={sex}
                onChange={(code: Coding) => setSex(code)} 
            /><br /><br />
            */}

            <div className="pt-5" />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onAddFamilyMemberClick}>Add Family Member</button>

            <br /><br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                Pull Family History From EHR
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                Save to EHR
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                Save to PlasmaFHIR
            </button>

            <br /><br />
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mx-2 rounded">
                Inquire Family Member
            </button>

            {/* Patient Header 
            {isPatientDataLoaded ? 
            <div className="g-4">
                <Card>
                    <FHIRr4.PatientHeader patient={patientData} />
                </Card>
            </div> : null}
            */}

        </div>
    )
}

const createTestFamily = (patientId: string): FamilyMemberHistory[] => {

    // Sample data...
    //const r4test11874: fhir4.FamilyMemberHistory = {"resourceType":"FamilyMemberHistory","id":"mother","status":"completed","patient":{"reference":"Patient/100","display":"Peter Patient"},"relationship":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RoleCode","code":"MTH","display":"mother"}]},"condition":[{"code":{"coding":[{"system":"http://snomed.info/sct","code":"371041009","display":"Embolic Stroke"}],"text":"Stroke"},"onsetAge":{"value":56,"unit":"yr","system":"http://unitsofmeasure.org","code":"a"}}]};
    //const r4test11881: fhir4.FamilyMemberHistory = {"resourceType":"FamilyMemberHistory","id":"father","identifier":[{"value":"12345"}],"instantiatesUri":["http://example.org/family-member-history-questionnaire"],"status":"completed","patient":{"reference":"Patient/example","display":"Peter Patient"},"date":"2011-03-18","relationship":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RoleCode","code":"FTH","display":"father"}]},"sex":{"coding":[{"system":"http://hl7.org/fhir/administrative-gender","code":"male","display":"Male"}]},"condition":[{"code":{"coding":[{"system":"http://snomed.info/sct","code":"315619001","display":"Myocardial Infarction"}],"text":"Heart Attack"},"contributedToDeath":true,"onsetAge":{"value":74,"unit":"yr","system":"http://unitsofmeasure.org","code":"a"},"note":[{"text":"Was fishing at the time. At least he went doing someting he loved."}]}]};

    const father = new FamilyMemberHistory(patientId, "R_01", "Father");
    father.name = "John";
    father.sex = AdministrativeGender.Male;
    father.ageAge = Age.fromYears(60);

    const mother = new FamilyMemberHistory(patientId, "R_02", "Mother");
    mother.name = "Mary";
    mother.sex = AdministrativeGender.Female;
    mother.ageAge = Age.fromYears(58);

    const son = new FamilyMemberHistory(patientId, "R_03", "Son");
    son.name = "Tim";
    son.sex = AdministrativeGender.Male;
    son.ageAge = Age.fromYears(25);

    return [father, mother, son];
}

export default TestScreen;