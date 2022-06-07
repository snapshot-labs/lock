import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['bitkeep'] && window['bitkeep']['ethereum']) {
      provider = window['bitkeep']['ethereum']
      try {
        await provider.enable();
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
    if (!window['bitkeep'] && window['bitkeep']['ethereum']) return false;
    if (window['bitkeep']['ethereum'].selectedAddress) return true;
    await new Promise((r) => setTimeout(r, 400));
    return !!window['bitkeep']['ethereum'].selectedAddress;
  }
}
