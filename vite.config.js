import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "WalletConnect",
            fileName: "walletconnect",
            formats: ["umd"],
        },
        rollupOptions: {
            external: ["@polkadot/util","@polkadot/x-window","@polkadot/x-global"],
            output: {
                globals: {
                    "@polkadot/util": "PolkadotUtil", 
                    "@polkadot/x-window": "PolkadotXWindow", 
                    "@polkadot/x-global": "xglobal", 
                },
            },
        },
    },
    resolve: {
        alias: {
            buffer: "buffer",
        },
    },
    define: {
        global: "window", 
    },
});
