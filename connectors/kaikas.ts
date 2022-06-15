import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['klaytn']) {
      provider = window['klaytn'];
      try {
        await window['klaytn'].enable();
      } catch (e) {
        console.error(e);
        // Return when the error is Error: User denied account authorization
        if (e.code === -32603) return;
      }
    } else if (window['caver']) {
      provider = window['caver'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    if (!window['klaytn']) return false;
    if (window['klaytn'].selectedAddress) return true;
    await new Promise((r) => setTimeout(r, 400));
    return !!window['klaytn'].selectedAddress;
  }
}
