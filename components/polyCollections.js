import React, { useState, useEffect } from 'react';
import { 
  getNFTTokenIDs, 
  getExternalNFTMetadata, 
  getTokenBalancesForAddress
} from '../pages/api/classA';
import {
  MATIC
} from '../pages/api/constants';
import Image from 'next/image';
import Default from '../public/assets/comingSoon.gif';
import getImage from './getImage';
import { Button } from 'ui-neumorphism';
import Link from 'next/link';


const PolyCollections = ({ address, collectionsLoaded, onClick }) => {

  const [collections, setCollections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryAddress = address;
  const demoAddress = '0xbba2379F5cc9A2f248C5Cf18aD72379AE2478F42';
  const chainID = MATIC;
  const DefaultImg = false;

  const getExternalNFTMetadataHandler = async () => {
    console.log('running');
    const res = await getExternalNFTMetadata(chainID, queryAddress, 1, {});
    console.log('completed');
  };

  const getNFTTokenIDsHandler = async () => {
    console.log('running');
    const res = await getNFTTokenIDs(chainID, queryAddress, {});
    console.log('completed');
  };

  useEffect(() => {
    const createCollection = async () => {
      setIsLoading(true);
      console.log('running');
      const collections = [];
      const res = await getTokenBalancesForAddress(chainID, demoAddress, {
        nft: true,
        'no-nft-fetch': true,
        // match : {
        //   "$or":[
        //         {
        //           "supports_erc":
        //             {"$elemmatch":"erc721"}
        //         },
        //         {
        //           "supports_erc":
        //             {"$elemmatch":"erc1155"}
        //         }
        //      ]
        // }
      });
      console.log('completed');
      const tokens = res.data.items;
      console.log(tokens);
      for (let i=0; i<tokens.length; i++) {
        if (tokens[i].supports_erc.includes("erc721") && tokens[i].balance != null){
          collections.push(tokens[i]);
        }
      }
      console.log(collections)
      setCollections(collections);
      collectionsLoaded(collections);
    };
    if (collections == null) {
      createCollection();
      setIsLoading(false);
    }
  }, []);

  const clickedCollection = (e) => {
    console.log('hello');
    const selectedAddress = e.currentTarget.getAttribute('contract');
    console.log(selectedAddress);
    onClick(selectedAddress);
  };


  const renderData = () => {

    return (
      <>
        {collections?.map( (collection) => (
          <div className="gallery" key={Math.round(Math.random()*100)}>
            <Image 
              // src={collection.logo_url == "" ? getImage(collection?.contract_address, collection?.nft_data[0]?.token_id) : Default}
              src = {Default} 
              width="600" 
              height="400" 
              onClick={clickedCollection} 
              contract={collection.contract_address} 
            />
          <div className="desc">{collection.contract_name}</div>
          <Link
            href={{
              pathname: "/chatroom/[id]",
              query: {
                image_url: "",
                name: collection.contract_name
              }
            }}
            as={`/chatroom/${collection.contract_address}`}
          >
          <Button>Chat Room</Button>
          </Link>   
        </div> ))}
      </>
    )
  }
  return renderData();
}

export default PolyCollections;