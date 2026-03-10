import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function StarSetup() {
  const [stars, setStars] = useState([])
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const addStar = () => {
    if (!name.trim()) return
    setStars([...stars, { name }])
    setName("")
  }

  const startGame = () => {
    navigate("/starfield", { state: { stars } })
  }

  const startSimulation = () => {
    navigate("/starfieldsimulation", { state: { stars } })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Star Setup</h2>

      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Star name"
        />

        <button onClick={addStar}>+ Add Star</button>
      </div>

      <ul>
        {stars.map((s, i) => (
          <li key={i}>⭐ {s.name}</li>
        ))}
      </ul>

      <button
        disabled={stars.length === 0}
        onClick={startGame}
      >
        Start Game
      </button>

      <button
        onClick={startSimulation}
      >
        Start Simulation
      </button>
    </div>
  )
}