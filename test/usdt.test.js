const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;
const fs = require("fs");
const path = require("path");
const network = hre.hardhatArguments.network;

describe("USDT: ", function () {
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.deployedusdt;

    const contractAddresses = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../config.json"), "utf8")
    );
   
    if (hre.network.name != "hardhat") {
      this.deployedusdt = await hre.ethers.getContractAt(
        "USDT",
        contractAddresses[network].USDT,
        account1
      );
    } else {
      const USDT = await ethers.getContractFactory("USDT");
      this.deployedusdt = await USDT.deploy();
      await this.deployedusdt.deployed();
  
  
    }

  });

  it("Should mint the new tokens", async function () {
    await this.deployedusdt.mint(
      account1.address,
      ethers.utils.parseUnits("10000", 18))
  });
});
