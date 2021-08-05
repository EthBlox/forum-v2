import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { Button } from 'ui-neumorphism';
import Web3Modal from "web3modal";


const Connect = (props) => {
  const [connected, setConnected] = useState(false);

  const Connection = async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    if (signer._isSigner) {
      setConnected(true);
      props.onConnect(true);
    } else {
      console.log('error');
    }
  };


  return (
    <>
    <Button onClick={Connection} color='#00AEE9' size='large' >{!connected ? <p>Connect wallet</p> : <p>Connected</p>}</Button>
    </>
  );
};

export default Connect;