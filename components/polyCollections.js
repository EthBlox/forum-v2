import React, { useState, useEffect } from 'react';
import { 
  getNFTTokenIDs, 
  getExternalNFTMetadata, 
  getHistoricalPortfolioValueOverTime,
  getTokenBalancesForAddress
} from '../pages/api/classA';
import {
  MATIC
} from '../pages/api/constants';
import { getTokenMetaData } from '../pages/api/opensea';
import Image from 'next/image';

const Collections = ({ address, collectionsLoaded, loaded, importCollections }) => {

  const [collections, setCollections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryAddress = address;
  const chainID = MATIC;

  const getHistoricalPortfolioValueOverTimeHandler = async () => {
    console.log('running');
    const res = await getHistoricalPortfolioValueOverTime(chainID, queryAddress, {});
    console.log(res);
    console.log('completed');
  };

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

  const getTokenMetaDataHandler = async (collections) => {
    console.log('running');
    for (let i=0; i<collections.length; i++) {
      collections[i].contract_address
    } 
    const res = await getTokenMetaData(contractAddress, tokenID);
    console.log(res);
    console.log('completed');
  }



  // const getTokenBalancesForAddressHandler = async () => {
  //   console.log('running');
    // const res = await getTokenBalancesForAddress(1, '0x7E99611Cf208CB097497a59b3FB7Cb4dFd115Ea9', {
    //   nft: true,
    //   "no-nft-fetch": true,
    //   match : {
    //     "$or":[
    //           {
    //             "supports_erc":
    //               {"$elemmatch":"erc721"}
    //           },
    //           {
    //             "supports_erc":
    //               {"$elemmatch":"erc1155"}
    //           }
    //        ]
    //   }
    // });
  //   console.log('completed');
  //   let arr = res.data.items;
  //   let collections = [];
  //   for (let i=0; i<arr.length; i++) {
  //     if (arr[i]?.supports_erc?.length > 1) {
  //       collections.push(arr[i]);
  //     }
  //   }
  //   console.log(collections);
  //   console.log('completed');
  //   return collections;
  // };

  useEffect(() => {
    const createCollection = async () => {
      setIsLoading(true);
      console.log('running');
      const res = await getTokenBalancesForAddress(1, '0x7E99611Cf208CB097497a59b3FB7Cb4dFd115Ea9', {
        nft: true,
        "no-nft-fetch": true,
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
      let arr = res.data.items;
      let collections = [];
      for (let i=0; i<arr.length; i++) {
        if (arr[i]?.supports_erc?.length > 1) {
          collections.push(arr[i]);
        }
      }
      console.log(collections);
      console.log('completed');
      setCollections(collections);
      getTokenMetaDataHandler(collections);
      console.log(collections[0].logo_url);
      collectionsLoaded(true, collections);
      return collections;
    };
    if (collections == null && !loaded) {
      createCollection();
      setIsLoading(false);
    } else {
      setCollections(importCollections);
    }

  }, []);



  const renderData = () => {

    return (
      <>
        {collections?.map( (collection) => (
          <div className="gallery" key={Math.round(Math.random()*100)}>
            <a target="_blank" href="../images/SupDuck.png">
            <Image src={collection.logo_url} width="600" height="400" />
            </a>
          <div className="desc">{collection.contract_name}</div>
        </div> ))}

      </>
    )
  }
  return renderData();
}

export default Collections;