import React from 'react';
import ValidateAuth from '../components/validAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';


const ChatRoom = () => {

  console.log(process.env.API_KEY);

  
  return (
    <>
      <Header />
      {/* <iframe 
        src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fethblox.on.fleek.co%2Ffrontend%2Fprofile.html%3F&threadId=testchat" 
        allowtransparency="true" 
        width="80%" 
        height="370px" 
        style={{border: "10px ridge grey"}} 
        className="theConvoSpace" 
        >
        Chat
    </iframe> */}

    <ValidateAuth />
    <Footer />
  </>
  );
};

export default ChatRoom;