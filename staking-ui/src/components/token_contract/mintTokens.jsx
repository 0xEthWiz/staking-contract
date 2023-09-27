import { Provider, constants, Contract } from "starknet";
import { uint256 } from "starknet";
function MintTokens({ starknet, token, currentBalance, setCurrentBalance }) {
  async function handleMint() {
    try {
      const amount = 10000;
      const response = await starknet.account.execute({
        contractAddress: token.address,
        entrypoint: "mint_self",
        calldata: [amount, 0],
      });
      console.log(response);
    } catch (error) {
      console.error("Error minting:", error);
    }
  }

  return (
    <>
      <button onClick={handleMint}>mint 10000 tokens!</button>
    </>
  );
}

export default MintTokens;
