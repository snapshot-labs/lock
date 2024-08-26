import Connector from './connector';

export default class Lock {
  public connectors: Record<string, Connector> = {};
  public options = {};

  addConnector(connector: any) {
    this.connectors[connector.key] = new connector.connector(connector.options);
    this.options[connector.key] = connector.options;
  }

  getConnector(key: string): Connector {
    return this.connectors[key];
  }
}
