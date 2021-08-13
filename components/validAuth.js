// import React, { useState } from 'react';
// import axios from "axios";
// import { BigNumber, providers, utils } from 'ethers';
// import { Button } from 'ui-neumorphism';
// import Web3Modal from "web3modal";

// export const ValidateAuth = async () => {
//   const [login, setLogin] = useState(false);

//   const generateMessageSignature = (ethAddy, appName) => {
//     return (
//       '******************************************************************************** \n' +
//       'READ THIS MESSAGE CAREFULLY. \n' +
//       'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n' +
//       'ACCESS TO THIS APPLICATION. \n' +
//       'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n' +
//       'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n' +
//       '******************************************************************************** \n' +
//       'The Ethereum address used by this application is: \n' +
//       '\n' +
//       ethAddy +
//       '\n' +
//       '\n' +
//       '\n' +
//       'By signing this message, you authorize the current application to use the \n' +
//       'following app associated with the above address: \n' +
//       '\n' +
//       appName +
//       '\n' +
//       '\n' +
//       '\n' +
//       'The hash of your non-recoverable, private, non-persisted password or secret \n' +
//       'phrase is: \n' +
//       '\n' +
//       '\n' +
//       '\n' +
//       '\n' +
//       '******************************************************************************** \n' +
//       'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE KEYS \n' +
//       'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n' +
//       'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n' +
//       'WRITE ACCESS TO THIS APPLICATION. \n' +
//       '******************************************************************************** \n'
//     );
//   }



//   const generateSignature = async (signer) => {
//     let signed;
//     const userAddy = await signer.getAddress();
//     const message = generateMessageSignature(userAddy, 'EthBlox');
//     signed = await signer.signMessage(message);
//     console.log(signed);
//   };

//   const loginHandler = async () => {
//     // let timestamp = Date.now();


//     // let provider = new providers.Web3Provider(window.ethereum);
//     // let signer = provider.getSigner();
//     // let signerAddress = await signer.getAddress();
//     // let data = `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
//     // let signature = await provider.send('personal_sign',[ utils.hexlify(utils.toUtf8Bytes(data)), signerAddress.toLowerCase() ]);


//     const web3Modal = new Web3Modal({
//       network: "mainnet",
//       cacheProvider: true,
//     })
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     if (signer._isSigner) {
//       generateSignature(signer);
//     } else {
//       console.log('error');
//     }


//     // console.log(signerAddress);
//     // console.log(signature);
//     // console.log(timestamp);
  
//     // const options = {
//     //   method: 'POST',
//     //   url: 'https://theconvo.space/api/auth?apikey=CONVO',
//     //   headers: {'Content-Type': 'application/json'},
//     //   data : {
//     //     "signerAddress":{signerAddress},
//     //     "signature":{signature},
//     //     "timestamp": {timestamp}
//     //   }
//     // };
  
//     // axios.request(options).then(function (response) {
//     //   console.log(response.data);
//     // }).catch(function (error) {
//     //   console.error(error);
//     // });
    
//     setLogin(true);
//   };

//   return (
//     <>
//     <Button onClick={loginHandler} color='#00AEE9' size='large' >{!login ? <p>Login</p> : <p>Success</p>}</Button>
//     </>
//   );

// };

// export default ValidateAuth;

import React, { useEffect, useState } from 'react';
import { ethers, BigNumber, providers, utils } from 'ethers'
import { Button } from 'ui-neumorphism';
import Web3Modal from "web3modal";
import axios from "axios";


const generateMessageSignature = (ethAddy, timestamp) => {
  return (
    '******************************************************************************** \n' +
    'I allow this site to access my data on The Convo Space using the account' +
    ethAddy + 
    '. Timestamp: '+
    timestamp +
    '\n' +
    '******************************************************************************** \n'
  );
}

const generateSignature = async (signer) => {
  const timestamp = Date.now();
  const signerAddress = await signer.getAddress();
  const message = generateMessageSignature(signerAddress, timestamp);
  const signature = await signer.signMessage(message);
  return {timestamp, signerAddress, signature};
};



const ValidateAuth = () => {
  const [connected, setConnected] = useState(false);
  const [signature, setSignature] = useState(false);

  const loginHandler = async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    if (signer._isSigner) {
      const {timestamp, signerAddress, signature} = await generateSignature(signer);
      console.log(timestamp);
      console.log(signerAddress);
      console.log(signature);
      getToken(timestamp, signerAddress, signature);
      setConnected(true);
    } else {
      console.log('error');
    }
  };


  const getToken = (timestamp, signerAddress, signature) => {
    const options = {
      method: 'POST',
      url: 'http://theconvo.space/api/auth',
      params: {apikey: 'CONVO'},
      headers: {'Content-Type': 'application/json'},
      data : {
        signerAddress:{signerAddress},
        signature:{signature},
        timestamp: {timestamp}
      }
    };
  
  
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  };

  const getThreads = async () => {
    const options = {
      method: 'GET',
      url: 'https://theconvo.space/api/threads',
      params: {apikey: 'CONVO'},
      headers: {'Content-Type': 'application/json'}
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  };


  const getComments = async () => {
    const options = {
      method: 'GET',
      url: 'https://theconvo.space/api/comments',
      params: {apikey: 'CONVO'},
      headers: {'Content-Type': 'application/json'}
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  };


  const createComment = async () => {
    const options = {
      method: 'POST',
      url: 'https://theconvo.space/api/comments',
      params: {apikey: 'CONVO'},
      headers: {'Content-Type': 'application/json'},
      data: {
        token: 'string',
        signerAddress: 'string',
        comment: 'string',
        url: 'string',
        threadId: 'string'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  };

  return (
    <>
    <Button onClick={loginHandler} color='#00AEE9' size='large' >{!connected ? <p>Login</p> : <p>Logged in</p>}</Button>
    <Button onClick={getThreads}>click</Button>
    <Button onClick={getComments}>click</Button>
    <Button onClick={createComment}>click</Button>
    </>
  );
};

export default ValidateAuth;