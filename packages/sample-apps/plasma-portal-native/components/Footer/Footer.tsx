import React from "react";
import { View, Text } from "react-native";

function Footer() {
    return (
        <View>
            <View>
                {/*<img src={require("./../../assets/img/logo.jpg")} className="rounded-md" style={{ maxHeight: "25px" }} alt="PlasmaFHIR" />*/}
                <Text>Powered by</Text>
                {/*<a href="https://plasmafhir.com" target="_blank" style={{ textDecoration: "underline", color: "blue" }}>Plasma</a>*/}
            </View>
        </View>
    );
}

export default Footer;