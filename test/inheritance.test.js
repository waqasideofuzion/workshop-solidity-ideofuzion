const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;

describe.only("Inheritance: ", function () {
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.EthersProvider = new ethers.providers.Web3Provider(network.provider);
  });

  it("Test 1", async function () {});

  it("Test 2", async function () {});
});
