// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// Difference between abstract contract and an interface
// An interface cannot have a constructor while an abstract contract can implement one.
// An interface cannot define state variables but an abstract contract can.
// An inheriting contract must implement all the functions defined in an interface while in an abstract contract the inheriting contract must implement at least one function of the abstract contract.
// An abstract contract can inherit from another contract or abstract contract while an interface cannot inherit from a contract or another interface.
// Interfaces and abstract contracts are arsenals in our toolkit that we could use for the development of smart contracts.

abstract contract SayHello {
    uint256 public age;

    constructor(uint256 _age) {
        age = _age;
    }

    function getAge() public view virtual returns (uint256) {
        return age;
    }

    function setAge(uint256 _age) external virtual;

    function makeMeSayHello() public pure returns (string memory) {
        return "Hello";
    }
}

contract Hello is SayHello {
    string public name;

    constructor(string memory _name, uint256 _age) SayHello(_age) {
        name = _name;
    }

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getAge() public view virtual override returns (uint256) {
        return 67;
    }

    function setAge(uint256 _age) public virtual override {
        age = _age;
    }
}

interface IHello {
    function getAge() external view returns (uint256);

    function getName() external view returns (string memory);
}

contract ExternalCaller {
    IHello hello;

    constructor(IHello _hello) {
        require(address(_hello) != address(0), "ZERO ADDRESS");
        hello = _hello;
    }

    function getAgeandName() public view returns (uint256, string memory) {
        return (hello.getAge(), hello.getName());
    }
}
