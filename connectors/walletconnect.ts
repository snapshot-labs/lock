import LockConnector from '../src/connector';
import { EIP1193Provider } from '../src/types';

let provider: any;
export default class Connector extends LockConnector {
  async connect(): Promise<EIP1193Provider | undefined> {
    try {
      const imports = await import(
        "@walletconnect/ethereum-provider"!
      );
      const { EthereumProvider } = imports;

      provider = await EthereumProvider.init(this.options);
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = "walletconnect";
    return provider;
  }

  removeHashFromLocalStorage() {
    if (!localStorage) return;

    const wcKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      if (key.startsWith('wc@2:')) {
        wcKeys.push(key);
      }
    }

    wcKeys.forEach(key => localStorage.removeItem(key));
  }

  logout(): boolean {
    if ('disconnect' in provider) {
      provider.disconnect().catch(this.removeHashFromLocalStorage);
      provider = null;
    } else {
      this.removeHashFromLocalStorage();
    }

    return true;
  }
}
