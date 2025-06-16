import React from 'react';
import './App.css';
import { Footer, Loader, Navbar, Services, Transactions, Welcome } from './components';
import { TransactionsProvider } from './context/TransactionContext';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <TransactionsProvider>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
      </div>
      <Analytics /> {/* ✅ Add analytics tracking */}
    </TransactionsProvider>
  );
}

export default App;
