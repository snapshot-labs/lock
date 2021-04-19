// @ts-ignore
const getSDK = () => import(/* webpackChunkName: "gnosis" */ '@gnosis.pm/safe-apps-sdk'); // v^2.0.0
// @ts-ignore
const getProvider = () => import(/* webpackChunkName: "gnosis" */ '@gnosis.pm/safe-apps-provider'); // v^0.2.4
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const SafeAppsSDK = (await getSDK()).default;
      
      const sdk = new SafeAppsSDK();
      const safe = await sdk.getSafeInfo();
      
      const SafeAppProvider = (await getProvider()).SafeAppProvider;
      provider = new SafeAppProvider(safe, sdk);
    } catch (e) {
      console.error(e);
    }
    return provider;
  }
}
