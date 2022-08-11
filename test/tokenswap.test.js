const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;

describe("Token Swap Contract: ", function () {
  beforeEach("deploy", async function () {
    [account1, account2, account3] = await ethers.getSigners();

    this.EthersProvider = new ethers.providers.Web3Provider(network.provider);

    this.token1;
    this.token2;
    this.swapContract;

    const TokenFactory = await ethers.getContractFactory(
      "MyToken"
    );

    const TokenSwapFactory = await ethers.getContractFactory(
        "TokenSwap"
      );

    this.token1 = await TokenFactory.deploy("TOKENA", "TOKENA");
    await this.token1.deployed();

    this.token2 = await TokenFactory.deploy("TOKENB", "TOKENB");
    await this.token2.deployed();

    this.swapContract = await TokenSwapFactory.deploy(
        this.token1.address,
        account1.address,
        ethers.utils.parseUnits("10", 18),
        this.token2.address,
        account2.address,
        ethers.utils.parseUnits("20", 18),
      );
    await this.swapContract.deployed();
  });

  it("Should Swap Tokens", async function () {

     await this.token1.mint(account2.address, ethers.utils.parseUnits("50", 18));
     await this.token2.mint(account2.address, ethers.utils.parseUnits("50", 18));

    // need to approve before transferring from the swap contract
    await this.token1.approve(this.swapContract.address, ethers.utils.parseUnits("10", 18));

    await this.token2.connect(account2).approve(this.swapContract.address, ethers.utils.parseUnits("20", 18));


    let balanceAccount1BeforeTokenA = await this.token1.balanceOf(account1.address);
    let balanceAccount2BeforeTokenA = await this.token1.balanceOf(account2.address);

    let balanceAccount1BeforeTokenB = await this.token2.balanceOf(account1.address);
    let balanceAccount2BeforeTokenB = await this.token2.balanceOf(account2.address);

    console.log("balanceAccount1BeforeTokenA",  ethers.utils.formatUnits(balanceAccount1BeforeTokenA, 18));
    console.log("balanceAccount2BeforeTokenA", ethers.utils.formatUnits(balanceAccount2BeforeTokenA,18));
    console.log("balanceAccount1BeforeTokenB", ethers.utils.formatUnits(balanceAccount1BeforeTokenB, 18));
    console.log("balanceAccount2BeforeTokenB", ethers.utils.formatUnits(balanceAccount2BeforeTokenB, 18));

    // swap here

    await this.swapContract.swap();

    console.log("          **********************************            ")

    let balanceAccount1AfterTokenA = await this.token1.balanceOf(account1.address);
    let balanceAccount2AfterTokenA = await this.token1.balanceOf(account2.address);

    let balanceAccount1AfterTokenB = await this.token2.balanceOf(account1.address);
    let balanceAccount2AfterTokenB = await this.token2.balanceOf(account2.address);

    console.log("balanceAccount1AfterTokenA", ethers.utils.formatUnits(balanceAccount1AfterTokenA, 18));
    console.log("balanceAccount2AfterTokenA", ethers.utils.formatUnits(balanceAccount2AfterTokenA, 18));
    console.log("balanceAccount1AfterTokenB", ethers.utils.formatUnits(balanceAccount1AfterTokenB, 18));
    console.log("balanceAccount2AfterTokenB", ethers.utils.formatUnits(balanceAccount2AfterTokenB, 18));

  });

});
