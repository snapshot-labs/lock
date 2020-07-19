export default class Connector {
    options: any;
    constructor(options: string);
    connect(): void;
    logout(): boolean;
    isLoggedIn(): boolean;
}
