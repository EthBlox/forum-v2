import React, { useState, useEffect, useRef } from 'react';
import { 
  getNFTTokenIDs, 
  getExternalNFTMetadata, 
  getHistoricalPortfolioValueOverTime,
  getTokenBalancesForAddress
} from '../pages/api/classA';
import {
  ETHEREUM
} from '../pages/api/constants';
import { getTokenMetaData } from '../pages/api/queries';
import { getCollectionsData } from '../pages/api/queries';
import Image from 'next/image';
import Link from 'next/link';

const Collections = ({ address, loadCollections, collectionsLoaded, index, onClick }) => {

  const [collections, setCollections] = useState(loadCollections);
  const [isLoading, setIsLoading] = useState(false);
  const queryAddress = address;
  const chainID = ETHEREUM;
  console.log(index);

  useEffect(() => {
    const createCollection = async () => {
      setIsLoading(true);
      console.log('running');
      console.log(queryAddress);
      const collections = await getCollectionsData(queryAddress);
      console.log(collections);
      console.log('completed');
      setCollections(collections);
      collectionsLoaded(collections);
    };
    if (collections == null) {
      createCollection();
    } else {
      console.log("collection loaded");
    }
  }, []);

  const clickedCollection = (e) => {
    console.log('hello');
    const selectedAddress = e.currentTarget.getAttribute('contract');
    onClick(selectedAddress);
  };



  const renderData = () => {

    return (
      <>
        {collections?.slice(index.prev, index.current)?.map( (collection) => (
          <div className="gallery" >
              <Image 
                src={collection.featured_image_url} 
                width="600" 
                height="400" 
                onClick={clickedCollection} 
                contract={collection.primary_asset_contracts[0].address} 
              />
          <div className="desc">{collection.name}</div>
        </div> ))}

      </>
    )
  }
  return renderData();
}

export default Collections;