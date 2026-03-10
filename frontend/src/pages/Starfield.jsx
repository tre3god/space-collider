import { useLocation } from "react-router-dom";
import Stars from "../components/SimulationStars";

export default function StarFieldGame() {
  const location = useLocation();

  // stars passed from SetupPage
  const starNames = location.state?.stars || [];

  return (
    <div
      style={{
        background: "black",
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Pass star names and count to simulation */}
      <Stars count={starNames.length} starNames={starNames} />

      <div>
        <h3
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: 20,
            position: "absolute",
            width: "100%"
          }}
        >
          Starfield Game
        </h3>
      </div>
    </div>
  );
}