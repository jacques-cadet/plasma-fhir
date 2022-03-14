import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { FHIRClientContextWrapper } from "./plasma-fhir/FHIRClient";
import { Navbar } from "./components";
import { TestScreen, LandingScreen, LaunchScreen } from "./screens";
import './App.scss';

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
    <div>
      <BrowserRouter>
        <Routes>
          
          {/* Patient-Facing App with Landing Page */}
          <Route element={<WithoutNavbar />}>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/launch" element={<LaunchScreen />} />
          </Route>

          {/* Pages */}
          <Route element={<WithNavbar />}>
            <Route path="/app" element={<FHIRClientContextWrapper><TestScreen /></FHIRClientContextWrapper>} />
            <Route path="/test" element={<FHIRClientContextWrapper><TestScreen /></FHIRClientContextWrapper>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}
