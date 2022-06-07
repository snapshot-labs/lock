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
  if (web3.isTally) injected = {
    name: 'Tally',
    id: 'tally',
    icon: 'ipfs://Qma4EJoXZ2CyPfKQHbtjqnLVXP28xFwiXg3KwZa7nMZC19'
  };
  if (web3.isBitKeep) injected = {
    name: 'BitKeep',
    id: 'bitkeep',
    icon: 'ipfs://QmUfymnHPp6GyvveyUpNhVHwaiD53zxKWr7oYMa8hfz7UW'
  };
  return injected;
}
