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
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'ui-neumorphism';
import Grid from '@material-ui/core/Grid';
import Loading from '../components/Loading';


const SubCollections = ({ address, tokenAddress, index }) => {

  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryAddress = address;
  console.log(index);

  useEffect(() => {
    const createTokens = async () => {
      setIsLoading(true);
      console.log('running');
      console.log(queryAddress);
      const tokens = await getTokenMetaData(queryAddress, tokenAddress)
      console.log(tokens.assets);
      setTokens(tokens.assets);
      console.log('completed');
      setIsLoading(false);
    };
    if (tokens == null) {
      createTokens();
    }
  }, []);




  const renderData = () => {
    if (isLoading) {
      return <Loading />
    }

    return (
      <>
        <Grid container spacing={0} >
          {tokens?.slice(index.prev, index.current)?.map( (token) => (
            <Grid item xs={6} >
              <div className="profile_cards">
                <div className="profile_card ">
                  <img 
                    className="profile_card__image "
                    src={token.image_url}  
                  />
                  <div className="profile_card__overlay ">
                    <div className="profile_card__header ">
                      <svg className="profile_card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                      <img className="profile_card__thumb " src="https://devforum.roblox.com/uploads/default/original/4X/c/5/f/c5fc157827728c0030ce41031b1deeb3826b751e.png " alt=" " />
                      <div className="profile_card__header-text ">
                        <h3 className="profile_card__title ">{token.name}</h3>
                        <span className="profile_card__status ">1 hour ago</span>
                      </div>
                    </div>
                    <p className="profile_card__description ">
                    <Link
                      href={{
                        pathname: "/chatroom/[id]/[comment]",
                        query: {
                          image_url: token.image_url,
                          name: token.name
                        }
                      }}
                      as={`/chatroom/${tokenAddress}/${token.token_id}`}
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

export default SubCollections;