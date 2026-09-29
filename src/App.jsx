import { useState } from 'react'

import './App.css'
import AppNavBar from "./components/AppNavBar";
import OrchidList from "./components/OrchidList.jsx";
import Footer from "./components/Footer.jsx";
function App() {


  return (
    <>
      <AppNavBar/>
        <main>
            <OrchidList/>
        </main>
        <Footer/>
    </>
  )
}

export default App
