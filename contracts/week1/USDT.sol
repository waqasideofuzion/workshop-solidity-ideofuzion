// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDT is ERC20Burnable, Ownable {
    uint256 private constant initialSupply = 1000000000e18;

    constructor() ERC20("USDT", "USDT") {
        _mint(msg.sender, initialSupply);
    }

    /**
    @param account The address to which token will be minted
    @param amount Tokens amount minted to account
    */
    function mint(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "ZERO ADDRESS");
        _mint(account, amount);
    }

    /**
    @param amount The amount user wants to mint 
     */
    function mintPublic(uint256 amount) public {
        _mint(_msgSender(), amount);
    }
}
