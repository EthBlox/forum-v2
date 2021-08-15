import CeramicClient from "@ceramicnetwork/http-client";
import { IDX } from '@ceramicstudio/idx'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import KeyDidResolver from 'key-did-resolver'
import type { ResolverRegistry } from 'did-resolver'
import { DID } from 'dids'
import { definitions } from '../src/config.json';
import {
  client,
  getRecord
} from '../utils/identity';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'

// const CERAMIC_URL = 'http://localhost:7007'

const CERAMIC_URL = "https://ceramic-clay.3boxlabs.com";

export type NoteItem = {
  id: string
  title: string
}

export type NotesList = { notes: Array<NoteItem> }

export type IDXInit = NotesList & {
  ceramic: CeramicClient
  idx: IDX
}

export async function getIDX(): Promise<IDXInit> {
  // Create the Ceramic instance and inject provider
  const ceramic = new CeramicClient(CERAMIC_URL); 
  console.log('Created new Ceramic');
  const keyDidResolver = KeyDidResolver.getResolver();
  const threeIdResolver = ThreeIdResolver.getResolver(ceramic);
  let address = '';
  let provider = null;

  if (!address) {
    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    address = addresses[0];
  };

  console.log('Connecting');

  const resolverRegistry: ResolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver,
  }

  const threeIdConnect = new ThreeIdConnect();
  console.log("Created new ThreeIdConnect()");

  if (!provider) {
    provider = new EthereumAuthProvider(window.ethereum, address);
  };

  console.log("Created new EthereumAuthProvider()");

  await threeIdConnect.connect(provider);

  console.log("Connected ThreeIdConnect");

  const did = new DID({
    provider: threeIdConnect.getDidProvider(),
    resolver: resolverRegistry,
  })

  await did.authenticate()
  console.log("Authenticated DID");

  await ceramic.setDID(did)
  console.log("Ceramic set DID");

  // Create the IDX instance with the definitions aliases from the config
  const idx = new IDX({ ceramic, aliases: definitions })

  console.log(idx.id)
  console.log('creating Caip10Link for DID')

  const ethProvider = window.ethereum

  const ethAuthProvider = new EthereumAuthProvider(
    ethProvider, address)

  // const accountID = address + '@eip155:1';
  const accountId = await ethAuthProvider.accountId()

  const link = await Caip10Link.fromAccount(ceramic, accountId);
  console.log(link);
  // if (link.did == null) {
  //   throw new Error(`No DID found for ${address}`)
  // }

  console.log('Caip10Link created')

  await link.setDid(idx.id, provider)
  console.log('Caip10Link set DID')

  // Load the existing notes
  const notesList = await idx.get<{ notes: Array<NoteItem> }>('notes')
  return { ceramic, idx, notes: notesList?.notes ?? [] }
}
