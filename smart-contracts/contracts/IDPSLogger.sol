// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IDPSLogger {
    event IntrusionLogged(
        address indexed reporter,
        string ipAddress,
        string logHash,
        uint256 timestamp
    );

    struct Intrusion {
        string ipAddress;
        string logHash;
        uint256 timestamp;
    }

    Intrusion[] public logs;

    function logIntrusion(string memory ipAddress, string memory logHash) public {
        logs.push(Intrusion(ipAddress, logHash, block.timestamp));
        emit IntrusionLogged(msg.sender, ipAddress, logHash, block.timestamp);
    }

    function getLogCount() public view returns (uint256) {
        return logs.length;
    }

    function getLog(uint index) public view returns (string memory, string memory, uint256) {
        require(index < logs.length, "Invalid index");
        Intrusion memory entry = logs[index];
        return (entry.ipAddress, entry.logHash, entry.timestamp);
    }
}
