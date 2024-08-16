import { vMainnet } from "@/tenderly.config";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { injected } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [vMainnet],
    connectors: [injected()],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [vMainnet.id]: http(process.env.NEXT_PUBLIC_TENDERLY_RPC_URL),
    },
  });
}
