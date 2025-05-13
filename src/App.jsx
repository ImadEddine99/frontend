import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import FuelRoute from './pages/fuel_route';

import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{position: 'fixed',
    top: 0,
    left: 0,
    right: 0,bottom:0,paddingTop:'4rem'}}> {/* Add padding-top to account for fixed navbar */}
        <Routes>
  <Route path="/routefuel_front/" element={<Home />}>
    <Route path="/routefuel_front/fuel-route" element={<FuelRoute />} />
  </Route>
</Routes>
      </div>
    </Router>
  );
}

export default App;
