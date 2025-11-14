import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AddNote from "./pages/AddNote"
import { Toaster } from "react-hot-toast"

function App() {
   return (
    <>                            
    <BrowserRouter>
      <Navbar />
      <Toaster position="bottom-right" reverseOrder={false}/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddNote />} />
      </Routes>
    </BrowserRouter>
    </>
   )
}

export default App
