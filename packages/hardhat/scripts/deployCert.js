async function main() {
  const AC = await ethers.getContractFactory("AnchorCertificates");

  // 1624888800 = Mon Feb 22 2023 05:19:00 GMT+0000
  // 1627308000 = Mon June 22 2023 05:19:00 GMT+0000
  const ac = await AC.deploy("Anchor Certificates", "ARCTS", "0x1E646f66E50869b562656c214b9C9ebe39e8FF84", '1677064740', '1687429140');
  await ac.deployed();
  const acAddress = await ac.address;

  console.log("ARCTS deployed to: ", acAddress);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });