import { useState } from 'react'
import './App.css'
import { Footer, Loader, Navbar, Services, Transactions, Welcome } from './components'
import React from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className = "min-h-screen">
          <div className="gradient-bg-welcome">
            <Navbar />
            <Welcome />
          </div> 
          <Services />
          <Transactions />
          <Footer /> 
        </div>
    </>
  )
}

export default App
