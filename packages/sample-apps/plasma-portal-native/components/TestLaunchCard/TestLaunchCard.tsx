import React from "react";
import { View, Text } from "react-native";
import { Link } from "@react-navigation/native";

export interface ITestLaunchCardProps {
    authParams_epicSandbox1: any;
    authParams_epicSandbox2: any;
    authParams_smartOnFhir: any;
    authParams_ssmDSTU2: any;
    authParams_ssmR4: any;
    authParams_cerner: any;
}

/** Just for convenience. Let's you quickly launch to several platforms */
export default function TestingLaunchCard(props: ITestLaunchCardProps) {
    return (
        <View style={{ flex: 1 }}>
            <View>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Testing</h5>
                </a>

                <Text>
                    Here are some test environments to try out:
                </Text>
                
                <View>
                
                    <Link to={{ screen: "Launch", params: { authParams: props.authParams_epicSandbox1 } }}>
                        <Text>
                            Launch Epic Sandbox (1)
                        </Text>
                        <Text>fhircamila / epicepic1</Text>
                    </Link>
                </View>

                <View>
                    <Link to={{ screen: "Launch", params: { authParams: props.authParams_epicSandbox2 } }}>
                        <Text>
                            Launch Epic Sandbox (2)
                        </Text>
                        <Text>fhirjason / epicepic1</Text>
                    </Link>
                </View>

                <View>
                    <Link to={{ screen: "Launch", params: { authParams: props.authParams_smartOnFhir } }}>
                        <Text>
                            Launch SMART-on-FHIR Sandbox
                        </Text>
                        <Text>Gerardo Botello</Text>
                    </Link>
                </View>

                <View>
                    <Link to={{ screen: "Launch", params: { authParams: props.authParams_ssmDSTU2 } }}>
                        <Text>
                            Launch SSM Health (in Madison) [DSTU2]
                        </Text>
                    </Link>
                </View>

                <View>
                    <Link to={{ screen: "Launch", params: { authParams: props.authParams_ssmR4 } }}>
                        <Text>
                            Launch SSM Health (in Madison) [R4]
                        </Text>
                    </Link>
                </View>

                <View>
                    <Link to={{ screen: "Launch", params: { authParams: props.authParams_cerner } }}>
                        <Text>
                            Launch Cerner Sandbox [R4]
                        </Text>
                        <Text>(Not currently working)</Text>
                        <Text>Logins: https://docs.google.com/document/d/10RnVyF1etl_17pyCyK96tyhUWRbrTyEcqpwzW-Z-Ybs/edit#</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}