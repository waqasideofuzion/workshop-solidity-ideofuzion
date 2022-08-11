const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;

describe("Inheritance: ", function () {
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.EthersProvider = new ethers.providers.Web3Provider(network.provider);

    this.singleInheritance;
    this.multipleInheritance;
    this.multiLevelInheritance;
    this.hierarchicalInheritance;

    const SingleInheritanceFactory = await ethers.getContractFactory("caller1");
    const MultipleInheritanceFactory = await ethers.getContractFactory(
      "caller2"
    );
    const MultiLevelInheritanceFactory = await ethers.getContractFactory(
      "caller3"
    );
    const HierarchicalInheritanceFactory = await ethers.getContractFactory(
      "caller4"
    );

    this.singleInheritance = await SingleInheritanceFactory.deploy();
    await this.singleInheritance.deployed();

    this.multipleInheritance = await MultipleInheritanceFactory.deploy();
    await this.multipleInheritance.deployed();

    this.multiLevelInheritance = await MultiLevelInheritanceFactory.deploy();
    await this.multiLevelInheritance.deployed();

    this.hierarchicalInheritance =
      await HierarchicalInheritanceFactory.deploy();
    await this.hierarchicalInheritance.deployed();
  });

  describe("Single Inheritance: ", function () {
    it("Test 1", async function () {
      
      await this.singleInheritance.setValueInChild();

      let value = await this.singleInheritance.testInheritance1();
      console.log("Get the value from its parent =>", value.toString());
    });
  });

  describe("Multiple Inheritance: ", function () {
    it("Test 2", async function () {
      await this.multipleInheritance.setValue();
      let value = await this.multipleInheritance.testInheritance2();
      console.log(
        "Get string value from A, and Power value from B =>",
        value[0],
        value[1].toString()
      );
    });
  });

  describe("MultiLevel Inheritance: ", function () {
    it("Test 3", async function () {
      await this.multiLevelInheritance.setValue();

      let value = await this.multiLevelInheritance.testInheritance3();
      console.log("Get the value from B contract =>", value);
    });
  });

  describe("Hierarchical Inheritance: ", function () {
    it("Test 4", async function () {

      await this.hierarchicalInheritance.setValue();
      
      let value = await this.hierarchicalInheritance.testInheritance4();
      console.log("Get string and sum value from A contract =>", value[0], value[1].toString());
    });
  });
});
