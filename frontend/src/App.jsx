import { BrowserRouter, Routes, Route } from "react-router-dom"
import SetupPage from "./pages/SetupPage"
import Starfield from "./pages/Starfield"
import StarFieldSimulation from "./pages/StarfieldSimulation"

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<SetupPage />} />

        <Route path="/starfield" element={<Starfield />} />
        <Route path="/starfieldsimulation" element={<StarFieldSimulation />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App