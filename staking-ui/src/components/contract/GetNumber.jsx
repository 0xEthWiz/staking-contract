import React, { useState, useEffect } from "react";
import { Contract, Provider, constants } from "starknet";
import simpleContractAbi from "../../../data/simpleContractAbi.json";

function GetNumber({ starknet }) {
  const [currentNumber, setCurrentNumber] = useState(null);

  const provider = new Provider({
    sequencer: { network: constants.NetworkName.SN_GOERLI },
  });

  const simpleContractAddress =
    "0x058ca703111e5d8e19bf93fbb203b2c26051e25c53b7ad1069395a5800b5f0f3";

  const simpleContract = new Contract(
    simpleContractAbi,
    simpleContractAddress,
    provider
  );

  async function handleGetCurrentNumber() {
    try {
      const response = await simpleContract.get_num();
      const numInDec = parseInt(response, 16);
      setCurrentNumber(numInDec);
    } catch (error) {
      console.error("Error getting current number:", error);
    }
  }
  return (
    <>
      <button onClick={handleGetCurrentNumber}>Get current number</button>
      {currentNumber !== null && <p>Current Number: {currentNumber}</p>}
    </>
  );
}

export default GetNumber;
