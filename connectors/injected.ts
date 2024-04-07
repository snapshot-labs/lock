import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider = this.getEthProvider();

    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts' })
      } catch (e) {
        console.error(e);
        if (e.code === 4001) return;
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    const provider = this.getEthProvider();

    if (!provider) return false;
    if (provider.request({method: 'eth_accounts'})) return true;
    await new Promise((r) => setTimeout(r, 400));
    return !!provider.request({method: 'eth_accounts'});
  }

  getEthProvider() {
    let provider = window['ethereum'];

    if (window['ethereum'].providers?.length) {
      window['ethereum'].providers.forEach(async (p) => {
        if (p.isMetaMask) provider = p;
      });
    }

    return provider
  }
}
