// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Defining parent contract A
contract A2 {
    string internal x;
    string a = "Multi";
    string b = "Level";

    // Defining external function to return concatenated string
    function getA() external {
        x = string(abi.encodePacked(a, b));
    }
}

// Defining child contract B inheriting parent contract A
contract B2 is A2 {
    string public y;
    string c = "Inheritance";

    // Defining external function to return concatenated string
    function getB() external payable returns (string memory) {
        y = string(abi.encodePacked(x, c));
        return y;
    }
}

// Defining child contract C inheriting parent contract A
contract C2 is B2 {
    function getC() external view returns (string memory) {
        return y;
    }
}

// Defining calling contract
contract caller3 {
    // Creating object of child C
    C2 cc = new C2();

    function setValue() public {
        cc.getA();
        cc.getB();
    }

    // Defining public function to return final concatenated string
    function testInheritance3() public view returns (string memory) {
        return cc.getC();
    }
}
