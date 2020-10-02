// @ts-ignore
const get = () => import(/* webpackChunkName: "torus" */ 'torus'); // v^2.0.6
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
