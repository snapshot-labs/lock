// @ts-ignore
import WalletLink from 'walletlink';
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const walletLink = new WalletLink(this.options);
      // @ts-ignore
      provider = walletLink.makeWeb3Provider(
        this.options.ethJsonrpcUrl,
        this.options.chainId
      );
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    return provider;
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:Addresses');
    }
    return;
  }
}
