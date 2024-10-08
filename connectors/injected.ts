import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['ethereum']) {
      provider = window['ethereum'];
      try {
        await window['ethereum'].request({ method: 'eth_requestAccounts' });
      } catch (e: any) {
        console.log(e);
        if (e.code === 4001 || e.code === -32002) return;
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async autoConnect() {
    let provider;

    if (window['ethereum']) {
      provider = window['ethereum'];
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }

    const accounts = await provider.request({ method: 'eth_accounts' });

    return accounts.length > 0 ? provider : null;
  }

  async isLoggedIn() {
    if (!window['ethereum']) return false;
    if (window['ethereum'].request({ method: 'eth_accounts' })) return true;
    await new Promise(r => setTimeout(r, 400));
    return !!window['ethereum'].request({ method: 'eth_accounts' });
  }
}
