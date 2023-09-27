import { Provider, constants, Contract } from "starknet";
import simpleContractAbi from "../../../data/simpleContractAbi.json";

export default function SetNumber({ starknet }) {
  console.log("Starknet Object:", starknet);

  const simpleContractAddress =
    "0x058ca703111e5d8e19bf93fbb203b2c26051e25c53b7ad1069395a5800b5f0f3";

  async function handleIncNum() {
    try {
      const response = await starknet.account.execute({
        contractAddress: simpleContractAddress,
        entrypoint: "add_one",
        calldata: [],
      });
      console.log(response);
    } catch (error) {
      console.error("Error Inc number:", error);
    }
  }

  return (
    <>
      <button onClick={handleIncNum}>Increment number by 1</button>
    </>
  );
}
