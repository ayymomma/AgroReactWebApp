import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import HomePage from "./components/HomePage"
import Person from "./components/Person"

function App() {
  const token = localStorage.getItem("token");

  if(!token) return <Login />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" />
        <Route path="/persons" element={<Person/>} />
        <Route path="/contracts" />
        <Route path="/fields" />
      </Routes>
    </BrowserRouter>
  )
}

export default App