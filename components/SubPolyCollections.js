import React, { useState, useEffect } from 'react';
import { 
  getExternalNFTMetadata, 
} from '../pages/api/classA';
import {
  MATIC
} from '../pages/api/constants';
import Image from 'next/image';
import Default from '../public/assets/comingSoon.gif';
import { Button } from 'ui-neumorphism';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Loading from '../components/Loading';


const SubCollections = ({ tokenAddress, collections, index }) => {

  console.log(tokenAddress);
  console.log(collections);
  const [ nfts, setNFTs] = useState(null);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createTokens = async (nftData) => {
      console.log('running');
      setIsLoading(true)
      let nftMeta = [];
      for (let i=0; i<nftData.length; i++) {
        console.log(nftData[i].token_id);
        let res = await getExternalNFTMetadata(MATIC, tokenAddress, nftData[i].token_id);
        nftMeta.push(res.data.items[0].nft_data);
      };
      console.log(nftMeta)
      setNFTs(nftMeta);
      setIsLoading(false)

    };
    if (nfts == null) {
      console.log('hi')
      let nftData;
      let nftName;
      for (let i=0; i<collections.length; i++) {
        if (collections[i].contract_address == tokenAddress) {
          nftData = collections[i].nft_data.slice(index.prev, index.current);
          nftName = collections[i].contract_name;
        } 
      };
      setName(nftName);
      console.log(nftData);
      createTokens(nftData);
    } else {
      console.log('bye')
      console.log(nfts)
    }
  }, []);




  const renderData = () => {
    if (isLoading) {
      return <Loading />
    }

    return (
      <>
        <Grid container spacing={0} >
        {nfts?.slice(index.prev, index.current)?.map( (nft) => (
          <Grid item xs={6} >
            <div className="profile_cards">
              <div className="profile_card ">
                <img 
                  className="profile_card__image "
                  src="../assets/comingSoon.gif"  
                />
                <div className="profile_card__overlay ">
                  <div className="profile_card__header ">
                    <svg className="profile_card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                    <img className="profile_card__thumb " src="https://devforum.roblox.com/uploads/default/original/4X/c/5/f/c5fc157827728c0030ce41031b1deeb3826b751e.png " alt=" " />
                    <div className="profile_card__header-text ">
                      <h3 className="profile_card__title ">{name + ' #' + nft[0].token_id}</h3>
                      <span className="profile_card__status ">1 hour ago</span>
                    </div>
                  </div>
                  <p className="profile_card__description ">
                  <Link
                    href={{
                      pathname: "/chatroom/[id]/[comment]",
                      query: {
                        image_url: "",
                        name: name + " #" + nft[0].token_id
                      }
                    }}
                    as={`/chatroom/${tokenAddress}/${nft[0].token_id}`}
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