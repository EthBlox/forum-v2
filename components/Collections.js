import React, { useState, useEffect } from 'react';
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

const Collections = ({ address, loadCollections, collectionsLoaded }) => {

  const [collections, setCollections] = useState(loadCollections);
  const [isLoading, setIsLoading] = useState(false);
  const queryAddress = address;
  const chainID = ETHEREUM;

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
    }
  }, []);



  const renderData = () => {

    return (
      <>
        {collections?.map( (collection) => (
          <div className="gallery" key={Math.round(Math.random()*100)}>
              <Image src={collection.featured_image_url} width="600" height="400" />
          <div className="desc">{collection.name}</div>
        </div> ))}

      </>
    )
  }
  return renderData();
}

export default Collections;