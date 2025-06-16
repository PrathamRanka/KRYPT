//https://eth-sepolia.g.alchemy.com/v2/P4uQIT3nNqF_kUM1iKg-qLhSPpVmGu9C

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/P4uQIT3nNqF_kUM1iKg-qLhSPpVmGu9C",
      accounts: ["82c522551ba255a9b865ee6383b8460d06c3af10aed09048f8ef56ee3252da24"]
    }
  }
};
