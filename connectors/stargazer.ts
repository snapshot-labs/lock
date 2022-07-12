import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  getProvider(){
    const walletProvider = window['stargazer'];

    if(!walletProvider){
      return null;
    }

    return walletProvider.getProvider('ethereum');
  }

  async connect() {
    const provider = this.getProvider();

    if(!provider){
      return;
    }
    
    try{
      await provider.activate();
    }catch(e){
      console.error(e);
      return;
    }
    
    return provider;
  }

  async isLoggedIn() {
    const ethProvider = this.getProvider();
    return ethProvider !== null && ethProvider.activated;
  }
}
