const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;

describe.only("Re-entrancy Attack: ", function () {
  beforeEach("deploy", async function () {
    [account1, account2, account3] = await ethers.getSigners();

    this.EthersProvider = new ethers.providers.Web3Provider(network.provider);

    this.depositFunds;
    this.attackContract;
    this.safeDepositContract;

    const DepositFundsFactory = await ethers.getContractFactory(
      "DepositFunds"
    );

    const AttackFactory = await ethers.getContractFactory(
        "Attack"
      );

    const SafeDepositFundsFactory = await ethers.getContractFactory(
        "SafeDepositFunds"
      );

    this.depositFunds = await DepositFundsFactory.deploy();
    await this.depositFunds.deployed();

    this.attackContract = await AttackFactory.deploy(this.depositFunds.address);
    await this.attackContract.deployed();

    this.safeDepositContract = await SafeDepositFundsFactory.deploy();
    await this.safeDepositContract.deployed();
  });

  it("Test Attack Contract", async function () {

    let depositAmount = ethers.utils.parseEther("1");

    await this.depositFunds.deposit({value : depositAmount});
    await this.depositFunds.connect(account2).deposit({value : depositAmount});
    await this.depositFunds.connect(account3).deposit({value : depositAmount});

    let balanceContract = await this.depositFunds.getBalance();
    console.log("balanceContract", ethers.utils.formatEther(balanceContract));


    let balanceAttackContract = await this.attackContract.getBalance();
    console.log("balanceAttackContract", ethers.utils.formatEther(balanceAttackContract));

    // attack on deposit contract
    await this.attackContract.attack({value: depositAmount});

    let balanceContractAfter = await this.depositFunds.getBalance();
    console.log("balanceContractAfter", ethers.utils.formatEther(balanceContractAfter));

    let balanceAttackContractAfter = await this.attackContract.getBalance();
    console.log("balanceAttackContractAfter", ethers.utils.formatEther(balanceAttackContractAfter));

    let balanceaccount1 = await ethers.provider.getBalance(account1.address);
    console.log("balanceaccount1", ethers.utils.formatEther(balanceaccount1));

    await this.attackContract.withdraw(account1.address);

    let balanceaccount1After = await ethers.provider.getBalance(account1.address);
    console.log("balanceaccount1After", ethers.utils.formatEther(balanceaccount1After), ethers.utils.formatEther(balanceaccount1After) - ethers.utils.formatEther(balanceaccount1), "ethers");




  });

  it("Test Safe Contract", async function () {

    const AttackFactory = await ethers.getContractFactory(
      "Attack"
    );
    
    this.attackContractNew = await AttackFactory.deploy(this.safeDepositContract.address);
    await this.attackContractNew.deployed();

    let depositAmount = ethers.utils.parseEther("1");

    await this.depositFunds.deposit({value : depositAmount});
    await this.depositFunds.connect(account2).deposit({value : depositAmount});
    await this.depositFunds.connect(account3).deposit({value : depositAmount});

    let balanceContract = await this.depositFunds.getBalance();
    console.log("balanceContract", ethers.utils.formatEther(balanceContract));


    let balanceAttackContract = await this.attackContractNew.getBalance();
    console.log("balanceAttackContract", ethers.utils.formatEther(balanceAttackContract));

    // attack on deposit contract
    await this.attackContractNew.attack({value: depositAmount});

    let balanceContractAfter = await this.depositFunds.getBalance();
    console.log("balanceContractAfter", ethers.utils.formatEther(balanceContractAfter));

    let balanceAttackContractAfter = await this.attackContractNew.getBalance();
    console.log("balanceAttackContractAfter", ethers.utils.formatEther(balanceAttackContractAfter));

    let balanceaccount1 = await ethers.provider.getBalance(account1.address);
    console.log("balanceaccount1", ethers.utils.formatEther(balanceaccount1));

    await this.attackContractNew.withdraw(account1.address);

    let balanceaccount1After = await ethers.provider.getBalance(account1.address);
    console.log("balanceaccount1After", ethers.utils.formatEther(balanceaccount1After), ethers.utils.formatEther(balanceaccount1After) - ethers.utils.formatEther(balanceaccount1), "ethers");

  });
});
