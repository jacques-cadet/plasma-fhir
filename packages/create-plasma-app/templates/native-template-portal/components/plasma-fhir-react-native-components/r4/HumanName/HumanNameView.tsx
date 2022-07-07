import { View, Text, StyleSheet } from "react-native";
import { HumanName } from 'fhir/r4';
import { Resources } from "plasma-fhir-app-utils";

export interface IHumanNameViewProps { humanName?: HumanName };
export function HumanNameView(props: IHumanNameViewProps) {
    // Check if data is available...
    if (!props.humanName) { return <View />; }

    return (
        <View style={styles.HumanNameView_container}>
            <Text style={styles.HumanNameView_formattedName}>{formatName(props.humanName)}</Text>
        </View>
    );
}

function formatName(name?: HumanName): string {
    // Check if name exists...
    if (!name) { return "Unknown"; }
    return Resources.HumanName.toString(name);
}

const styles = StyleSheet.create({
    HumanNameView_container: { },
    HumanNameView_formattedName: { }
});

export default HumanNameView;