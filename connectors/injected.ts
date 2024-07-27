import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['ethereum']) {
      provider = window['ethereum'];
      try {
        await window['ethereum'].request({ method: 'eth_requestAccounts' })
      } catch (e: any) {
        console.error(e);
        if (e.message = "Already processing eth_requestAccounts. Please wait.") {
          try {
            await provider.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            });
          } catch (e: any) {
            console.error(e);
            if (e.code === 4001) return;
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
