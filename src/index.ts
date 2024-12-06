
export * from "./constants";
export * from "./controllers";
export * from "./services";
export * from "./types";
export * from "./utils";


import { Buffer } from "buffer";
if (typeof window !== "undefined") {
    (window as any).Buffer = Buffer; 
}

import { xglobal } from "@polkadot/x-global";


if (typeof xglobal.crypto === "undefined") {
    xglobal.crypto = {
        getRandomValues<T extends ArrayBufferView | null>(array: T): T {
            if (array === null) {
                throw new TypeError("Argument cannot be null.");
            }

            const typedArray = array as ArrayBufferView;
            const uint8Array = new Uint8Array(typedArray.buffer);

            for (let i = 0; i < uint8Array.length; i++) {
                uint8Array[i] = Math.floor(Math.random() * 256);
            }

            return array;
        },
    };
}


if (typeof window !== "undefined") {
    (window as any).xglobal = xglobal;
}
