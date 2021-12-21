// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    //variable to store managers address
    address public manager;

    //we are storing the address of the participants
     address payable[] public participants;

    constructor() {
        manager = msg.sender;
    }

    //Function to enter the lottery, we are going to make each users
    //pay a small amount to enter the lottery

    function enterLottery() public payable{
        require(msg.value > 0.01 ether);
        participants.push(payable(msg.sender));
    }

    function pickWinner() public{
        //check only that the manager can call the pick winner function
        require(msg.sender == manager);
        //select a random participant
        uint index = random() % participants.length;
        //transfer the contract balance to the participants
        participants[index].transfer(address(this).balance);
        // empty the address array
        participants = new address payable[](0);
    }

    function random() private view returns(uint256){
      return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
    }
       
}