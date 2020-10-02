// @ts-ignore
const get = () => import(/* webpackChunkName: "torus" */ '@toruslabs/torus-embed'); // v^1.8.5
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const Torus = (await get()).default;
      const torus: any = new Torus();
      await torus.init({ showTorusButton: false });
      await torus.login(); 
      provider = torus.provider;
      return;
    } catch (e) {
      console.error(e);
    }
    return provider;
  }
}
