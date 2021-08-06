import CeramicClient from '@ceramicnetwork/http-client';
// authentication to perform writes with client
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { IDX } from '@ceramicstudio/idx';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
// creating a did instance
import { DID } from 'dids';


// default module to export
const ceramicProvider = CeramicClient.default ? CeramicClient.default : CeramicClient;
const threeIdResolver = ThreeIdResolver.default ? ThreeIdResolver.default : ThreeIdResolver;

async function client({
  // clay testnet
  // https://gateway.ceramic.network for mainnet
  endpoint = "https://ceramic-clay.3boxlabs.com",
  resolvers = null,
  address = '',
  provider = null,
  ceramicClient = null
} = {}) {
  let ceramic;

  if (!window.ethereum) return {
    error: "No ethereum wallet detected"
  }

  if (!ceramicClient) {
    ceramic = new ceramicProvider(endpoint);
    console.log('Created new Ceramic');
  } else {
    ceramic = ceramicClient;
  }

  if (!resolvers) {
    resolvers = {
      ...threeIdResolver.getResolver(ceramic)
    }
  } else {
    resolvers = resolvers.reduce((acc, next) => {
      if (next.requiresCeramic) {
        let resolver = next.resolver.call(this, ceramic);
        acc = {
          ...acc,
          ...resolver
        };
      } else {
        acc = {
          ...acc,
          ...next.resolver
        }
      }
      return acc
    }, {})
  }

  if (!address) {
    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    address = addresses[0];
  };

  console.log('Connecting');

  const threeIdConnect = new ThreeIdConnect();
  
  console.log("Created new ThreeIdConnect()");

  // requesting authentication with Ethereum wallet
  if (!provider) {
    provider = new EthereumAuthProvider(window.ethereum, address);
  };

  console.log("Created new EthereumAuthProvider()");

  await threeIdConnect.connect(provider);

  console.log("Connected ThreeIdConnect");

  // new DID instance which wraps instance of a DID resolver and DID provider for authentication
  const did = new DID({
    // creates provider instance
    provider: threeIdConnect.getDidProvider(),
    resolver: resolvers
  });

  console.log("Created new DID", did);
  // setting DID instance
  ceramic.setDID(did);
  console.log("Ceramic set DID");

  await ceramic.did.authenticate();
  console.log("Authenticated DID");

  // definition IDs
  // const aliases = {
  //   alias1: 'definitionID 1',
  //   alias2: 'definitionID 2',
  // }
  
  // creating new instance of idx
  const idx = new IDX({ ceramic });

  return {
    ceramic, did, idx, error: null
  }
}

async function readOnlyClient({
  endpoint = "https://ceramic-clay.3boxlabs.com",
  ceramicClient = null,
} = {}) {
  let ceramic;

  if (!window.ethereum) return {
    error: "No ethereum wallet detected"
  }

  if (!ceramicClient) {
    ceramic = new ceramicProvider(endpoint)
  } else {
    ceramic = ceramicClient
  }

  const idx = new IDX({ ceramic })
  return {
    idx, ceramic, error: null
  }
}

const networks = {
  ethereum: 'ethereum',
  bitcoin: 'bitcoin',
  cosmos: 'cosmos',
  kusama: 'kusama'
}
// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md
const caip10Links = {
  // ethereum mainnet
  ethereum: "@eip155:1",
  bitcoin: '@bip122:000000000019d6689c085ae165831e93',
  cosmos: '@cosmos:cosmoshub-3',
  kusama: '@polkadot:b0a8d493285c2df73290dfb7e61f870f'
}

/*
CAIP-10 Account IDs is a blockchain agnostic way to describe an account on any blockchain. This may be an externally owned key-pair account, or a smart contract account. IDX uses CAIP-10s as a way to lookup the DID of a user using a caip10-link streamType in Ceramic. Learn more in the Ceramic documentation.
*/
async function getRecord({
  endpoint = "https://ceramic-clay.3boxlabs.com",
  network = 'ethereum',
  ceramicClient = null,
  schema = 'basicProfile'
} = {}) {
  let ceramic;
  let record;

  if (!window.ethereum) return {
    error: "No ethereum wallet detected"
  }

  if (!ceramicClient) {
    ceramic = new ceramicProvider(endpoint)
  } else {
    ceramic = ceramicClient
  }

  if (network === networks.ethereum) {
    // pass in user addy
    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const address = addresses[0]
    const idx = new IDX({ ceramic })
    // querying record
    const data = await idx.get(schema, `${address}${caip10Links.ethereum}`)
    record = data
  }
  return {
    record, error: null
  }
}

export {
  getRecord,
  readOnlyClient,
  client
}