const { ethers } = require("hardhat");

const main = async () => {
  const transactionsFactory = await ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();

  console.log("Transactions address: ", transactionsContract.target); // use .target for ethers v6
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
