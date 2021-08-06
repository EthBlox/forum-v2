import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { Button } from 'ui-neumorphism';
import Web3Modal from "web3modal";

const generateMessageSignature = (ethAddy, appName) => {
  return (
    '******************************************************************************** \n' +
    'READ THIS MESSAGE CAREFULLY. \n' +
    'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n' +
    'ACCESS TO THIS APPLICATION. \n' +
    'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n' +
    'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n' +
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
    '\n' +
    'The hash of your non-recoverable, private, non-persisted password or secret \n' +
    'phrase is: \n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '******************************************************************************** \n' +
    'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE KEYS \n' +
    'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n' +
    'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n' +
    'WRITE ACCESS TO THIS APPLICATION. \n' +
    '******************************************************************************** \n'
  );
}

const generateSignature = async (signer) => {
  let signed;
  const userAddy = await signer.getAddress();
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
      setConnected(true);
      generateSignature(signer);
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