const get = () => import(/* webpackChunkName: "@coinbase/wallet-sdk" */ '@coinbase/wallet-sdk');
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      let CoinbaseWalletSDK = (await get()).default;
       // @ts-ignore
      if (CoinbaseWalletSDK.default) CoinbaseWalletSDK = CoinbaseWalletSDK.default;
      const walletSDK = new CoinbaseWalletSDK(this.options);
      provider = walletSDK.makeWeb3Provider(
        this.options.ethJsonrpcUrl,
        this.options.chainId
      );
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = 'walletlink';
    return provider;
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:id'
      );
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:secret'
      );
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:linked'
      );
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:Addresses'
      );
    }
    return;
  }
}
