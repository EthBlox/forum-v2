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


const SubCollections = ({ tokenAddress, collections, index }) => {

  console.log(tokenAddress);
  console.log(collections);
  const [ nfts, setNFTs] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const createTokens = async (nftData) => {
      console.log('running');
      let nftMeta = [];
      for (let i=0; i<nftData.length; i++) {
        console.log(nftData[i].token_id);
        let res = await getExternalNFTMetadata(MATIC, tokenAddress, nftData[i].token_id);
        nftMeta.push(res.data.items[0].nft_data);
      };
      console.log(nftMeta)
      setNFTs(nftMeta);
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

    return (
      <>
        {nfts?.map( (nft) => (
          <div className="gallery" key={Math.random()*100}>
            <Image 
              src={Default } 
              width="600" 
              height="600" 
            />
          <div className="desc">{name + ' #' + nft[0].token_id}</div>
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
        </div> ))}
      </>
    )
  }
  return renderData();
}

export default SubCollections;