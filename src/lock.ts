import Connector from './connector';

export default class Lock {
  public connectors = {};
  public options = {};

  addConnector(key: string, connector: Connector, options = {}) {
    this.connectors[key] = connector;
    this.options[key] = options;
  }

  getConnector(key: string): Connector {
    const options = this.options[key];
    return new this.connectors[key](options);
  }
}
