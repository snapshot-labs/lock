# Lock.js

A lightweight JavaScript library for log in to Ethereum.

### Install
To install Lock.js, open your terminal and run:
```
npm install github:snapshot-labs/lock
```

#### Browser
You can create an index.html file and include Lock.js with:
```html
<script src="https://cdn.jsdelivr.net/npm/@snapshot-labs/lock"></script>
```

### Usage
```js
import { Lock } from '@snapshot-labs/lock';
import injected from '@snapshot-labs/lock/connectors/injected';
import walletconnect from '@snapshot-labs/lock/connectors/walletconnect';

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
const connector = lock.getConnector('injected');
const provider = await connector.connect('injected');

// Log out from WalletConnect
const connector = lock.getConnector('walletconnect');
await connector.logout();

// Is logged in?
const isLoggedIn = await connector.isLoggedIn();
```

## License

[MIT](LICENSE).
