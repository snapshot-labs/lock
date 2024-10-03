export default class Connector {
  public options: any;

  constructor(options: string) {
    this.options = options;
  }

  async connect() {
    return;
  }

  async autoConnect(): Promise<any> {
    return this.connect();
  }

  logout(): any {
    return true;
  }

  async isLoggedIn(): Promise<boolean> {
    return true;
  }
}
