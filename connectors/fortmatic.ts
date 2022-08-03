const get = () => import(/* webpackChunkName: "fortmatic" */ 'fortmatic');
import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const Fortmatic = (await get()).default;
      const fm: any = new Fortmatic(this.options.apiKey);
      provider = await fm.getProvider();
      await fm.user.login();
      const isLoggedIn = await fm.user.isLoggedIn();
      if (!isLoggedIn) return;
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = 'fortmatic';
    return provider;
  }
}
