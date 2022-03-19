import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FHIRr4 } from "plasma-fhir-react-components";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

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
            <input type="text" placeholder="Name" className="border-2 border-black my-2 p-2" 
                value={name} onChange={(e) => setName(e.target.value)} 
            /><br /><br />
            
            <FHIRr4.CodingSelector 
                codes={Object.keys(PlasmaFHIR.FamilyMemberHistory_Relationship).map((key) => (PlasmaFHIR.FamilyMemberHistory_Relationship as any)[key])} 
                selectedCode={relationship}
                onChange={(code: PlasmaFHIR.Coding) => setRelationship(code)} 
            /><br /><br />

            <FHIRr4.CodingSelector 
                codes={Object.keys(PlasmaFHIR.AdministrativeGender).map((key) => (PlasmaFHIR.AdministrativeGender as any)[key])} 
                selectedCode={sex}
                onChange={(code: PlasmaFHIR.Coding) => setSex(code)} 
            /><br /><br />

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onCancelClick}>Cancel</Button>
                <Button variant="primary" onClick={props.onSaveClick}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}