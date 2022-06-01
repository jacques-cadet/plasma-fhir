import React from "react";
import { View, Text } from "react-native";
import { Link } from "@react-navigation/native";
import IEndpoint from "./IEndpoint";

export interface IEndPointListItemProps { 
    endpoint: IEndpoint; 
    authParams: any; 
}

export default function EndPointListItem(props: IEndPointListItemProps) {
    const params = { authParams: { ...props.authParams, iss: props.endpoint.address } };

    return (
        <Link to={{ screen: "Launch", params: params }}>
            <View>
                <Text>{props.endpoint.name}</Text>
                <Text>{props.endpoint.address}</Text>
            </View>
        </Link>
    )
}