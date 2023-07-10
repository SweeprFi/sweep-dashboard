import React, {
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react'
import Web3 from 'web3'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import { useConnectWallet, init, useSetChain } from '@web3-onboard/react'
import { networks, rpcLinks } from '@config/constants'
import walletLogo from '@images/logo_wallet.png'

const ChainID = parseInt(process.env.REACT_APP_CHAIN_ID)
const ChainName = networks[ChainID]
const RPC_URL = rpcLinks[ChainID]
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })

const injected = injectedModule({
  sort: (wallets) => {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)

    return (
      [
        metaMask,
        ...wallets.filter(
          ({ label }) => label !== ProviderLabel.MetaMask
        )
      ]
        // remove undefined values
        .filter((wallet) => wallet)
    )
  }
})

const initOptions = {
  projectId: 'sweep'
}
const walletConnect = walletConnectModule(initOptions)

const walletInfo = {
  wallets: [
    injected,
    walletConnect
  ],
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
    }
  ],
  connect: {
    showSidebar: true
  },
  appMetadata: {
    name: "Sweep",
    icon: walletLogo,
    description: "Wallet Connections"
  },
  accountCenter: {
    desktop: {
      enabled: false,
      minimal: true
    },
    mobile: {
      enabled: false,
      minimal: true
    }
  },
}

init(walletInfo)

const getWeb3 = () => {
  if (typeof window !== "undefined") {
    const web3 = new Web3(window.ethereum || httpProvider)

    return web3
  } else {
    return null
  }
}

const getProviderWeb3 = () => {
  if (typeof window !== "undefined") {
    const web3 = new Web3(httpProvider)

    return web3
  } else {
    return null
  }
}

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

  return useMemo(() => ({ ...walletData }), [
    walletData
  ])
}

const UseWalletProvider = (props) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const walletContext = useContext(UseWalletContext)
  const web3 = getWeb3()

  if (walletContext !== null) {
    throw new Error('<UseWalletProvider /> has already been declared.')
  }

  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [error, setError] = useState(null)
  const [chainId, setChainId] = useState(props.chainId)
  const [chainName, setChainName] = useState(props.chainName)

  const walletInitialize = useCallback(async () => {
    const _chainId = await web3.eth.getChainId()
    const _address = await web3.eth.getAccounts()
    if (_address[0] && _chainId === chainId) {
      setConnected(true)
      setWalletAddress(_address[0])
    }
  }, [web3, chainId]);

  const connectHandler = useCallback(async () => {
    localStorage.setItem("disconnect", 'false');
    connect()
  }, [connect])

  const disconnectHandler = useCallback(() => {
    localStorage.setItem("disconnect", 'true');
    if (wallet) {
      disconnect(wallet)
    }
    setConnected(false)
    setWalletAddress('')
  }, [wallet, disconnect])

  const handleNetworkChange = useCallback(async (networkId) => {
    const _chainId = parseInt(networkId)
    setChainId(_chainId);
    setChainName(networks[_chainId]);
    const _address = await web3.eth.getAccounts()
    if (_address[0]) {
      setConnected(true)
      setWalletAddress(_address[0])
    }
  }, [web3])

  useEffect(() => {
    if (wallet?.provider) {
      if (connecting)
        setChain({ chainId: parseInt(chainId) });

      let networkId = parseInt(wallet?.chains[0].id)
      if (networkId !== parseInt(chainId)) {
        setError(`You should choose ${chainName}!`)
        disconnect(wallet)
      } else {
        setWalletAddress(wallet?.accounts[0].address)
      }
      setConnected(networkId === parseInt(chainId))
    } else {
      setWalletAddress('')
      setConnected(false)
    }
  }, [wallet, connecting, chainId, chainName, setChain, setConnected, disconnect])

  useEffect(() => {
    if (localStorage.getItem("disconnect") === 'false')
      walletInitialize()

    if (typeof window !== "undefined") {
      if (window.ethereum) {

        window.ethereum.on('chainChanged', handleNetworkChange);
        window.ethereum.on('disconnect', disconnectHandler);
        window.ethereum.on('accountsChanged', disconnectHandler);
      }
    }

  }, [handleNetworkChange, walletInitialize, disconnectHandler])

  const walletData = useMemo(
    () => ({
      chainId,
      connected,
      connecting,
      walletAddress,
      connectHandler,
      disconnectHandler,
      error
    }),
    [
      chainId,
      connected,
      connecting,
      walletAddress,
      connectHandler,
      disconnectHandler,
      error
    ]
  )

  return (
    <UseWalletContext.Provider
      value={{
        walletData
      }}
    >
      {props.children}
    </UseWalletContext.Provider>
  )
}

UseWalletProvider.defaultProps = {
  chainId: ChainID,
  chainName: ChainName
}

export {
  ChainID,
  getWeb3,
  getProviderWeb3,
  UseWalletProvider,
  useWallet
}
