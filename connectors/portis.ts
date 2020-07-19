// @ts-ignore
import Portis from '@portis/web3';
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const portis = new Portis(this.options.dappId, this.options.network);
      await portis.provider.enable();
      portis.provider._portis = portis;
      provider = portis.provider;
    } catch (e) {
      console.error(e);
    }
    return provider;
  }
}
