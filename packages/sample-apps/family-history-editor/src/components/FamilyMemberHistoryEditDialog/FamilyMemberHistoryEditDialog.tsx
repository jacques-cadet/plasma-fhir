import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FHIRr4 } from "plasma-fhir-react-components";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";


// TODO: Imported CodingSelector doesn't work

import { Coding } from "fhir/r4";
import { useCallback } from "react";
export interface ICodingSelectorProps { 
    codes: Coding[];
    selectedCode: Coding | null;
    onChange: (value: Coding) => void;
}

function CodingSelector(props: ICodingSelectorProps) {
    const options = props.codes.map((code: Coding, idx: number) => {
        const text = code.display;
        return (<option key={`CodingOption_${idx}`}  value={code.code}>{text}</option>);
    });

    const onChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = props.codes.find((code: Coding) => code.code === event.target.value);
        if (value) { props.onChange(value); }
    }, [props, props.codes, props.onChange]);

    return (
        <select onChange={onChange} value={props.selectedCode?.code} className="CodingSelector">
            {options}
        </select>
    );
}



export interface IFamilyMemberHistoryEditDialogProps {
    familyMemberHistory: PlasmaFHIR.FamilyMemberHistory | null;


    show: boolean;
    title: string;
    onSaveClick: () => void;
    onCancelClick: () => void;
    onHide: () => void;
}

// TODO: Make a "getDefault()" method

export default function FamilyMemberHistoryEditDialog(props: IFamilyMemberHistoryEditDialogProps) {
    const [name, setName] = useState<string>("");
    const [relationship, setRelationship] = useState<PlasmaFHIR.Coding>(PlasmaFHIR.FamilyMemberHistory_Relationship.Father);
    const [sex, setSex] = useState<PlasmaFHIR.Coding | null>(null);
    const [isDeceased, setIsDeceased] = useState<boolean>(false);
    const [age, setAge] = useState<string>("");
    const [deathAge, setDeathAge] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [mother, setMother] = useState<string>("");
    const [father, setFather] = useState<string>("");

    useEffect(() => {
        if (props.familyMemberHistory && props.familyMemberHistory.name) {
            setName(props.familyMemberHistory.name);
        } else {
            setName("");
        }

        if (props.familyMemberHistory && props.familyMemberHistory.relationship && props.familyMemberHistory.relationship.coding) {
            setRelationship(props.familyMemberHistory.relationship.coding[0]);
        } else {
            setRelationship(PlasmaFHIR.FamilyMemberHistory_Relationship.Father);
        }

        if (props.familyMemberHistory && props.familyMemberHistory.sex && props.familyMemberHistory.sex.coding) {
            setSex(props.familyMemberHistory.sex.coding[0]);
        } else {
            setSex(null);
        }
    }, [props]);
    

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="FamilyMemberHistoryEditDialog_ModalBody w-full">
                    <div className="mb-4">
                    
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" placeholder="Name" className="border-2 my-2 p-2 w-full" 
                            value={name} onChange={(e) => setName(e.target.value)} 
                        />
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Relationship</label>
                        <CodingSelector 
                            codes={Object.keys(PlasmaFHIR.FamilyMemberHistory_Relationship).map((key) => (PlasmaFHIR.FamilyMemberHistory_Relationship as any)[key])} 
                            selectedCode={relationship}
                            onChange={(code: PlasmaFHIR.Coding) => setRelationship(code)} 
                        />
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Sex</label>
                        <CodingSelector 
                            codes={Object.keys(PlasmaFHIR.AdministrativeGender).map((key) => (PlasmaFHIR.AdministrativeGender as any)[key])} 
                            selectedCode={sex}
                            onChange={(code: PlasmaFHIR.Coding) => setSex(code)} 
                        />
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Deceased?</label>
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Death Age</label>
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">Note</label>
                        <textarea rows={5} placeholder="Note" className="border-2 my-2 p-2 w-full" 
                            value={note} onChange={(e) => setNote(e.target.value)} 
                        />
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Mother</label>
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Father</label>
                        <div className="pb-2" />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Conditions</label>
                        <div className="pb-2" />

                    </div>
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onCancelClick}>Cancel</Button>
                <Button variant="primary" onClick={props.onSaveClick}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}