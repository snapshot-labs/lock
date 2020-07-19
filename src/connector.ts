export default class Connector {
  public options: any;

  constructor(options: string) {
    this.options = options;
  }

  connect() {
    return;
  }

  logout() {
    return true;
  }

  isLoggedIn(): boolean {
    return true;
  }
}
