import { View, Text, StyleSheet } from "react-native";
import { Period } from "fhir/r4";
import { Resources } from "plasma-fhir-app-utils";

export interface IPeriodViewProps { period?: Period }
export default function PeriodView(props: IPeriodViewProps) {
    // Check if data is available...
    if (!props.period) { return <View />; }

    const display = Resources.Period.toString(props.period);
    return <Text style={styles.PeriodView_container}>{display}</Text>;
}

const styles = StyleSheet.create({
    PeriodView_container: { }
});