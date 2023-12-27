import React, {
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';
import Web3 from 'web3';

import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseWalletModule from '@web3-onboard/coinbase'

import { useConnectWallet, init, useSetChain } from '@web3-onboard/react'
import { networks, rpcLinks, chainList } from '@config/constants'
import walletMobileLogo from '@images/logo_mobile.svg'
import walletLogo from "@images/logo.svg";

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const CHAIN_IDS = chainList.map((item) => { return item.chainId } )
const CHAIN_NAME = networks[CHAIN_ID]
const RPC_URL = rpcLinks[CHAIN_ID]

const injected = injectedModule()
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })
const walletConnect = walletConnectModule({ projectId: 'cd4a577bcbeff487bba452a9deeaeace' })

const walletInfo = {
  wallets: [
    injected,
    coinbaseWalletSdk,
    walletConnect
  ],
  theme: 'dark',
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://eth.llamarpc.com`
    },
    {
      id: '0x5',
      token: 'ETH',
      label: 'Ethereum Goerli',
      rpcUrl: `https://rpc.ankr.com/eth_goerli`
    },
    {
      id: '0xA',
      token: 'OETH',
      label: 'Optimism',
      rpcUrl: 'https://rpc.ankr.com/optimism'
   },
    {
      id: '0xaa36a7',
      token: 'SepoliaETH',
      label: 'Ethereum Sepolia',
      rpcUrl: `https://eth-sepolia-public.unifra.io`
    },
    {
      id: '0xa4b1',
      token: 'ETH',
      label: 'Arbitrum Mainnet',
      rpcUrl: `https://arbitrum-mainnet.infura.io`
    },
    {
      id: '0x66eed',
      token: 'AGOR',
      label: 'Arbitrum Goerli',
      rpcUrl: `https://endpoints.omniatech.io/v1/arbitrum/goerli/public`
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: `https://mainnet.base.org`
    },
    {
      id: '0xA86A',
      token: 'AVAX',
      label: 'Avalanche',
      rpcUrl: `https://api.avax.network/ext/bc/C/rpc`
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon PoS',
      rpcUrl: `https://polygon-rpc.com`
    },
  ],
  connect: {
    showSidebar: true,
    removeWhereIsMyWalletWarning: true,
    autoConnectAllPreviousWallet: true
  },
  notify: { enabled: false },
  appMetadata: {
    name: "Sweep",
    icon: walletMobileLogo,
    logo: walletLogo,
    description: "Wallet Connections"
  },
  accountCenter: {
    desktop: { enabled: false, minimal: true },
    mobile: { enabled: false, minimal: true }
  },
}
init(walletInfo)

const UseWalletContext = React.createContext(null)

const useWallet = () => {
  const walletContext = useContext(UseWalletContext)

  if (walletContext === null) {
    throw new Error(
      'useWallet() can only be used inside of <UseWalletProvider />, ' +
      'please declare it at a higher level.'
    )
  }

  const { walletData } = walletContext

  return useMemo(() => ({ ...walletData }), [walletData])
}

const UseWalletProvider = (props) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const walletContext = useContext(UseWalletContext)

  if (walletContext !== null) {
    throw new Error('<UseWalletProvider /> has already been declared.')
  }

  const [web3, setWeb3] = useState(undefined);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [chainId, setChainId] = useState(props.chainId);

  useEffect(() => {
    const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
    const _web3 = new Web3(wallet?.provider || httpProvider)
    setWeb3(_web3)
  }, [wallet, setWeb3])

  const walletInitialize = useCallback(async () => {
    const _address = wallet?.accounts[0]?.address
    const _chainId = parseInt(wallet?.chains[0].id)
    if(_address && CHAIN_IDS.indexOf(_chainId) < 0) {
      setChain({ chainId: parseInt(chainId) });
    } else if (_address) {
      setConnected(true)
      setWalletAddress(_address)
      setChainId(_chainId)
    }
  }, [wallet, chainId, setChain, setConnected, setWalletAddress]);

  const connectHandler = useCallback(async () => {
    await connect()
  }, [connect])

  const disconnectHandler = useCallback(async () => {
    if (wallet) {
      await disconnect(wallet)
    }
    setConnected(false)
    setWalletAddress('')
    window.localStorage.removeItem('connectedWallets')
  }, [wallet, disconnect, setConnected, setWalletAddress])

  const handleNetworkChange = useCallback(async (networkId) => {
    const _chainId = parseInt(networkId)

    if(CHAIN_IDS.indexOf(_chainId) < 0) {
      setChain({ chainId: parseInt(chainId) });
    } else {
      setChainId(_chainId);
      const _address = wallet?.accounts[0]?.address
      if (_address) {
        setConnected(true)
        setWalletAddress(_address)
      }
    }
  }, [wallet, chainId, setChain])

  useEffect(() => {
    walletInitialize()

    if (typeof window !== "undefined") {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', handleNetworkChange);
        window.ethereum.on('accountsChanged', disconnectHandler);
      }
    }

  }, [handleNetworkChange, walletInitialize, disconnectHandler])

  const walletData = useMemo(
    () => ({web3, chainId, connected, connecting, walletAddress, connectHandler, setChain, disconnectHandler}),
    [web3, chainId, connected, connecting, walletAddress, connectHandler, setChain, disconnectHandler]
  )

  return (
    <UseWalletContext.Provider value={{ walletData }}>
      {props.children}
    </UseWalletContext.Provider>
  )
}

UseWalletProvider.defaultProps = { chainId: CHAIN_ID, chainName: CHAIN_NAME }
export { UseWalletProvider, useWallet }
