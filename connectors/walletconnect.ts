// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      provider = new WalletConnectProvider(this.options);
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    return provider;
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem('walletconnect');
    }
    return;
  }
}
