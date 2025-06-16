import { useState } from 'react'
import './App.css'
import { Footer, Loader, Navbar, Services, Transactions, Welcome } from './components'
import React from 'react'
import { TransactionsProvider } from './context/TransactionContext'  // ✅ import provider

function App() {
  const [count, setCount] = useState(0)

  return (
    <TransactionsProvider>  {/* ✅ wrap your app with provider */}
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div> 
        <Services />
        <Transactions />
        <Footer /> 
      </div>
    </TransactionsProvider>
  )
}

export default App
