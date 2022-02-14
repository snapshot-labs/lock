export function getInjected() {
  const web3: any = window['ethereum'];
  if (!web3) return;
  let injected = { name: 'Injected', id: 'web3' };
  if (web3.isMetaMask) injected = { name: 'MetaMask', id: 'metamask' };
  if (web3.isTally) injected = { name: 'Tally', id: 'tally' };
  if (web3.isTrust) injected = { name: 'Trust Wallet', id: 'trustwallet' };
  if (web3.isStatus) injected = { name: 'Status', id: 'status' };
  if (web3.isFrame) injected = { name: 'Frame', id: 'frame' };
  if (web3.isAlphaWallet) injected = { name: 'AlphaWallet', id: 'alphawallet' };
  if (web3.isImToken) injected = { name: 'imToken', id: 'imtoken' };
  if (web3.isTokenPocket) injected = { name: 'TokenPocket', id: 'tokenpocket' };
  if (web3.isBitpie) injected = { name: 'Bitpie', id: 'bitpie' };
  return injected;
}
