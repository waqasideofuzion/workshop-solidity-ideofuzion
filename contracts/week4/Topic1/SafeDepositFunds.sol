// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SafeDepositFunds {
    bool internal locked;

    mapping(address => uint256) public balances;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public noReentrant {
        uint256 bal = balances[msg.sender];
        require(bal > 0);

        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
    }

    //   function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
