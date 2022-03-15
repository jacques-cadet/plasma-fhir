import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { FHIRClientContextWrapper } from "./plasma-fhir/FHIRClient";
import { Navbar, Footer } from "./components";
import { TestScreen, LandingScreen, LaunchScreen } from "./screens";
import { PatientScreen, EncountersScreen, AllergiesScreen, FamilyHistoryScreen, ConditionsScreen, ImmunizationsScreen, LabsScreen, VitalsScreen } from "./screens";
import './App.scss';
import { routerBasename } from "./config/config";

// This component will add a layout and then output the routes
function WithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// This component will output the routes with no navbar
function WithoutNavbar() {
  return (
    <Outlet />
  );
}

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="mb-auto">
        <BrowserRouter basename={routerBasename}>
          <Routes>
            
            {/* Patient-Facing App with Landing Page */}
            <Route element={<WithoutNavbar />}>
              <Route path="/" element={<LandingScreen />} />
              <Route path="/launch" element={<LaunchScreen />} />
            </Route>

            {/* Pages */}
            <Route element={<WithNavbar />}>
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
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}
