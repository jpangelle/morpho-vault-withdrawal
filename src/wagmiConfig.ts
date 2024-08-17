import { vMainnet } from "@/tenderly.config";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, vMainnet],
    connectors: [injected()],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [1]: http(process.env.NEXT_PUBLIC_TENDERLY_RPC_URL),
      [sepolia.id]: http(),
    },
  });
}
