import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const config = {
  erigonURL: "https://virtual.sonic.rpc.tenderly.co/5a4b6992-4677-4310-87fd-c39a2bf0aa88",
  beaconAPI: null,
  experimentalFixedChainId: 220303012009,
  chainInfo: {
    name: "Tenderly Fork (Mainnet)",
    faucets: [],
    nativeCurrency: {
      name: "Sonic",
      symbol: "S",
      decimals: 18,
    },
  },
  sourcify: {
    sources: {
      "Sourcify Servers": {
        url: "https://repo.sourcify.dev",
        backendFormat: "RepositoryV1",
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App config={config} />
  </React.StrictMode>
);
