import React, { useState, useEffect, useRef } from 'react';
import { 
  getNFTTokenIDs, 
  getExternalNFTMetadata, 
  getHistoricalPortfolioValueOverTime,
  getTokenBalancesForAddress
} from '../src/pages/api/classA';
import {
  ETHEREUM
} from '../src/pages/api/constants';
import { getTokenMetaData } from '../src/pages/api/queries';
import { getCollectionsData } from '../src/pages/api/queries';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'ui-neumorphism';
import Grid from '@material-ui/core/Grid';
import Loading from '../components/Loading';


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
      for (let i=0; i<collections.length; i++) {
        if (collections[i].primary_asset_contracts.length == 0) {
          collections.splice(i, 1);
          }
        }
      
      console.log(collections);
      console.log('completed');
      setCollections(collections);
      collectionsLoaded(collections);
      setIsLoading(false);
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
    if (isLoading) {
      return <Loading />
    }

    return (
      <>
        <Grid container spacing={0} >
        {collections?.slice(index.prev, index.current)?.map( (collection) => (
          <Grid item xs={6} >
            <div className="profile_cards">
              <div className="profile_card ">
                <img 
                  className="profile_card__image "
                  src={collection.featured_image_url == null ? collection.image_url : collection.featured_image_url} 
                  onClick={clickedCollection} 
                  contract={collection.primary_asset_contracts[0].address} 
                />
                <div className="profile_card__overlay ">
                  <div className="profile_card__header ">
                    <svg className="profile_card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                    <img className="profile_card__thumb " src="https://devforum.roblox.com/uploads/default/original/4X/c/5/f/c5fc157827728c0030ce41031b1deeb3826b751e.png " alt=" " />
                    <div className="profile_card__header-text ">
                      <h3 className="profile_card__title ">{collection.name}</h3>
                      <span className="profile_card__status ">
                        {collection.primary_asset_contracts[0].address.slice(0,6) + '...' + collection.primary_asset_contracts[0].address.slice(-4)}
                      </span>
                    </div>
                  </div>
                  <p className="profile_card__description ">
                  <Link
                    href={{
                      pathname: "/chatroom/[id]",
                      query: {
                        image_url: collection.featured_image_url,
                        name: collection.name,
                        chain: ETHEREUM,
                        user: queryAddress
                      }
                    }}
                    as={`/chatroom/${collection.primary_asset_contracts[0].address}`}
                  >
                    <Button>Chat Room</Button>
                  </Link>
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        ))}
        </Grid>

      </>
    )
  }
  return renderData();
}

export default Collections;