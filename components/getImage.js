import React from 'react';
import { 
  getExternalNFTMetadata
} from '../src/pages/api/classA';
import {
  MATIC
} from '../src/pages/api/constants';
import Default from '../public/assets/default.png';

const getImage = async (address, tokenID) => {
  const res = await getExternalNFTMetadata(MATIC, address, tokenID);
  const token = res.data.items;
  let imageURL;
  if (token[0]?.nft_data != null && token[0]?.nft_data[0] != null ) {
    if (token[0]?.nft_data[0]?.external_data == null) {
      return Default;
    } else {
      imageURL = token[0]?.nft_data[0]?.external_data?.image;
    }
  } else {
    return Default;
  }

  if (imageURL == undefined || imageURL == null || imageURL.slice(0,4) !== "http") {
    console.log(imageURL);
    return Default;
  } else {
    console.log(imageURL);
    return imageURL;
  }
};

export default getImage;