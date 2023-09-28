import { Provider, constants, Contract } from "starknet";

function DepositTokens({
  starknet,
  staking,
  currentBalance,
  setCurrentBalance,
  tokenAddress,
}) {
  async function handleMint() {
    try {
      const amount = 120;
      const userAddress = starknet.account.address;
      const response = await starknet.account.execute([
        {
          contractAddress: tokenAddress,
          entrypoint: "approve",
          calldata: [staking.address, 100000000, 0],
        },
        {
          contractAddress: staking.address,
          entrypoint: "deposit",
          calldata: [amount, 0],
        },
      ]);
      console.log(response);
    } catch (error) {
      console.error("Error minting:", error);
    }
  }

  return (
    <>
      <button onClick={handleMint}>deposit 120 tokens!</button>
    </>
  );
}

export default DepositTokens;
