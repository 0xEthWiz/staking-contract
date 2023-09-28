import React, { useEffect } from "react";

function GetStakingBalance({
  starknet,
  staking,
  setCurrentStakingBalance,
  currentStakingBalance,
}) {
  useEffect(() => {
    async function fetchStakingBalance() {
      try {
        const userAddress = await starknet.account.address;
        const response = await staking.get_staked_balance(userAddress);
        const responseString = response.toString();
        setCurrentStakingBalance(responseString);
      } catch (error) {
        console.error("Error getting current staking balance:", error);
      }
    }

    fetchStakingBalance();
  }, [starknet, staking, setCurrentStakingBalance]);

  return (
    <>
      {currentStakingBalance !== null && (
        <p>Current Staking Balance: {currentStakingBalance}</p>
      )}
    </>
  );
}

export default GetStakingBalance;
