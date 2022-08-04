const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;

describe("ReferenceType: ", function () {
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.EthersProvider = new ethers.providers.Web3Provider(network.provider);

    this.ReferenceTypeContract;

    const ReferenceTypeFactory = await ethers.getContractFactory(
      "ReferenceTypes"
    );

    this.ReferenceTypeContract = await ReferenceTypeFactory.deploy();
    await this.ReferenceTypeContract.deployed();
  });

  it("Test 1", async function () {
    await this.ReferenceTypeContract.updateList();

    let list1 = await this.ReferenceTypeContract.getList();
    console.log("list1", list1);

    await this.ReferenceTypeContract.updateList2();
    let list2 = await this.ReferenceTypeContract.getList();
    console.log("list2", list2);

    await this.ReferenceTypeContract.receiveListAndUpdate([20, 30, 30]);

    let list3 = await this.ReferenceTypeContract.getList();
    console.log("list3", list3);

    await this.ReferenceTypeContract.updateList3();
    let list4 = await this.ReferenceTypeContract.getList();
    console.log("list4", list4);

    await this.ReferenceTypeContract.updateList4();
    let list5 = await this.ReferenceTypeContract.getList();
    console.log("list5", list5);

    await this.ReferenceTypeContract.updateList5();
    let list6 = await this.ReferenceTypeContract.getList();
    console.log("list6", list6)

    await this.ReferenceTypeContract.updateStruct();
    let getStruct1 = await this.ReferenceTypeContract.getAgeandName();
    console.log("getStruct1", getStruct1);

    await this.ReferenceTypeContract.updateStruct2();
    let getStruct2 = await this.ReferenceTypeContract.getAgeandName();
    console.log("getStruct2", getStruct2);
    
  });

  it("Test 2", async function () {});
});
