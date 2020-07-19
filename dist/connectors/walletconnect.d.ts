import LockConnector from '../connector';
export default class Connector extends LockConnector {
    connect(): Promise<any>;
    logout(): void;
}
