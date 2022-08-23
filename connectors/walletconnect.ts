import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
  let provider;
    try {
      
      let WalletConnectProvider = await import(
        "@walletconnect/web3-provider/dist/umd/index.min.js"!
      );
      if (WalletConnectProvider?.default) WalletConnectProvider = WalletConnectProvider.default;
      if (WalletConnectProvider?.default) WalletConnectProvider = WalletConnectProvider.default;
      provider = new WalletConnectProvider(this.options);
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
