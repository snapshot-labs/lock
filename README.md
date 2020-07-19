# Lock.js

A lightweight JavaScript library for log in to Ethereum.

### Install
To install Lock.js, open your terminal and run:
```
npm install @bonustrack/lock
```

#### Browser
You can create an index.html file and include Lock.js with:
```html
<script src="https://cdn.jsdelivr.net/npm/@bonustrack/lock"></script>
```

### Usage
```js
import { Lock } from '@bonustrack/lock';
import injected from '@bonustrack/lock/connectors/injected';
import walletconnect from '@bonustrack/lock/connectors/walletconnect';

// Init Lock
const lock = new Lock();

// Add injected connector
lock.addConnector({
  key: 'injected',
  connector: injected
});

// Add WalletConnect connector
lock.addConnector({
  key: 'walletconnect',
  connector: walletconnect,
  options: {
    infuraId: 'c00cb721...'
  }
});

// Log in with injected web3
let connector = lock.getConnector('injected');
connector.connect('injected').then(provider => {
  console.log('Log in successful');
  provider.getBlockNumber().then(blockNumber => {
    console.log('Block number', blockNumber);
  });
});

// Log out from WalletConnect
connector = lock.getConnector('walletconnect');
connector.logout().then(() => {
  console.log('Log out successful');
});

// Is logged in?
connector.isLoggedIn().then(isLoggedIn => {
  console.log('Is logged in?', isLoggedIn);
});
```

## License

[MIT](LICENSE).
