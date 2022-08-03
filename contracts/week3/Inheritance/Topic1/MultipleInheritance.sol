// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Defining contract A
contract A {
    string internal x;

    function setA() external {
        x = "Multiple Inheritance";
    }
}

// Defining contract B
contract B {
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
contract C is A, B {
    // Defining external function
    // to return state variable x
    function getStr() external returns (string memory) {
        return x;
    }

    // Defining external function
    // to return state variable pow
    function getPow() external returns (uint256) {
        return pow;
    }
}

// Defining calling contract
contract caller {
    // Creating object of contract C
    C contractC = new C();

    // Defining public function to
    // return values from functions
    // getStr and getPow
    function testInheritance() public returns (string memory, uint256) {
        contractC.setA();
        contractC.setB();
        return (contractC.getStr(), contractC.getPow());
    }
}   