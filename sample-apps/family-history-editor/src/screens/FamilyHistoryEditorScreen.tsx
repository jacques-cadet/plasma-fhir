import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Patient } from 'fhir/r4';
import { fhirclient } from "fhirclient/lib/types";

import { 
    Button, ConfirmationDialog, FamilyMemberHistoryEditDialog,
    FamilyHistoryTable, FamilyHistoryTableColumns 
} from "../components";
import { FHIRr4 } from "plasma-fhir-react-components";
import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { PlasmaFHIRApi, Resources } from "plasma-fhir-app-utils";

interface ITestScreenProps { };
function TestScreen(props: ITestScreenProps) {
    const context = useContext(FHIRClientContext);    
    const [patientData, setPatientData] = useState<Patient | undefined>(undefined);
    const [isPatientDataLoaded, setIsPatientDataLoaded] = useState<boolean>(false);
    const [familyMemberHistory, setFamilyMemberHistory] = useState<Resources.FamilyMemberHistory[]>([]);
    const [isFamilyMemberHistoryLoaded, setIsFamilyMemberHistoryLoaded] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [indexOfActiveFamilyMember, setIndexOfActiveFamilyMember] = useState<number>(-1);


    const [rangeValue, setRangeValue] = useState<Resources.Range | undefined>(new Resources.Range(new Resources.Quantity(0, ""), undefined));
    const [rangeFormat, setRangeFormat] = useState<string>("0 - 10");

    const [rangeValue2, setRangeValue2] = useState<Resources.Range | undefined>(new Resources.Range(new Resources.Quantity(0, ""), undefined));
    const [rangeFormat2, setRangeFormat2] = useState<string>("20 - 30");

    const [ageValue, setAgeValue] = useState<Resources.Range | undefined>(undefined);
    const [ageFormat, setAgeFormat] = useState<string>("");


    // Load patient data...
    useEffect(() => {
        // If we already loaded, exit...
        if (isPatientDataLoaded) { return; }

        // Get FHIR client...
        const fhirClient = context.client;
        if (!fhirClient) { return; }
        const plasma = PlasmaFHIRApi.fromFHIRClient(fhirClient);
        const patientId = fhirClient.patient.id || "";

        // Query for FamilyMemberHistory...
        plasma.readFamilyMemberHistory(patientId).then((data: Resources.FamilyMemberHistory[]) => {
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

        // Build promises for creating family members...
        const testFamily = createTestFamily(fhirClient.patient.id);
        const pCreateRelatives = testFamily.map((relative: Resources.FamilyMemberHistory) => {
            return fhirClient.create(relative as fhirclient.FHIR.Resource);
        });

        // Create all family members...
        setIsLoading(true);
        Promise.all(pCreateRelatives).then((values: fhirclient.FHIR.Resource[]) => {
            console.log("New family members have been created", values);
            setIsFamilyMemberHistoryLoaded(true);
            setIsLoading(false);

            // Assign new family members to the data structure...
            setFamilyMemberHistory([...familyMemberHistory, ...testFamily]);
        });

    }, [context, familyMemberHistory, setFamilyMemberHistory, setIsLoading, setIsFamilyMemberHistoryLoaded]);

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
        //setShowEditDialog(true);
        //setIndexOfActiveFamilyMember(-1);
        console.log("Ok");


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
    }, []);

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
                ? familyMemberHistory.condition.map((c: any) => { return c.code.text; }).join(", ")
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
            {/* Header Info */}
            <h1>Family History</h1>
            <hr />
            <PatientHeader patient={patientData} />
            <hr />         

            {/* Delete Confirmation */}
            <ConfirmationDialog 
                show={showDeleteDialog}
                onHide={() => setShowDeleteDialog(false)}
                onYesClick={onConfirmDeleteFamilyMemberClick}
                onNoClick={onCancelDeleteFamilyMemberClick}
                title="Delete"
                message="Are you sure you want to delete this family member?"
            />

            {/* Edit Modal */}
            <FamilyMemberHistoryEditDialog
                show={showEditDialog}
                onHide={() => setShowEditDialog(false)}
                onSaveClick={onSaveEditFamilyMemberClick}
                onCancelClick={onCancelEditFamilyMemberClick}
                title={(indexOfActiveFamilyMember === -1) ? "Add Family Member" : "Edit Family Member"}
                familyMemberHistory={(indexOfActiveFamilyMember === -1) ? null : familyMemberHistory[indexOfActiveFamilyMember]}
            />

            {/* Loading */}
            {isLoading || !isPatientDataLoaded || !isFamilyMemberHistoryLoaded ? 
            <div className="bg-indigo-200 rounded shadow" style={{ position: "absolute", padding: "20px", left: "50%"}}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
            </div> : null}

            
            {/* TODO: Testing around with a Range input */}
            <input type="text" className="border p-2 m-4" placeholder="TESTING: RANGE" 
                value={rangeFormat}
                onChange={(e) => {
                    const s = e.target.value;
                    const range = Resources.Range.fromString(s);

                    // Try to parse the range. If we can, then update the value and reformat.
                    // If we can't, erase the value and leave the format as-is.
                    if (range) {
                        setRangeValue(range);
                        setRangeFormat(Resources.Range.toString(range));
                    } else {
                        setRangeValue(undefined);
                        setRangeFormat(s);
                    }
                }}
            />

            {/* TODO: Testing around with an Age input */}
            <input type="text" className="border p-2 m-4" placeholder="TESTING: AGE" 
                value={ageFormat}
                onChange={(e) => {
                    const s = e.target.value;
                    const range = Resources.Range.fromAgeString(s);

                    // Try to parse the range. If we can, then update the value and reformat.
                    // If we can't, erase the value and leave the format as-is.
                    if (range) {
                        setAgeValue(range);
                        setAgeFormat(Resources.Range.toString(range));
                    } else {
                        setAgeValue(undefined);
                        setAgeFormat(s);
                    }
                }}
            />

            {/*<FHIRr4.RangeInput />*/}

            
            {isFamilyMemberHistoryLoaded ?
                <FamilyHistoryTable data={data} />
                : null
            }

            {/* Button to create test family */}
            <div className="pt-2" />
            <Button onClick={onCreateTestFamilyClick}>Create Test Family</Button>

            <div className="pt-2" />
            <GreenButton onClick={onAddFamilyMemberClick}>Add Family Member</GreenButton>

            <div className="pt-2" />
            <BlueButton>Pull Family History From EHR</BlueButton><span className="px-1" />
            <BlueButton>Save to EHR</BlueButton><span className="px-1" />
            <BlueButton>Save to PlasmaFHIR</BlueButton>

            <div className="pt-2" />
            <IndigoButton>Inquire Family Member</IndigoButton>
        </div>
    )
}

// Creates and returns a test family...
const createTestFamily = (patientId: string): Resources.FamilyMemberHistory[] => {
    const father = new Resources.FamilyMemberHistory(patientId, "R_01", "Father");
    father.name = "John";
    father.sex = Resources.AdministrativeGender.Male;
    father.ageAge = Resources.Age.fromYears(60);

    const mother = new Resources.FamilyMemberHistory(patientId, "R_02", "Mother");
    mother.name = "Mary";
    mother.sex = Resources.AdministrativeGender.Female;
    mother.ageAge = Resources.Age.fromYears(58);

    const son = new Resources.FamilyMemberHistory(patientId, "R_03", "Son");
    son.name = "Tim";
    son.sex = Resources.AdministrativeGender.Male;
    son.ageAge = Resources.Age.fromYears(25);

    return [father, mother, son];
}

function BlueButton(props: any) {
    return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...props}>{props.children}</button>
}

function IndigoButton(props: any) {
    return <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" {...props}>{props.children}</button>
}

function GreenButton(props: any) {
    return <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" {...props}>{props.children}</button>
}

// Circle with text in it. Try to keep text to 2 characters.
function CircleText(props: { cssClass?: string, children: any }) {
    let cssClass = "w-5 h-5 p-4 rounded-full flex justify-center items-center text-center";
    if (props.cssClass) { cssClass += " " + props.cssClass; }

    return (
        <div className={cssClass}>
            {props.children}
        </div>
    )
}

// Patient header
interface IPatientHeaderProps { patient?: Patient }
function PatientHeader(props: IPatientHeaderProps) {
    if (!props.patient) { return <div />; }
    if (!props.patient.name || !props.patient.name[0]) { return <div />; }

    // Determine patient's initials...
    const patientName = props.patient.name[0];
    let patientInitials = "";
    if (patientName.given && patientName.given.length > 0) { patientInitials += patientName.given[0].charAt(0); }
    if (patientName.family) { patientInitials += patientName.family.charAt(0); }

    return (
        <div>
            <div className="flex flex-row">
                <CircleText cssClass="bg-blue-500 text-white">{patientInitials}</CircleText>
                <div style={{ paddingLeft: "4px"}} />
                <div className="pl-2">
                    {/* Name */}
                    <div className="font-bold"><FHIRr4.HumanNameView humanName={props.patient.name[0]} /></div>

                    {/* Sex, Age, DOB */}
                    <div>
                        <label className="capitalize">{props.patient.gender}</label>
                        <span>, </span>
                        <FHIRr4.AgeView dob={props.patient.birthDate} />
                        <span>, 🎂 </span>
                        <FHIRr4.DateView date={props.patient?.birthDate} />
                    </div>

                    {/* Address */}
                    <div className="pt-2">
                        <span className="font-bold">🏠 Address</span>
                        {props.patient?.address?.map((addr, idx: number) => { 
                            return <FHIRr4.AddressView key={`AddressView_${idx}`} address={addr} />; 
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestScreen;