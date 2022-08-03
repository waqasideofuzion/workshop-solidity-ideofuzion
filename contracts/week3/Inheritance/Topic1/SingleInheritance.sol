// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Defining contract
contract parent {
    uint256 internal sum;

    function setValue() external {
        uint256 a = 10;
        uint256 b = 20;
        sum = a + b;
    }
}

// Defining child contract
contract child is parent {
    function getValue() external view returns (uint256) {
        return sum;
    }
}

// Defining calling contract
contract caller {
    child cc = new child();

    // Defining function to call setValue and getValue functions
    function testInheritance() public returns (uint256) {
        cc.setValue();
        return cc.getValue();
    }
}