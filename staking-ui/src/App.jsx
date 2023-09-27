import React, { useState } from "react";
import Wallet from "./components/Wallet";
import Token from "./components/token_contract/token";

function App() {
  const [starknet, setStarknet] = useState(null);

  return (
    <>
      <Wallet onConnect={setStarknet} />
      <br />
      {starknet && <Token starknet={starknet} />}
      {/* {starknet && <SetNumber starknet={starknet} />} */}
    </>
  );
}

export default App;
