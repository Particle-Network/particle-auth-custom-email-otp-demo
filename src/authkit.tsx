"use client";

import {
  AuthCoreContextProvider,
  PromptSettingType,
} from "@particle-network/authkit";
import { AuthType } from "@particle-network/auth-core";
import { EntryPosition } from "@particle-network/wallet";
import { mainnet, polygon, sepolia } from "@particle-network/authkit/chains";

export const ParticleAuthkit = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthCoreContextProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
        appId: process.env.NEXT_PUBLIC_APP_ID as string,

        // Locks the chain selector to Ethereum and Polygon
        chains: [sepolia],
        themeType: "dark", // Login modal theme
        fiatCoin: "USD",
        language: "en",

        // Optionally, switches the embedded wallet modal to reflect a smart account
        // erc4337: {
        //   name: "SIMPLE",
        //   version: "2.0.0",
        // },

        wallet: {
          themeType: "dark", // Wallet modal theme
          entryPosition: EntryPosition.BR,
          // Set to false to remove the embedded wallet modal
          visible: true,
        },
      }}
    >
      {children}
    </AuthCoreContextProvider>
  );
};
