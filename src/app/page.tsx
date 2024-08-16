"use client";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  const { isConnected, chainId } = useAccount();
  const { connect } = useConnect();

  if (!isConnected) {
    return (
      <div>
        <button onClick={() => connect({ connector: injected() })}>
          Connect wallet
        </button>
      </div>
    );
  }

  if (chainId !== 1) {
    return <div>Wrong network</div>;
  }

  return <div>Withdraw</div>;
}
