import React from 'react';
import { Link } from "react-router-dom";
import { MediaQuery, Button, Group, Text, Burger, Image, Header as MantineHeader, Center } from "@mantine/core";

interface IAppHeaderProps {
    opened: boolean;
    theme: any;
    colorScheme: string;
    setOpened: (opened: any) => void;
    toggleColorScheme: () => void;
}
export default function AppHeader(props: IAppHeaderProps) {
    return (
        <MantineHeader height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={props.opened}
                  onClick={() => props.setOpened((o: any) => !o)}
                  size="sm"
                  color={props.theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Group sx={{ height: '100%', width: "100%" }} px={20} position="apart">

                <Group>
                    <Link to="/" style={{ display: "flex" }}>
                        <img src={require("./../../assets/img/logo.jpg")} style={{ maxHeight: "40px", borderRadius: "10px" }} alt="logo" />
                        <Center>
                          <Text size="xl" style={{ paddingLeft: "10px" }}>Plasma Portal</Text>
                        </Center>
                    </Link>
                </Group>

                <Button variant="light" color="gray" onClick={() => props.toggleColorScheme()}>
                    {props.colorScheme === 'dark' ? <Text size="xl">☀️</Text> : <Text size="xl">🌙</Text>}
                </Button>                
              </Group>
            </div>
          </MantineHeader>
    );
}
