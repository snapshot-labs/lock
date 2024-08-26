import LockConnector from '../src/connector';
import { EIP1193Provider } from '../src/types';

export default class Connector extends LockConnector {
  async connect(): Promise<EIP1193Provider | undefined> {
    let provider;
    try {
      let CoinbaseWalletSDK = await import(
        "@coinbase/wallet-sdk"!
      )
      if (CoinbaseWalletSDK.default) CoinbaseWalletSDK = CoinbaseWalletSDK.default;
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

  logout(): boolean {
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

    return true;
  }
}
