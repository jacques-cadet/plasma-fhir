import { View, Text } from "react-native";
import { Patient } from "fhir/r4";
import { HumanNameView } from "../HumanName/HumanNameView";
import { AddressView } from "../Address/AddressView";
import SexAgeDOB from "./SexAgeDOB";
import { PlasmaThemeContext } from "../../theme";
import { Resources } from "plasma-fhir-app-utils";

export interface IPatientHeaderProps { patient?: Patient };
export default function PatientHeader(props: IPatientHeaderProps) {
    // Check if data is available...
    if (!props.patient) { return <View />; }
    if (!props.patient.name) { return <View />; }

    const patientId = props.patient.id || "";
    const officialName = Resources.Patient.getOfficialName(props.patient);
    const homeAddress = Resources.Patient.getHomeAddress(props.patient);

    return (
        <PlasmaThemeContext.Consumer>
            {(theme) => (
                <View style={theme.theme.PatientHeader_container}>
                    <View>
                        <HumanNameView humanName={officialName} />

                        <View style={theme.theme.PatientHeader_sexAgeDOB}>
                            <SexAgeDOB patient={props.patient} />
                        </View>

                        <View style={theme.theme.PatientHeader_patientId}>
                            <View>
                                <Text style={theme.theme.PatientHeader_patientIdText}>{patientId}</Text>
                            </View>
                        </View>

                        <View style={theme.theme.PatientHeader_address}>
                            <Text style={theme.theme.PatientHeader_addressText}>Address</Text>
                        </View>
                        <AddressView address={homeAddress} />
                    </View>
                </View>
            )}
        </PlasmaThemeContext.Consumer>
    );
}