import React, { useState } from "react";
import { Contract, Provider, constants } from "starknet";
import stakingABI from "../../../data/stakingABI.json";
import GetStakingBalance from "./getStakingBalance";
import DepositTokens from "./depositTokens";
function Staking({
  starknet,
  setCurrentStakingBalance,
  currentStakingBalance,
  stakingAddress,
  tokenAddress,
}) {
  const provider = new Provider({
    sequencer: { network: constants.NetworkName.SN_GOERLI },
  });

  const staking = new Contract(stakingABI, stakingAddress, provider);

  return (
    <>
      <GetStakingBalance
        starknet={starknet}
        staking={staking}
        setCurrentStakingBalance={setCurrentStakingBalance}
        currentStakingBalance={currentStakingBalance}
      />
      <DepositTokens
        starknet={starknet}
        staking={staking}
        setCurrentStakingBalance={setCurrentStakingBalance}
        tokenAddress={tokenAddress}
      />
    </>
  );
}

export default Staking;
