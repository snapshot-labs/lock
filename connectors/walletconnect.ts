import LockConnector from '../src/connector';

let provider: any;
export default class Connector extends LockConnector {
  async connect() {
    try {
      const imports = await import(
        "@walletconnect/ethereum-provider"!
      );
      const { EthereumProvider } = imports;
      EthereumProvider.request = (...args) => {
        console.log('WalletConnect request', args);
        return EthereumProvider.request(...args, 86400)
      };
      EthereumProvider.sendAsync = (...args) => {
        console.log('WalletConnect sendAsync', args);
        return EthereumProvider.sendAsync(...args)
      };

      provider = await EthereumProvider.init(this.options);

      await provider.enable();
      console.log('WalletConnect connected');
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

  logout() {
    if ('disconnect' in provider) {
      provider.disconnect().catch(this.removeHashFromLocalStorage);
      provider = null;
    } else {
      this.removeHashFromLocalStorage();
    }
  }
}
