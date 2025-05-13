import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Backdrop, CircularProgress, Grid, Paper, Link as MaterialLink } from "@mui/material";
import { useEffect, useState } from "react";
import MapView from "../component/map";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";

export default function FuelRoute() {
  const [formData, setFormData] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [fuelStops, setFuelStops] = useState([]);
  const [totalFuelCost, setTotalFuelCost] = useState(null);
  const [distance, setDistance] = useState(null);

  const getData = async ({ start, end }) => {
    setLoading(true);
    console.log(import.meta.env.VITE_API_LINK);
    try {
      const params = new URLSearchParams({ start, end });

      const url = `${import.meta.env.VITE_API_LINK}api/fuel-route/?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;


      const resp = await fetch(url);
  
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
  
      const data = await resp.json();
  
      if (data) {
        const stops=[];
        setRouteCoords(data.route.geojson.coordinates.map(([lon, lat]) => [lat, lon]));
        console.log(routeCoords);
        for(var i=0;i<data.fuel_stops.length;i++)
        {
          var a={location:data.fuel_stops[i].location,
            name:data.fuel_stops[i].name,
            address:data.fuel_stops[i].address,
            price:data.fuel_stops[i].price,
          }
          console.log(a);
          console.log(data.fuel_stops.length);
          stops.push(a);

        }
        setFuelStops(stops);
        setTotalFuelCost(data.total_fuel_cost ?? 0);
        setDistance(data.route.distance??0)
        toast.success("Route fetched successfully!");
        setLoading(false);
      } else {
        toast.error("Route or fuel stops not found.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      toast.error("Error fetching route data.");
      setLoading(false);
  };
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.start || !formData.end) {
      toast.error("Please fill in both fields.");
      return;
    }
    getData(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ height: "100%", width: "100%", overflowY: "auto" }}>
      <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <div style={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          <div style={{ fontWeight: "bold", fontSize: "1.125rem", marginTop: 10 }}>Calculating ...</div>
        </div>
      </Backdrop>

      <Box sx={{ mb: 4 }}>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <MaterialLink
            color="textPrimary"
            component="a"
            sx={{
              alignItems: "center",
              display: "flex",
              mt: 2,
            }}
          >
            <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="subtitle2">Home</Typography>
          </MaterialLink>
        </Link>
      </Box>

      <Box sx={{ maxWidth: "600px", margin: "50px auto", padding: "30px", borderRadius: "12px" }}>
        <Typography variant="h5" gutterBottom>
          Locate fuel stations on your route
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextField label="Starting Location" name="start" variant="outlined" value={formData.start} onChange={handleChange} required />
          <TextField label="Destination" name="end" variant="outlined" value={formData.end} onChange={handleChange} required />
          <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: "#646cff", color: "#fff" }}>
            Submit
          </Button>
        </form>
      </Box>

      <div style={{ padding: "0 5%", fontFamily: "Arial, sans-serif" }}>
        {routeCoords!=[] && (
          <>
            {totalFuelCost && (
  <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
    <div>
      <Typography variant="h6">Total fuel cost: {totalFuelCost}$</Typography>
    </div>
    <div>
      <Typography variant="h6">Distance: {distance} miles</Typography>
    </div>
  </div>
)}

            <MapView routeCoords={routeCoords}  stopsCoords={fuelStops}/>
          </>
        )}
      </div>
    </div>
  );
}
