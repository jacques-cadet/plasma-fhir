import React from "react";
import { Footer, Text, Anchor, Group, Center } from "@mantine/core";

function AppFooter() {
    return (
        <Footer height={60} p="md">
            <Group position="apart">
                <Center>
                    <img src={require("./../../assets/img/logo.jpg")} style={{ maxHeight: "25px", borderRadius: "5px", display: "inline" }} alt="logo" />
                    <Text style={{ display: "inline", paddingLeft: "10px" }}>Powered by
                        <Anchor href="https://plasmafhir.com" target="_blank"> Plasma</Anchor>
                    </Text>
                </Center>
                <Text>© 2022</Text>
            </Group>
        </Footer>
    );
}

export default AppFooter;