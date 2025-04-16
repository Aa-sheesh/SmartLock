    import { ethers } from "ethers";
    import fs from "fs";
    import path from "path";
    import dotenv from "dotenv";
    dotenv.config();

    // Load ABI from compiled contract
    const __dirname = path.resolve();
    const abiPath = path.join(__dirname, "smart-contracts/artifacts/contracts/IDPSLogger.sol/IDPSLogger.json");
    const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));

    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8545"; // Local Hardhat

    // Provider & Signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // Replace with private key or use from local node (if needed)
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "YOUR_LOCAL_ACCOUNT_PRIVATE_KEY";
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, wallet);

    // ✅ Logging function
    export async function logIntrusionToBlockchain(ip, hash) {
    try {
        const tx = await contract.logIntrusion(ip, hash);
        await tx.wait();
        console.log("🛡️ Intrusion logged on blockchain:", tx.hash);
    } catch (err) {
        console.error("❌ Blockchain logging failed:", err);
    }
    }
