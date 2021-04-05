// @ts-ignore
const get = () => import(/* webpackChunkName: "portis" */ '@portis/web3'); // v2.0.0-beta.49
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const Portis = (await get()).default;
      const portis: any = new Portis(this.options.dappId, this.options.network);
      await portis.provider.enable();
      // @ts-ignore
      portis.provider._portis = portis;
      provider = portis.provider;
    } catch (e) {
      console.error(e);
    }
    return provider;
  }
}
