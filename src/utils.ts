import wallets from './wallets.json';

export function getInjected() {
  const web3: any = window['ethereum'];

  if (!web3) return;

  for (const wallet of wallets) {
    if (web3[wallet.flag]) {
      return {
        name: wallet.name,
        id: wallet.id,
        icon: wallet.icon
      };
    }
  }

  return {
    name: 'Injected',
    id: 'web3',
    icon: 'ipfs://QmXUov1JMszHkizCf3HvmcKWKm9PrG2KHpd5bDnE5YbZN8'
  };
}
