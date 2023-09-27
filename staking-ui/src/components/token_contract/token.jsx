import React, { useState } from "react";
import { Contract, Provider, constants } from "starknet";
import tokenContractABI from "../../../data/tokenABI.json";
import GetBalance from "./getBalance";
import MintTokens from "./mintTokens";

function Token({ starknet }) {
  const [currentBalance, setCurrentBalance] = useState(null);

  const provider = new Provider({
    sequencer: { network: constants.NetworkName.SN_GOERLI },
  });

  const tokenAddress =
    "0x0660b9426d3472873421df63f49388c89cd12c6a64b16b89ab948b164b953127";
  const token = new Contract(tokenContractABI, tokenAddress, provider);
  console.log(token);
  return (
    <>
      <GetBalance
        starknet={starknet}
        token={token}
        currentBalance={currentBalance}
        setCurrentBalance={setCurrentBalance}
      />

      <MintTokens
        starknet={starknet}
        token={token}
        currentBalance={currentBalance}
        setCurrentBalance={setCurrentBalance}
      />
      {/* Any other components or functionality related to the token can be added here */}
    </>
  );
}

export default Token;
