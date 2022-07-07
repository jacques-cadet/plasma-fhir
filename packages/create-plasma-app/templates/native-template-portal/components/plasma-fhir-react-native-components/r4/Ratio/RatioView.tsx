import { View, Text, StyleSheet } from "react-native";
import { Ratio } from "fhir/r4";
import { Resources } from "plasma-fhir-app-utils";

export interface IRatioViewProps { ratio?: Ratio }
export default function RatioView(props: IRatioViewProps) {
    // Check if data is available...
    if (!props.ratio) { return <View />; }

    const display = Resources.Ratio.toString(props.ratio);
    return <Text style={styles.RatioView_container}>{display}</Text>;
}

const styles = StyleSheet.create({
    RatioView_container: { }
})