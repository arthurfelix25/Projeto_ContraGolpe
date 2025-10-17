import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Home from "./components/Home.jsx"
import Info from "./components/Info.jsx"
import Register from "./components/Register.jsx"
import Compaines from "./components/Compaines.jsx"

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/register" element={<Register />} />
      <Route path="/empresas" element={<Compaines />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
