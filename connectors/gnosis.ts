import LockConnector from '../src/connector';
import { EIP1193Provider } from '../src/types';

export default class Connector extends LockConnector {
  async connect(): Promise<EIP1193Provider | undefined> {
    let provider;
    try {
      if (window?.parent === window) {
        return;
      }

      let SafeAppsSDK = await import('@safe-global/safe-apps-sdk'!);
      if (SafeAppsSDK?.default) SafeAppsSDK = SafeAppsSDK.default;
      if (SafeAppsSDK?.default) SafeAppsSDK = SafeAppsSDK.default;

      const sdk = new SafeAppsSDK();
      const safe = await sdk.safe.getInfo();

      let SafeAppProvider = await import('@safe-global/safe-apps-provider'!);
      if (SafeAppProvider?.default) SafeAppProvider = SafeAppProvider.default;
      if (SafeAppProvider?.default) SafeAppProvider = SafeAppProvider.default;
      if (SafeAppProvider?.SafeAppProvider) SafeAppProvider = SafeAppProvider.SafeAppProvider;

      provider = new SafeAppProvider(safe, sdk);
    } catch (e) {
      console.error(e);
    }
    provider.connectorName = 'gnosis';
    return provider;
  }
}
