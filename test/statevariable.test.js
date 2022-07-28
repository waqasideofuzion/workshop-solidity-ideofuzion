const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;

describe("StateVariables: ", function () {
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.EthersProvider = new ethers.providers.Web3Provider(network.provider)

    this.deployedStateVariable;

    const StateVariableFactory = await ethers.getContractFactory(
      "StateVariables2"
    );

    this.deployedStateVariable = await StateVariableFactory.deploy();
    await this.deployedStateVariable.deployed();
  });

  it("Should Get the values from state variable", async function () {
    await this.deployedStateVariable.getInternalAge();
    await this.deployedStateVariable.getPrivateAge();
    await this.deployedStateVariable.getPublicAge();
    await this.deployedStateVariable.getConstantAge();
    await this.deployedStateVariable.getConstantAge2();
    await this.deployedStateVariable.getConstantAge3();

    // cannot call this state variable because its private and internal 
    
    // await this.deployedStateVariable.age();
    // await this.deployedStateVariable.privateAge();

    await this.deployedStateVariable.getInternalAge();
    await this.deployedStateVariable.getInternalAge();

    const storage1 = await this.EthersProvider.getStorageAt(this.deployedStateVariable.address,0);
    const storage2 = await this.EthersProvider.getStorageAt(this.deployedStateVariable.address, 1);
    
    // console.log("storage1",  parseInt(storage1, 16));
    // console.log("storage2",  parseInt(storage2, 16));

  });

  it("Should Set the value in state variable", async function () {
   
    await this.deployedStateVariable.setAge(25);

    expect(await this.deployedStateVariable.getInternalAge()).to.be.equal("25");


    
  });
});
