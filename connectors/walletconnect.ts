import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
  let provider;
    try {
      const WalletConnectProvider = await import(
        "@walletconnect/web3-provider/dist/umd/index.min.js"!
      );
      provider = new WalletConnectProvider.default(this.options);
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = "walletconnect";
    return provider;
  }


  logout() {
    if (localStorage) {
      localStorage.removeItem('walletconnect');
    }
    return;
  }
}
