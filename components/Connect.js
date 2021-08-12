import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { Button } from 'ui-neumorphism';
import Web3Modal from "web3modal";

const generateMessageSignature = (ethAddy, appName) => {
  return (
    '******************************************************************************** \n' +
    'Verification message \n' +
    '******************************************************************************** \n' +
    'The Ethereum address used by this application is: \n' +
    '\n' +
    ethAddy +
    '\n' +
    '\n' +
    '\n' +
    'By signing this message, you authorize the current application to use the \n' +
    'following app associated with the above address: \n' +
    '\n' +
    appName +
    '\n' +
    '\n' +
    '\n' 
  );
}

const generateSignature = async (signer, userAddy ) => {
  let signed;
  const message = generateMessageSignature(userAddy, 'EthBlox');
  signed = await signer.signMessage(message);
};



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
      const userAddy = await signer.getAddress();
      const signature = await generateSignature(signer, userAddy);
      props.onConnect(true, userAddy);
      setConnected(true);
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