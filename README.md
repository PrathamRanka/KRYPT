
# Krypt DeFi

[KRYPT-DEFI](https://krypt-defi.vercel.app/)  
License: MIT

## 🚀 Overview

**Krypt DeFi** is a decentralized finance web application that enables users to send cryptocurrency seamlessly using smart contracts. The platform offers a modern and responsive frontend built with React and Vite, and smart contracts written in Solidity deployed via Hardhat.

---

## 🌟 Features

- ⚡ **Fast & modern UI** — React + Vite powered frontend with Tailwind CSS for styling.
- 🔐 **Blockchain transactions** — Send and receive crypto securely using Ethereum-compatible smart contracts.
- 💼 **MetaMask integration** — Connect your wallet to interact with the blockchain.
- 📝 **Hardhat powered smart contracts** — Easy to compile, test, and deploy.
- 📱 **Mobile-friendly design** — Fully responsive across devices.

---

## 🗂️ Project Structure

```
KRYPT-main/
├── client/
│ ├── src/
│ │ ├── components/ # Footer, Loader, Navbar, Services, Transactions, Welcome, etc.
│ │ ├── utils/Transactions.json # ABI for interacting with the deployed smart contract
│ │ ├── App.jsx, main.jsx # Main React app files
│ │ ├── App.css, index.css # Styling files
│ ├── images/ # Static images, logos, SVGs
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite config
│
├── smart_contract/
│ ├── contracts/
│ │ └── Transactions.sol # Solidity smart contract
│ ├── scripts/
│ │ └── deploy.js # Deployment script
│ ├── test/ # Contract test files
│ ├── hardhat.config.js # Hardhat config
│ ├── package.json # Contract dependencies
│
├── README.md
 ```

 ## ⚙️ Getting Started

### Frontend Setup

```bash
cd client
npm install
npm run dev 
```
### Smart Contract Setup
```
cd smart_contract
npm install
```

### Compile smart contracts
```npx hardhat compile```

### Run tests
```npx hardhat test```

### Deploy (replace <network> with e.g. goerli, sepolia)
```npx hardhat run scripts/deploy.js --network <network>```

### Deployment
```Frontend: Deployed on Vercel → https://krypt-defi.vercel.app/```


### Smart Contracts: Deployed using Hardhat on your preferred Ethereum testnet or mainnet.

### 📄 License
This project is licensed under the MIT License.
Feel free to use and modify!

### Acknowledgments
```React

Vite

Hardhat

Ethers.js

Tailwind CSS

Vercel
```