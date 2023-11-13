import LockConnector from '../src/connector';

let provider: any;
export default class Connector extends LockConnector {
  async connect() {
    try {
      console.log('hi, this is walletconnect.ts')
      const imports = await import(
        "@walletconnect/ethereum-provider"!
      );
      const { EthereumProvider } = imports;

      provider = await EthereumProvider.init(this.options);
      provider.request = async (params: any) => {
        console.log("walletconnect request", params);
        return provider.request({ ...params, expiry: 86400 });
      }
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = "walletconnect";
    return provider;
  }
  request = async (params: any) => {
    if (!provider) return;
    console.log("walletconnect request", params);
    return provider.request({ ...params, expiry: 86400 });
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
