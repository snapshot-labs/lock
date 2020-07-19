export default class Connector {
  public options: any;

  constructor(options: string) {
    this.options = options;
  }

  connect(): any {
    return;
  }

  logout(): any {
    return true;
  }

  isLoggedIn(): boolean {
    return true;
  }
}
