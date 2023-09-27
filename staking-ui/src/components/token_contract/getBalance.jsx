import React from "react";

function GetBalance({ starknet, token, currentBalance, setCurrentBalance }) {
  async function handleGetCurrentBalance() {
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

  return (
    <>
      <button onClick={handleGetCurrentBalance}>Get current number</button>
      {currentBalance !== null && <p>Current Balance: {currentBalance}</p>}
    </>
  );
}

export default GetBalance;
