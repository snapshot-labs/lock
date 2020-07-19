import Connector from './connector';
export default class Lock {
    connectors: {};
    options: {};
    addConnector(connector: any): void;
    getConnector(key: string): Connector;
}
