import React, { useState } from "react";
import { Contract, Provider, constants } from "starknet";
import tokenContractABI from "../../../data/tokenABI.json";
import GetBalance from "./getBalance";
import MintTokens from "./mintTokens";

function Token({ starknet, setCurrentBalance, currentBalance, tokenAddress }) {
  const provider = new Provider({
    sequencer: { network: constants.NetworkName.SN_GOERLI },
  });

  const token = new Contract(tokenContractABI, tokenAddress, provider);
  return (
    <>
      <span>
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
      </span>
    </>
  );
}

export default Token;
