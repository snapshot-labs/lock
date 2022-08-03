const getSDK = () => import(/* webpackChunkName: "gnosis" */ '@gnosis.pm/safe-apps-sdk');
const getProvider = () => import(/* webpackChunkName: "gnosis" */ '@gnosis.pm/safe-apps-provider');
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      if (window?.parent === window) {
        return;
      }

      let SafeAppsSDK = (await getSDK()).default;
      // @ts-ignore
      if (SafeAppsSDK.default)
      // @ts-ignore
      SafeAppsSDK = SafeAppsSDK.default;
      const sdk = new SafeAppsSDK();
      const safe = await sdk.safe.getInfo();
      // @ts-ignore
      const SafeAppProvider = (await getProvider()).default.SafeAppProvider;
      provider = new SafeAppProvider(safe, sdk);
    } catch (e) {
      console.error(e);
    }
    provider.connectorName = 'gnosis';
    return provider;
  }
}
