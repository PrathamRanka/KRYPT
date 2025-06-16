import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const getEthereum = () => window.ethereum;

const createEthereumContract = async () => {
  const ethereum = getEthereum();
  if (!ethereum) throw new Error("Ethereum object not found");

  const provider = new BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  return new Contract(contractAddress, contractABI, signer);
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      const ethereum = getEthereum();
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const availableTransactions = await transactionsContract.getAllTransactions();

        const structured = availableTransactions.map((tx) => ({
          addressTo: tx.receiver,
          addressFrom: tx.sender,
          timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
          message: tx.message,
          keyword: tx.keyword,
          amount: Number(tx.amount) / 1e18,
        }));

        setTransactions(structured);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      const ethereum = getEthereum();
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        await getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (err) {
      console.error("Error checking wallet:", err);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      const ethereum = getEthereum();
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const count = await transactionsContract.getTransactionCount();
        localStorage.setItem("transactionCount", count.toString());
        setTransactionCount(count.toString());
      }
    } catch (err) {
      console.error("Error checking transactions:", err);
    }
  };

  const connectWallet = async () => {
    try {
      const ethereum = getEthereum();
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        await getAllTransactions();
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const sendTransaction = async () => {
    try {
      const ethereum = getEthereum();
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = await createEthereumContract();
      const parsedAmount = parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208",
          value: '0x' + parsedAmount.toString(16),  // ✅ Convert BigInt to hex string,
        }]
      });

      const tx = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      setIsLoading(true);
      console.log(`Loading - ${tx.hash}`);
      await tx.wait();
      console.log(`Success - ${tx.hash}`);
      setIsLoading(false);

      const count = await transactionsContract.getTransactionCount();
      setTransactionCount(count.toString());
      await getAllTransactions();
    } catch (err) {
      console.error("Error sending transaction:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, []);

  return (
    <TransactionContext.Provider value={{
      transactionCount,
      connectWallet,
      transactions,
      currentAccount,
      isLoading,
      sendTransaction,
      handleChange,
      formData,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
