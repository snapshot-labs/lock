import LockConnector from '../src/connector';
import { EIP1193Provider } from '../src/types';

export default class Connector extends LockConnector {
  getProvider(): Promise<EIP1193Provider | undefined> {
    const walletProvider = window['stargazer'];

    if(!walletProvider){
      return;
    }

    return walletProvider.getProvider('ethereum');
  }

  async connect() {
    const provider = this.getProvider();

    if(!provider){
      return;
    }

    try {
      await provider.activate();
    } catch(e) {
      console.error(e);
      return;
    }

    return provider;
  }

  async isLoggedIn() {
    const ethProvider = this.getProvider();
    return ethProvider !== null && ethProvider.activated;
  }
}
