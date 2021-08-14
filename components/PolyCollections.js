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
import Grid from '@material-ui/core/Grid';
import Loading from '../components/Loading';


const PolyCollections = ({ address, collectionsLoaded, index, onClick }) => {

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
      setIsLoading(false)
    };
    if (collections == null) {
      createCollection();
    }
  }, []);

  const clickedCollection = (e) => {
    console.log('hello');
    const selectedAddress = e.currentTarget.getAttribute('contract');
    console.log(selectedAddress);
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
                  src="../assets/comingSoon.gif"  
                  onClick={clickedCollection} 
                  contract={collection.contract_address} 
                />
                <div className="profile_card__overlay ">
                  <div className="profile_card__header ">
                    <svg className="profile_card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                    <img className="profile_card__thumb " src="https://devforum.roblox.com/uploads/default/original/4X/c/5/f/c5fc157827728c0030ce41031b1deeb3826b751e.png " alt=" " />
                    <div className="profile_card__header-text ">
                      <h3 className="profile_card__title ">{collection.contract_name}</h3>
                      <span className="profile_card__status ">
                        {collection.contract_address.slice(0,6) + '...' + collection.contract_address.slice(-4)}
                      </span>
                    </div>
                  </div>
                  <p className="profile_card__description ">
                  <Link
                    href={{
                      pathname: "/chatroom/[id]",
                      query: {
                        image_url: "",
                        name: collection.contract_name,
                        chain: MATIC
                      }
                    }}
                    as={`/chatroom/${collection.contract_address}`}
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

export default PolyCollections;
