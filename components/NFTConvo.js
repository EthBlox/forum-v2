import React,  {useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Kongz from '../public/assets/CyberKong.png';
import Default from '../public/assets/comingSoon.gif';
import CeramicClient from '@ceramicnetwork/http-client';
// authentication to perform writes with client
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { IDX } from '@ceramicstudio/idx';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
// creating a did instance
import { DID } from 'dids';
import { definitions } from '../src/config.json';
import {Button} from 'ui-neumorphism';
import { TileDocument } from '@ceramicnetwork/stream-tile';


const NFTConvo = (desc) => {
  const [description, setDescription] = useState(null);
  console.log(desc.desc);
  const user = desc.desc.user;
  const image = desc.desc.image_url;  
  const name = desc.desc.name;
  const URL = "https://theconvo.space/embed/dt?url=https%3A%2F%2Fethblox.on.fleek.co%2Ffrontend%2Fprofile.html%3F&threadId=";
  let threadID;
  if (desc.desc.comment == undefined) {
    threadID = desc.desc.id;
  } else {
    threadID = "" + desc.desc.id + desc.desc.comment;
  }
  const chain = desc.desc.chain;
  let openSeaURL = "https://opensea.io/assets/";

  if (chain == "1") {
    if (desc.desc.comment != undefined ) {
      openSeaURL = openSeaURL + desc.desc.id + '/' + desc.desc.comment;
    } 
  } else {
    openSeaURL = openSeaURL + 'matic' + '/'
    if (desc.desc.comment != undefined ) {
      openSeaURL = openSeaURL + desc.desc.id + '/' + desc.desc.comment;    
    }
  };


  console.log(desc.desc.comment);
  console.log(desc.desc.id)
  console.log(threadID)
  const chatRoomLink = `${URL}${threadID}`;

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



  async function getRecord({
    endpoint = "https://ceramic-clay.3boxlabs.com",
    } = {}) {

    const ceramic = new CeramicClient(endpoint)

    const idx = new IDX({ ceramic, aliases: definitions })
    // querying record
    console.log(user);
    try {
      const data = await idx.get('notes', `${user}${caip10Links.ethereum}`)
      const streamId = data.notes[0].id.slice(10)
      
      const stream = await ceramic.loadStream(streamId);
      console.log(stream);

      const doc = await TileDocument.load(ceramic, streamId)
      console.log(doc)

      const description = doc.state.content.text;
      setDescription(description);

    } catch (err) {
      console.log(err);
    }

  }


  return (
    <>
      <div className="nft-page-container">
        <div className="nft-image-container">
          <a className="#">
            <img  src = {image == "" ? Default : image} width={800} height={600} />
          </a>
        </div>
        <div className="nft-info-container">
          <div className="nft-name">
              <h3 className="nft-h3">{name}</h3>
          </div>
          <div className="nft-description">
            <p>{ description !== null ? description : "No existing definitions, create one!"}</p>
            <Button onClick={getRecord}>generate</Button>
            <p>
              <Link 
                href={{
                  pathname: "/edit",
                  query: {
                    collectionID: threadID,
                  }
                }}
                >
                Edit Description
              </Link>
            </p>
            <Link href={openSeaURL}>
              For more information head to OpenSea
            </Link>
          </div>
        </div>
      </div>
      <div className="nft-comments-container">
        <iframe 
          src= {chatRoomLink}
          allowtransparency="true" 
          style={{border: "10px ridge grey"}}
          className="theConvoSpace"
        >
            Chat
        </iframe>
      </div>  
    </>
  )
};

export default NFTConvo;