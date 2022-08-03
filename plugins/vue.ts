// @ts-ignore
import Vue from 'vue'; // v^2.6.11
import Lock from '../src/lock';

const name = 'lock';

let instance;

export const getInstance = () => instance;

export const useLock = ({ ...options }) => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        isAuthenticated: false,
        lockClient: null,
        provider: null,
        web3: null
      };
    },
    methods: {
      async login(connector) {
        // @ts-ignore
        const lockConnector = this.lockClient.getConnector(connector);
        const provider = await lockConnector.connect();
        if (provider) {
          localStorage.setItem(`_${name}.connector`, connector);
          this.isAuthenticated = true;
          this.provider = provider;
        }
        return provider;
      },
      async logout() {
        const connector = await this.getConnector();
        if (connector) {
          // @ts-ignore
          const lockConnector = this.lockClient.getConnector(connector);
          await lockConnector.logout();
          localStorage.removeItem(`_${name}.connector`);
          this.isAuthenticated = false;
          this.provider = null;
        }
      },
      async getConnector() {
        const connector: any = localStorage.getItem(`_${name}.connector`);
        if (connector) {
          // @ts-ignore
          const lockConnector = this.lockClient.getConnector(connector);
          const isLoggedIn = await lockConnector.isLoggedIn();
          return isLoggedIn ? connector : false;
        }
        return false;
      }
    },
    async created() {
      const lock = new Lock();
      options.connectors.forEach(connector => {
        lock.addConnector(connector);
      });
      // @ts-ignore
      this.lockClient = lock;
    }
  });

  return instance;
};

export const LockPlugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useLock(options);
  }
};
