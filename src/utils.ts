export function getInjected() {
  const web3: any = window['ethereum'];
  if (!web3) return;
  let injected = {
    name: 'Injected',
    id: 'web3',
    icon: 'ipfs://QmXUov1JMszHkizCf3HvmcKWKm9PrG2KHpd5bDnE5YbZN8'
  };
  if (web3.isMetaMask) injected = {
    name: 'MetaMask',
    id: 'metamask',
    icon: 'ipfs://QmTE7VPXMhriKAobMWEiC5S3oG22p4G6AXGyGdNWQTQ3Fv'
  };
  if (web3.isTrust) injected = {
    name: 'Trust Wallet',
    id: 'trustwallet',
    icon: 'ipfs://QmQzchPwEa7UnRqSS7kSt4EJWMw5mcj9u3YtTp9uig9UT5'
  };
  if (web3.isStatus) injected = {
    name: 'Status',
    id: 'status',
    icon: 'ipfs://QmWQhPEvpEH3xW8wwuTr9G5vsUz8ufy25dqe394UJzwsXE'
  };
  if (web3.isFrame) injected = {
    name: 'Frame',
    id: 'frame',
    icon: 'ipfs://QmReuKRvC7YTTEmW521nKJwEMFuocWgM9GYwUFedF6Q1BL'
  };
  if (web3.isAlphaWallet) injected = {
    name: 'AlphaWallet',
    id: 'alphawallet',
    icon: 'ipfs://QmT7mrsAgpu4V2UJAukaEU9V6fEWYHAo7aahUxfyDdBns9'
  };
  if (web3.isImToken) injected = {
    name: 'imToken',
    id: 'imtoken',
    icon: 'ipfs://QmacaenFbh6WXfoPVWzXiijRC8gcBT8N6yt4ZsdMWTWX5J'
  };
  if (web3.isTokenPocket) injected = {
    name: 'TokenPocket',
    id: 'tokenpocket',
    icon: 'ipfs://QmSetXfvpWqZVCzh23XQthPFYNQTPAfJaZbkHbWdDdCHzx'
  };
  if (web3.isBitpie) injected = {
    name: 'Bitpie',
    id: 'bitpie',
    icon: 'ipfs://QmVUZ8gznsZ2nNv85GFZuTQj31YenyUi5K4HGfhXB3jrAF'
  };
  return injected;
}

export const connectors = {
  injected: {
    id: "injected",
    name: "MetaMask"
  },
  walletconnect: {
    id: "walletconnect",
    name: "WalletConnect",
    network: "1",
    options: {
      rpc: {
        1: "https://cloudflare-eth.com",
        4: "https://eth-rinkeby.alchemyapi.io/v2/twReQE9Px03E-E_N_Fbb3OVF7YgHxoGq",
        42: "https://eth-kovan.alchemyapi.io/v2/QCsM2iU0bQ49eGDmZ7-Y--Wpu0lVWXSO"
      }
    },
    icon: "ipfs://QmZRVqHpgRemw13aoovP2EaQdVtjzXRaQGQZsCLXWaNn9x"
  },
  trezor: {
    id: "trezor",
    name: "Trezor (with MetaMask)",
    icon: "ipfs://QmVSxKigBBhARBGCqKffihWCK9jixPgVp3DEvhovpFaEDM"
  },
  torus: {
    id: "torus",
    name: "Torus",
    icon: "ipfs://QmTsZvSJrj5xbreGzccwPCdkV7ZKYEzPqRrTe5xduXgVmu"
  },
  walletlink: {
    id: "walletlink",
    name: "Coinbase",
    network: "1",
    options: {
      appName: "Snapshot",
      darkMode: false,
      chainId: 1,
      ethJsonrpcUrl: "https://cloudflare-eth.com"
    },
    icon: "ipfs://QmbJKEaeMz6qR3DmJSTxtYtrZeQPptVfnnYK72QBsvAw5q"
  },
  portis: {
    id: "portis",
    name: "Portis",
    network: "1",
    options: {
      dappId: "3eb93706-c71d-456b-b4eb-322ea27f7d48",
      network: "mainnet"
    },
    icon: "ipfs://QmNuLXa47xSrDNKRfpPNhoFTuoztvtWCcwGnPpT5MXJWMb"
  },
  fortmatic: {
    id: "fortmatic",
    name: "Fortmatic",
    options: {
      apiKey: "pk_live_9CE8FD92E54684ED"
    },
    icon: "ipfs://QmRvERVgt2L8BH2tPWpzBWHLWCeESxnAP3omTG1Pxa2Z6V"
  },
  gnosis: {
    id: "gnosis",
    name: "Gnosis Safe",
    icon: "ipfs://QmfJUHZLtRvadM7fvEJUWWxhS869KXXCMxPCr7TUqkwvUc"
  }
}
