import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Kongz from '../public/assets/CyberKong.png';
import Default from '../public/assets/comingSoon.gif';


const NFTConvo = (desc) => {
  console.log(desc.desc);

  const image = desc.desc.image_url;  
  const name = desc.desc.name;
  const URL = "https://theconvo.space/embed/dt?url=https%3A%2F%2Fethblox.on.fleek.co%2Ffrontend%2Fprofile.html%3F&threadId=";
  let threadID;
  if (desc.desc.comment == undefined) {
    threadID = desc.desc.id;
  } else {
    threadID = "" + desc.desc.id + desc.desc.comment;
  }
  const chain = desc.desc.chain;
  let openSeaURL = "https://opensea.io/assets/";

  if (chain == "1") {
    if (desc.desc.comment != undefined ) {
      openSeaURL = openSeaURL + desc.desc.id + '/' + desc.desc.comment;
    } 
  } else {
    openSeaURL = openSeaURL + 'matic' + '/'
    if (desc.desc.comment != undefined ) {
      openSeaURL = openSeaURL + desc.desc.id + '/' + desc.desc.comment;    
    }
  };


  console.log(desc.desc.comment);
  console.log(desc.desc.id)
  console.log(threadID)
  const chatRoomLink = `${URL}${threadID}`;












  return (
    <>
      <div className="nft-page-container">
        <div className="nft-image-container">
          <a className="#">
            <img  src = {image == "" ? Default : image} width={800} height={600} />
          </a>
        </div>
        <div className="nft-info-container">
          <div className="nft-name">
              <h3 className="nft-h3">{name}</h3>
          </div>
          <div className="nft-description">
            <p>this is a very cool nft and i really like it!!!! :D</p>
            <p>Idk what other info would go here yet.</p>
            <Link href={openSeaURL}>
              For more information head to OpenSea
            </Link>
          </div>
        </div>
      </div>
      <div className="nft-comments-container">
        <iframe 
          src= {chatRoomLink}
          allowtransparency="true" 
          style={{border: "10px ridge grey"}}
          className="theConvoSpace"
        >
            Chat
        </iframe>
      </div>  
    </>
  )
};

export default NFTConvo;