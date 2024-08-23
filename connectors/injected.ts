import LockConnector from '../src/connector';

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": EIP6963AnnounceProviderEvent;
  }
}

export class EIP6963RequestProviderEvent extends Event {
  constructor() {
    super("eip6963:requestProvider");
  }
}

export interface EIP6963AnnounceProviderEvent extends Event {
  type: "eip6963:announceProvider";
  detail: EIP6963ProviderDetail;
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

export interface EIP1193Provider {
  request(request: {
    method: string;
    params?: Array<any> | Record<string, any>;
  }): Promise<any>;
}

const PREFERRED_PROVIDER = 'io.metamask';

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
    return this.providerDetails.find(detail => detail.info.rdns === PREFERRED_PROVIDER)?.provider || (window['ethereum'] as EIP1193Provider);
  }
}
