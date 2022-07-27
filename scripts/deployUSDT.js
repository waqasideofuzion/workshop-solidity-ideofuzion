const hre = require("hardhat");
const network = hre.hardhatArguments.network;
const { updateContractAddresses } = require('../utils/contractsManagement');

async function main() {
  const USDTFactory = await hre.ethers.getContractFactory("USDT");
  console.log("Deploying USDT Contract");
  const deployedUSDT = await USDTFactory.deploy();

  await deployedUSDT.deployed();


  updateContractAddresses(
    {
      USDT: deployedUSDT.address
    },
    network,
  );

  if (hre.network.name != "hardhat") {
    
    console.log("Verifying........")
    // wait for half minute so that the contract should be propagated properly on blockchain
    await new Promise(resolve => setTimeout(resolve, 30000));

    await hre.run("verify:verify", {
      address: deployedUSDT.address,
      constructorArguments: [],
    });
  }

  console.log("Contract deployed to:", deployedUSDT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
