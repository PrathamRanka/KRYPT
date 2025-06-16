import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TransactionContext } from './context/TransactionContext.jsx'
createRoot(document.getElementById('root')).render(
  <TransactionContext.Provider>
    <StrictMode>    
      <App />   
  </StrictMode>
   </TransactionContext.Provider>,
)
