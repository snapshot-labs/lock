import LockConnector from '../src/connector';
import { EIP1193Provider, EIP6963ProviderDetail, EIP6963AnnounceProviderEvent, EIP6963RequestProviderEvent } from '../src/types'

const PREFERRED_PROVIDER_KEY = 'lock-preferred-injected-provider'

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": EIP6963AnnounceProviderEvent;
  }
}

export default class Connector extends LockConnector {
  providerDetails: EIP6963ProviderDetail[] = []

  constructor(options: string) {
    super(options);

    window.addEventListener("eip6963:announceProvider", (event: EIP6963AnnounceProviderEvent) => {
      this.providerDetails.push(event.detail);
    });

    window.dispatchEvent(new EIP6963RequestProviderEvent());
  }

  async connect(): Promise<EIP1193Provider | undefined> {
    let provider = this.getProvider();

    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts' })
      } catch (e: any) {
        if (e.message.includes("Already processing eth_requestAccounts")) {
          try {
            await provider.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            });
          } catch (e: any) {
            if (e.code === 4001 || e.code === -32002) return;
          }
        }

        if (e.code === 4001 || e.code === -32002) return;
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider as EIP1193Provider;
    }

    return provider;
  }

  async isLoggedIn(): Promise<boolean> {
    let provider = this.getProvider();

    if (!provider) return false;
    if (await provider.request({method: 'eth_accounts'})) return true;

    await new Promise((r) => setTimeout(r, 400));

    return !!(await provider.request({method: 'eth_accounts'}));
  }

  getProvider(): EIP1193Provider | undefined {
    const preferredProvider = localStorage.getItem(
      PREFERRED_PROVIDER_KEY
    );

    return (
      this.providerDetails.find(detail => detail.info.rdns === preferredProvider)?.provider
      || (window['ethereum'] as EIP1193Provider)
    );
  }
}
