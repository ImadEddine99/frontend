// export default function Home() {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-3xl font-semibold">Welcome to Trip Planner</h2>
//         <p className="text-gray-600 mt-2">Plan your trip with ease.</p>
//       </div>
//     );
//   }
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// Home Page
export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-3xl font-bold">Welcome to fuel station locator</h1>
            <p>Find the most affordable fuel station in your path </p>
            <Button variant="contained" color="#646cff" style={{backgroundColor: "#646cff"}}  onClick={() => navigate('/fuel-route')}>
                Locate fuel stations
            </Button>
        </div>
    );
}