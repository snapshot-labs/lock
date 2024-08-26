const get = () => import(/* webpackChunkName: "portis" */ '@portis/web3/umd');
import LockConnector from '../src/connector';
import { EIP1193Provider } from '../src/types';

export default class Connector extends LockConnector {
  async connect(): Promise<EIP1193Provider | undefined> {
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
    provider.connectorName = 'portis';
    return provider;
  }
}
