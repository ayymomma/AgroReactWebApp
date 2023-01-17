import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import HomePage from "./components/HomePage"
import Person from "./components/Person"
import DashBoard from "./components/DashBoard"
import Contracts from "./components/Contracts"
import Fields from "./components/Fields"

function App() {
  const token = localStorage.getItem("token");

  if(!token) return <Login />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/persons" element={<Person/>} />
        <Route path="/contracts" element={<Contracts/>} />
        <Route path="/fields" element={<Fields/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App