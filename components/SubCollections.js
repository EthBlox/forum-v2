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
    };
    if (tokens == null) {
      createTokens();
      setIsLoading(false);
    }
  }, []);




  const renderData = () => {

return (
  <>
    {tokens?.slice(index.prev, index.current)?.map( (token) => (
      <div className="gallery" key={Math.random()*100}>
        <Image 
          src={token.image_url} 
          width="600" 
          height="600" 
        />
      <div className="desc">{token.name}</div>
    </div> ))}
  </>
)
}
return renderData();
}

export default SubCollections;