import React, { useState } from "react";
import { connect, disconnect } from "get-starknet";

export default function Wallet({ onConnect }) {
  const [isConnected, setIsConnected] = useState(false);
  const [nonce, setNonce] = useState(null);

  async function handleConnectWallet() {
    try {
      const starknet = await connect();
      console.log(starknet);
      const currentNonce = await starknet.account.getNonce();
      const nonceInDec = parseInt(currentNonce, 16);
      setNonce(nonceInDec);
      setIsConnected(true);
      onConnect(starknet);
    } catch (error) {
      console.error("Error connecting the wallet:", error);
    }
  }

  async function handleDisconnectWallet() {
    try {
      await disconnect({ clearLastWallet: true });
      setIsConnected(false);
      setNonce(null);
      onConnect(null);
    } catch (error) {
      console.error("Error disconnecting the wallet:", error);
    }
  }

  return (
    <>
      {isConnected ? (
        <button onClick={handleDisconnectWallet}>Disconnect wallet</button>
      ) : (
        <button onClick={handleConnectWallet}>Connect wallet</button>
      )}
      {nonce !== null && <p>Your nonce: {nonce}</p>}
    </>
  );
}
