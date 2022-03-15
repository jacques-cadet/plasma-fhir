import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FHIRClientContextWrapper } from "./plasma-fhir/FHIRClient";
import { Footer } from "./components";
import { TestScreen, LandingScreen, LaunchScreen } from "./screens";

export default function App() {
  return (
    <div className="App flex flex-col h-screen">
      <div className="mb-auto">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LandingScreen />} />
          <Route path="/launch" element={<LaunchScreen />} />
          <Route path="/app" element={<FHIRClientContextWrapper><TestScreen /></FHIRClientContextWrapper>} />

        </Routes>
      </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}
