const get = () => import(/* webpackChunkName: "walletconnect" */ '@walletconnect/web3-provider');
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      let WalletConnectProvider = (await get()).default;
      if (WalletConnectProvider.default)
        WalletConnectProvider = WalletConnectProvider.default;
      provider = new WalletConnectProvider(this.options);
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = 'walletconnect';
    return provider;
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem('walletconnect');
    }
    return;
  }
}
