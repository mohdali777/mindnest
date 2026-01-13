import Mainlayout from "./Component/layout/mainlayout"
import Login from "./Pages/Auth/login"
import Signup from "./Pages/Auth/signup"
import Home from "./Pages/home"
import AppMain from "./Pages/Test"
import { Route, Routes } from "react-router-dom"
import Private from "./Routes/private"
import Public from "./Routes/public"
import MentalWellnessTips from "./Pages/Tips/Tips"
import AIChatSupport from "./Pages/Ai/Chat"
import MoodJournal from "./Pages/journal/journal"
import JournalLayout from "./Component/layout/Journal"
import Create from "./Pages/journal/Create"
import View from "./Pages/journal/View"
import UpdateJournal from "./Pages/journal/Update"
import MentalHealthMiniGames from "./Pages/Games/games"

function App() {
  return (
    <>
    <Routes>

  <Route element={<Public/>}>
    <Route path="/auth/login" element={<Login/>}/>
    <Route path="/auth/sign-up" element={<Signup/>}/>
  </Route>

  <Route element={<Private/>}>
    <Route path="/" element={<Mainlayout/>}>
    <Route index  element={<Home/>}/>
    <Route path="/tips" element={<MentalWellnessTips/>}/>
    <Route path="/chatbot" element={<AIChatSupport/>}/>
    <Route path="/chatbot/:section_id" element={<AIChatSupport/>}/>
     <Route path="/games" element={<MentalHealthMiniGames/>}/>
    <Route path="/journal" element={<JournalLayout/>}>
    <Route index  element={<View/>}/>
    <Route path="create" element={<Create/>}/>
    <Route path="update/:id" element={<UpdateJournal/>}/>
    </Route>
    </Route>
  </Route>

      
    </Routes>
    </>
  )
}

export default App
