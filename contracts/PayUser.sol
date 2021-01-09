// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract PayUser {
  address public owner;

  constructor () public {
        owner = msg.sender;
    }

    function payToUser (address payable reciever) payable public {
        reciever.transfer(msg.value);
    }
 
}