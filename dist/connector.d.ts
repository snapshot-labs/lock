export default class Connector {
    options: any;
    constructor(options: string);
    connect(): any;
    logout(): any;
    isLoggedIn(): boolean;
}
