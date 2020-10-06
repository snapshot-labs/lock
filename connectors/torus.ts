// @ts-ignore
const get = () => import(/* webpackChunkName: "torus" */ '@toruslabs/torus-embed'); // v^1.8.5
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const Torus = (await get()).default;
      // @ts-ignore
      const torus = new Torus();
      await torus.init({ showTorusButton: false });
      debugger
      // @ts-ignore
      await torus.login(); 
      debugger
      const handler = {
        get: function(target, prop, receiver) {
          if (prop === 'mux') {
            return undefined
          } else {
            return target[prop]
          }
        }
      };
      Object.defineProperty(torus.provider, 'mux', { value: torus.provider.mux, enumerable: false })
      provider = torus.provider
    } catch (e) {
      console.error(e);
    }
    return provider;
  }
}
