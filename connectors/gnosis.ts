import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      if (window?.parent === window) {
        return;
      }

      let SafeAppsSDK = await import('@gnosis.pm/safe-apps-sdk'!);
      if (SafeAppsSDK?.default) SafeAppsSDK = SafeAppsSDK.default;
      if (SafeAppsSDK?.default) SafeAppsSDK = SafeAppsSDK.default;

      const sdk = new SafeAppsSDK();
      const safe = await sdk.safe.getInfo();

      let SafeAppProvider = await import('@gnosis.pm/safe-apps-provider'!);
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
