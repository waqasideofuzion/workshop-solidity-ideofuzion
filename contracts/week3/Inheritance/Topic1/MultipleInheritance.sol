// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Defining contract A
contract A1 {
    string internal x;

    function setA() external {
        x = "Multiple Inheritance";
    }
}

// Defining contract B
contract B1 {
    uint256 internal pow;

    function setB() external {
        uint256 a = 2;
        uint256 b = 20;
        pow = a**b;
    }
}

// Defining child contract C
// inheriting parent contract
// A and B
contract C1 is A1, B1 {
    // Defining external function
    // to return state variable x
    function getStr() external view returns (string memory) {
        return x;
    }

    // Defining external function
    // to return state variable pow
    function getPow() external view returns (uint256) {
        return pow;
    }
}

// Defining calling contract
contract caller2 {
    // Creating object of contract C
    C1 contractC = new C1();

    function setValue() public {
        contractC.setA();
        contractC.setB();
    }

    // Defining public function to
    // return values from functions
    // getStr and getPow
    function testInheritance2() public view returns (string memory, uint256) {
        return (contractC.getStr(), contractC.getPow());
    }
}
