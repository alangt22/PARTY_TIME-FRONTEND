import { Outlet } from 'react-router-dom'

//components
import Navbar from './components/Navbar'

import {ToastContainer} from "react-toastify"
// styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  
  return (
    <div className="App">
        <ToastContainer/>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default App
