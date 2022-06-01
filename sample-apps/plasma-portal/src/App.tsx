import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import { AppShell, ColorScheme, ColorSchemeProvider, useMantineTheme, MantineProvider, MantineTheme } from '@mantine/core';
import { FHIRClientContextWrapper } from "plasma-fhir-react-client-context";
import { AppHeader, AppFooter, Navbar as AppNavbar } from "./components";
import { TestScreen, LandingScreen, LaunchScreen } from "./screens";
import { PatientScreen, EncountersScreen, AllergiesScreen, FamilyHistoryScreen, ConditionsScreen, ImmunizationsScreen, LabsScreen, VitalsScreen } from "./screens";
import './App.scss';
import { routerBasename } from "./config/config";

interface IWithNavbarProps {
  opened: boolean;
  setOpened: (opened: any) => void;
  theme: MantineTheme;
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

// This component will add a layout and then output the routes
function WithNavbar(props: IWithNavbarProps) {
  return (
    <>
      <AppShell navbarOffsetBreakpoint="sm" fixed
          navbar={<AppNavbar opened={props.opened} />}
          footer={<AppFooter />}
          header={<AppHeader opened={props.opened} setOpened={props.setOpened} 
            theme={props.theme} colorScheme={props.colorScheme} toggleColorScheme={props.toggleColorScheme} />}
      >
        <Outlet />
      </AppShell>
    </>
  );
}

// This component will output the routes with no navbar
function WithoutNavbar() {
  return (
    <>
    <Outlet />
    <AppFooter />
    </>
  );
}

export default function App() {

  // Theming and navbar...
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
        <BrowserRouter basename={routerBasename}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <NotificationsProvider>
              <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        
                <Routes>
                  
                  {/* Patient-Facing App with Landing Page */}
                  <Route element={<WithoutNavbar />}>
                    <Route path="/" element={<LandingScreen />} />
                    <Route path="/launch" element={<LaunchScreen />} />
                  </Route>

                  {/* Pages */}
                  <Route element={<WithNavbar opened={opened} setOpened={setOpened} theme={theme} colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />}>
                    <Route path="/app" element={<FHIRClientContextWrapper><TestScreen /></FHIRClientContextWrapper>} />
                    <Route path="/patient" element={<FHIRClientContextWrapper><PatientScreen /></FHIRClientContextWrapper>} />
                    <Route path="/encounters" element={<FHIRClientContextWrapper><EncountersScreen /></FHIRClientContextWrapper>} />
                    <Route path="/allergies" element={<FHIRClientContextWrapper><AllergiesScreen /></FHIRClientContextWrapper>} />
                    <Route path="/familyHistory" element={<FHIRClientContextWrapper><FamilyHistoryScreen /></FHIRClientContextWrapper>} />
                    <Route path="/conditions" element={<FHIRClientContextWrapper><ConditionsScreen /></FHIRClientContextWrapper>} />
                    <Route path="/immunizations" element={<FHIRClientContextWrapper><ImmunizationsScreen /></FHIRClientContextWrapper>} />
                    <Route path="/labs" element={<FHIRClientContextWrapper><LabsScreen /></FHIRClientContextWrapper>} />
                    <Route path="/vitals" element={<FHIRClientContextWrapper><VitalsScreen /></FHIRClientContextWrapper>} />
                    <Route path="/test" element={<FHIRClientContextWrapper><TestScreen /></FHIRClientContextWrapper>} />
                  </Route>

                </Routes>

              </MantineProvider>
            </NotificationsProvider>
          </ColorSchemeProvider>
        </BrowserRouter>
  );
}
