// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Defining parent contract A
contract A {
    string internal x;

    function getA() external {
        x = "Hierarchical Inheritance";
    }

    uint256 internal sum;

    function setA() external {
        uint256 a = 10;
        uint256 b = 20;
        sum = a + b;
    }
}
// Defining child contract B inheriting parent contract A
contract B is A {
    // Defining external function to return state variable x
    function getAstr() external view returns (string memory) {
        return x;
    }
}
// Defining child contract C inheriting parent contract A
contract C is A {
    // Defining external function to return state variable sum
    function getAValue() external view returns (uint256) {
        return sum;
    }
}
// Defining calling contract
contract caller {
    // Creating object of contract B
    B contractB = new B();

    // Creating object of contract C
    C contractC = new C();

    // Defining public function to
    // return values of state variables
    // x and sum
    function testInheritance() public view returns (string memory, uint256) {
        return (contractB.getAstr(), contractC.getAValue());
    }
}