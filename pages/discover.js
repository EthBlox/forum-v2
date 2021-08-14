import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Link from 'next/link';


const Discover = () => {


  return (
    <>
      <Header />
      <section className="featured-collections-chats">
        <div className="featured-container">
          <h2>----- Featured Collections -----</h2>
          <ul className="featured-list">
            <li className="featured-list-item">
              <h3>CyberKongz</h3>
              <img src="../assets/cyberkongzlogo.png" />
              <iframe 
              src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fwww.ethblox.social%2Fdiscover&threadId=testchat" 
              allowtransparency="true" 
              style={{border: "10px ridge grey"}}
              className="theConvoSpace">
                  Chat
              </iframe>
            </li>
            <li className="featured-list-item">
              <h3>Rabbit College Club</h3>
              <img src="../assets/rabbitcollegeclub.jpeg" />
              <iframe 
              src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fwww.ethblox.social%2Fdiscover&threadId=testchat1" 
              allowtransparency="true" 
              style={{border: "10px ridge grey"}}
              className="theConvoSpace">
                  Chat
              </iframe>
            </li>
          </ul>
        </div>
      </section>
      <section className="collections-chats">
        <div className="collections-container">
          <h2>----- Explore Collections -----</h2>
          <ul className="collections-list">
            <li className="collections-list-item">
              <h3>SupDucks</h3>
              <img src="../assets/supduckslogo.png" />
              <iframe 
              src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fwww.ethblox.social%2Fdiscover&threadId=testchat2" 
              allowtransparency="true" 
              style={{border: "10px ridge grey"}}
              className="theConvoSpace">
                  Chat
              </iframe>
            </li>
            <li className="collections-list-item">
              <h3>Bored Ape Yacht Club</h3>
              <img src="../assets/baycbanner.png" />
              <iframe 
              src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fwww.ethblox.social%2Fdiscover&threadId=testchat3" 
              allowtransparency="true" 
              style={{border: "10px ridge grey"}}
              className="theConvoSpace">
                  Chat
              </iframe>
            </li>
            <li className="collections-list-item">
              <h3>CryptoPunks</h3>
              <img src="../assets/cryptopunksbanner.png" />
              <iframe 
              src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fwww.ethblox.social%2Fdiscover&threadId=testchat4" 
              allowtransparency="true" 
              style={{border: "10px ridge grey"}}
              className="theConvoSpace">
                  Chat
              </iframe>
            </li>
            <li className="collections-list-item">
              <h3>Lazy Lions</h3>
              <img src="../assets/lazylions.jpeg" />
              <iframe 
              src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fwww.ethblox.social%2Fdiscover&threadId=testchat5" 
              allowtransparency="true" 
              style={{border: "10px ridge grey"}}
              className="theConvoSpace">
                  Chat
              </iframe>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  )
};

export default Discover;