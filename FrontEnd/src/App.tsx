import Login from "./Pages/Auth/login"
import Signup from "./Pages/Auth/signup"
import AppMain from "./Pages/Test"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <Routes>
      <Route path="/auth/login" element={<Login/>}/>
      <Route path="/auth/sign-up" element={<Signup/>}/>
      <Route path="/" element={<AppMain/>}/>
    </Routes>
    </>
  )
}

export default App
