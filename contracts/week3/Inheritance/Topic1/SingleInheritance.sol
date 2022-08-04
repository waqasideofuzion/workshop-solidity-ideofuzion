// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Defining contract
contract parent1 {
    uint256 internal sum;

    function setValue() external {
        uint256 a = 10;
        uint256 b = 20;
        sum = a + b;
    }
}

// Defining child contract
contract child1 is parent1 {
    function getValue() external view returns (uint256) {
        return sum;
    }
}

// Defining calling contract
contract caller1 {
    child1 cc = new child1();

    function setValueInChild() public {
        cc.setValue();
    }


    // Defining function to call setValue and getValue functions
    function testInheritance1() public view returns (uint256) {
        return cc.getValue();
    }
}