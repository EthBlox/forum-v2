import React from 'react';
import CeramicClient from '@ceramicnetwork/http-client';
import KeyDidResolver from 'key-did-resolver';
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import { DID } from 'dids';
import { randomBytes } from '@stablelib/random';

const seed = randomBytes(32);
const provider = new Ed25519Provider(seed)

// const API_URL = "http://localhost:7007"

// const client = new CeramicClient(API_URL);

// const resolver = { ...KeyDidResolver.getResolver(),
//                    ...ThreeIdResolver.getResolver(ceramic) };

// const did = new DID({ resolver });

// ceramic.did = did;



const Authenticate = () => {

    const threeIdConnect = new ThreeIdConnect()
    const addresses = await window.ethereum.enable()

    // connects wallet to 3ID connect
    const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])

    await threeIdConnect.connect(authProvider);

    // interact with libraries that require DID auth, signing, encryption
    const didProvider = await threeIdConnect.getDidProvider();

    console.log(didProvider);
}


export default Authenticate;