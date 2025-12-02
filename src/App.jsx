import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Home from "./components/Home.jsx"
import Info from "./components/Info.jsx"
import Register from "./components/Register.jsx"
import Compaines from "./components/Compaines.jsx"
import EmpresaDashboard from "./components/EmpresaDashboard.jsx"
import RegisterCompaines from "./components/RegisterCompaines.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/register" element={<Register />} />
            <Route path="/empresas" element={<Compaines />} />
            <Route path="/rempresas" element={<RegisterCompaines />} />
            <Route path="/empresa" element={<EmpresaDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
