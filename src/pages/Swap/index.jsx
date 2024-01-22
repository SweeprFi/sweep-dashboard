import React, { useMemo } from "react";
import { LiFiWidget } from '@lifi/widget';
import { useWallet } from "@utils/walletHelper";
import { tokens } from "@config/constants";

const Swap = () => {
  const { chainId } = useWallet();

  const widgetConfig = useMemo(() => ({
    integrator: "Sweep Protocol",
    fromToken: tokens.usdc[chainId],
    fromChain: Number(chainId),
    toToken: tokens.sweep[chainId],
    toChain: Number(chainId),

    appearance: 'dark',
    hiddenUI: ['poweredBy'],
    chains: { allow: [1, 10, 56, 137, 8453, 42161, 43114] },
    disableLanguageDetector: true,

    // walletManagement: {
    //   signer: walletAddress,
    //   connect: connectHandler,
    //   disconnect: disconnectHandler,
    //   switchChain: setChain
    // },
      
    containerStyle: {
      border: '1px solid rgb(234, 234, 234)',
      boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
      borderRadius: '15px',
      marginTop: '40px',
    },
    theme: {
      palette: {
        primary: { main: '#3464af' },
        secondary: { main: '#3498db' },
        background: { 
          paper: '#1a1a1c', // bg color for cards
          default: '#000000', // bg color container
          },
      },
      shape: {
        borderRadius: 15,
        borderRadiusSecondary: 30,
      },
    }
  }), [chainId]);

  return (
    <div className="bg-l2s">
      <LiFiWidget config={widgetConfig} />
    </div>
  )
}

export default Swap;