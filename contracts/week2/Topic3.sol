// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

// Value types are types that do not take more than 32 bytes of memory in size. Solidity provides the following value types:

// bool: The boolean value that can hold true or false as its value
// uint: These are unsigned integers that can hold 0 and positive values only
// int: These are signed integers that can hold both negative and positive values
// address: This represents an address of an account on Ethereum environment
// byte: This represents fixed sized byte array (byte1 to bytes32)
// enum: Enumerations that can hold predefined constant values

contract ValueTypes {
    uint256 public age = 45;
    uint256 public count;

    // Updating Value data type state variable
    function updateAge() public {
        age = 55;
    }

    function updateAge2() public view returns (uint256) {
        return receiveAgeAndUpdate(age);
    }

    // Receive state variable in paramerter but create a separate copy of
    // value type data will not effect state variable
    function receiveAgeAndUpdate(uint256 a) public pure returns (uint256) {
        a = 60;
        return a;
    }

    // assigning value of on state variable to another will create copy
    // so chaning the one state variable will not effect other
    function updateCount() public {
        count = age;
        age = 70;
    }
}

contract ReferenceTypes {
    uint8[3] public list = [31, 32, 33];
    string name = "Hello";
    struct User {
        uint8 age;
        string name;
    }

    // internal
    User myUser = User(32, "Waqas");

    // This will update array's particular location
    function updateList() public {
        list[1] = 45;
    }

    function updateList2() public view {
        receiveListAndUpdate(list);
    }

    // function parameters are always memory data locations
    // Will not effect original variable that is passed in parameter
    function receiveListAndUpdate(uint8[3] memory a) public pure {
        a[2] = 55;
    }

    function updateList3() public view returns (uint8) {
        // Reference types are always at storage location we need to
        // provide memory keywork to create local variable
        // And assigning state ref variable to memory ref variable will create a separate copy
        // changing one will not effect other
        uint8[3] memory newList = list;
        newList[2] = 67;
        return list[2]; //33
    }

    function updateList4() public view returns (uint8) {
        // By default ref type's location is storage so it works as passby ref

        //int[3] storage newList = list; //this is same below line

        // Assigning Ref state (storage) variable to ref storage local variable
        // will not create a separate copy so changing one will effect other
        uint8[3] memory newList = list;
        newList[1] = 100;
        return list[1]; //100
    }

    function updateStruct() public returns (uint8) {
        // Assigning Ref state (storage) variable to ref storage local variable
        // will not create a separate copy so changing one will effect other
        User storage myUser2 = myUser;
        myUser2.age = 40;
        return myUser.age; // 40
    }

    function updateStruct2() public returns (uint8) {
        // And assigning state ref variable to memory ref variable will create a separate copy
        // changing one will not effect other
        myUser.age = 98;
        User memory myUser2 = myUser;
        myUser2.age = 50;
        return myUser.age; // 98
    }
}
