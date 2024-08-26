import { EIP1193Provider} from '../src/types'

export default class Connector {
  public options: any;

  constructor(options: any) {
    this.options = options;
  }

  async connect(): Promise<EIP1193Provider | undefined> {
    return;
  }

  logout(): boolean {
    return true;
  }

  async isLoggedIn(): Promise<boolean> {
    return true;
  }
}
