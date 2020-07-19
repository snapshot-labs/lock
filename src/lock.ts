import Connector from './connector';

export default class Lock {
  public connectors = {};
  public options = {};

  addConnector(connector: any) {
    this.connectors[connector.key] = connector.connector;
    this.options[connector.key] = connector.options;
  }

  getConnector(key: string): Connector {
    const options = this.options[key];
    return new this.connectors[key](options);
  }
}
