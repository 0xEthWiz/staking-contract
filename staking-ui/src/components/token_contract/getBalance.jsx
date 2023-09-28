import React, { useEffect } from "react";

function GetBalance({ starknet, token, currentBalance, setCurrentBalance }) {
  useEffect(() => {
    async function fetchBalance() {
      try {
        const userAddress = await starknet.account.address;
        const response = await token.balance_of(userAddress);
        const responseString = response.toString();
        const value = responseString.slice(0, -1);
        setCurrentBalance(value);
      } catch (error) {
        console.error("Error getting current balance:", error);
      }
    }

    fetchBalance();
  }, [starknet, token, setCurrentBalance]); // useEffect's dependency array

  return (
    <>{currentBalance !== null && <p>Current Balance: {currentBalance}</p>}</>
  );
}

export default GetBalance;
