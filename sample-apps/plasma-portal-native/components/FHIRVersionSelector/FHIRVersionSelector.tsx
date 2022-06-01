import React from "react";
import { View, Text, Switch } from "react-native";

export interface IFHIRVersionSelectorProps { 
    version: "r4" | "dstu2"; 
    onVersionChange: (version: "r4" | "dstu2") => void; 
}

/** Lets you toggle between "r4" and "dstu2" */
export default function FHIRVersionSelector(props: IFHIRVersionSelectorProps) {
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View>
                    <Switch value={props.version === "r4"} 
                        onValueChange={() => props.onVersionChange((props.version === "r4") ? "dstu2" : "r4")}
                    />
                    <Text>
                        R4
                    </Text>
                </View>

                <View>
                    <Switch value={props.version === "dstu2"} 
                        onValueChange={() => props.onVersionChange((props.version === "r4") ? "dstu2" : "r4")}
                    />
                    <Text>
                        DSTU2
                    </Text>
                </View>
                
            </View>
        </View>
    );
}