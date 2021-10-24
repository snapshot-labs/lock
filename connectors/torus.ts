// @ts-ignore
const get = () => import(/* webpackChunkName: "torus" */ '@toruslabs/torus-embed'); // v^1.8.5
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const Torus = (await get()).default;
      const torus = new Torus({});
      await torus.init({ showTorusButton: false });
      await torus.login({});
      provider = torus.provider;
    } catch (e) {
      console.error(e);
    }
    provider.connector = 'torus';
    return provider;
  }
}
