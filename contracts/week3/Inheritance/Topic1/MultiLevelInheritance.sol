// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Defining parent contract A
contract A {
    string internal x;
    string a = "Multi";
    string b = "Level";

    // Defining external function to return concatenated string
    function getA() external {
        x = string(abi.encodePacked(a, b));
    }
}

// Defining child contract B inheriting parent contract A
contract B is A {
    string public y;
    string c = "Inheritance";

    // Defining external function to return concatenated string
    function getB() external payable returns (string memory) {
        y = string(abi.encodePacked(x, c));
    }
}

// Defining child contract C inheriting parent contract A
contract C is B {
    function getC() external view returns (string memory) {
        return y;
    }
}

// Defining calling contract
contract caller {
    // Creating object of child C
    C cc = new C();

    // Defining public function to return final concatenated string
    function testInheritance() public returns (string memory) {
        cc.getA();
        cc.getB();
        return cc.getC();
    }
}