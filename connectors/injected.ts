import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['ethereum']) {
      provider = window['ethereum'];
      try {
        await window['ethereum'].request({ method: 'eth_requestAccounts' })
      } catch (e: any) {
        if (e.message.includes("Already processing eth_requestAccounts")) {
          try {
            await provider.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            });
          } catch (e: any) {
            if (e.code === 4001 || e.code === -32002) return;
          }
        }

        if (e.code === 4001) return;
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    if (!window['ethereum']) return false;
    if (window['ethereum'].request({method: 'eth_accounts'})) return true;
    await new Promise((r) => setTimeout(r, 400));
    return !!window['ethereum'].request({method: 'eth_accounts'});
  }
}
