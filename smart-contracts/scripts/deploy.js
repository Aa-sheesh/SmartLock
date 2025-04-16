const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const IDPSLogger = await hre.ethers.getContractFactory("IDPSLogger");
  const idps = await IDPSLogger.deploy();

  await idps.waitForDeployment(); // ✅ modern replacement for .deployed()

  console.log("IDPSLogger deployed to:", await idps.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
