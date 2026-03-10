import { useEffect, useState } from "react";
import Stars from "../components/SimulationStars";
import { getStars, addStar, removeStar } from "../services/api";

export default function StarFieldSimulation() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadStars();
  }, []);

  const loadStars = async () => {
    const data = await getStars();
    setCount(data.count);
  };

  const handleAdd = async () => {
    const data = await addStar();
    setCount(data.count);
  };

  const handleRemove = async () => {
    const data = await removeStar();
    setCount(data.count);
  };

  return (
    <div
      style={{
        background: "black",
        height: "100vh",
        width: "100vw", // Make sure stars can be positioned across full width
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Stars count={count || 0} />

      <div>
        <h3 style={{ color: "white", textAlign: "center", paddingTop: 20 }}>
          Starfield Simulation
        </h3>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <button onClick={handleAdd}>+</button>
        <button onClick={handleRemove}>-</button>
      </div>
    </div>
  );
}