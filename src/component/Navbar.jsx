"use client";

import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FuelRoute from '../pages/fuel_route';

export default function Navbar() {
  // const navItems = [
    // { name: "Home", href: "/" },
    // { name: "Plan Trip", href: "/plan" },
    // { name: "Route Map", href: "/map" },
    // { name: "Log Sheets", href: "/logs" },
  // ];

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    width: '100%',
    border: '1px solid blue',
    backgroundColor: 'hsla(0, 0%, 100%, 0.95)',
    backdropFilter: 'blur(20px)',
  };

  const containerStyle = {
    display: 'flex',
    height: '4rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: '0 1rem',
    maxWidth: '100%',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const linkStyle = {
    fontWeight: 500,
    transition: 'color 0.2s',
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Fuel station locator</span>
        </Link>

      </div>
    </header>
  );
}
