import LockConnector from '../src/connector';

let provider: any;
export default class Connector extends LockConnector {
  async connect() {
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

  logout() {
    if ('disconnect' in provider) {
      provider.disconnect().catch(this.removeHashFromLocalStorage);
      provider = null;
    } else {
      this.removeHashFromLocalStorage();
    }
  }
}
