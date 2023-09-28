import React, { useState } from "react";
import Wallet from "./components/Wallet";
import Token from "./components/token_contract/token";
import Staking from "./components/staking_contract/staking";
function App() {
  const [starknet, setStarknet] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [currentStakingBalance, setCurrentStakingBalance] = useState(null);

  const tokenAddress =
    "0x0660b9426d3472873421df63f49388c89cd12c6a64b16b89ab948b164b953127";
  const stakingAddress =
    "0x075c17b400f02f3ef584ba62608b2bc042690106dcdba6005968a2b569cb863d";
  return (
    <>
      <Wallet onConnect={setStarknet} />
      <br />
      <h1>AMITAI Token!! WGMI</h1>
      {starknet && (
        <Token
          starknet={starknet}
          setCurrentBalance={setCurrentBalance}
          currentBalance={currentBalance}
          tokenAddress={tokenAddress}
        />
      )}
      <h1>Staking Contract for 1000%APY!</h1>
      {currentBalance && (
        <Staking
          starknet={starknet}
          setCurrentBalance={setCurrentBalance}
          setCurrentStakingBalance={setCurrentStakingBalance}
          currentStakingBalance={currentStakingBalance}
          stakingAddress={stakingAddress}
          tokenAddress={tokenAddress}
        />
      )}
    </>
  );
}

export default App;
