import React from 'react';
import ValidateAuth from '../../components/validAuth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingBottom: "20vh",
    paddingTop: "2vh"
  },
});


const ChatRoom = () => {
  const classes = useStyles();

  
  return (
    <>
      <Header />
      <div className={classes.root}>
        <h1>Global</h1>
        <iframe 
          src="https://theconvo.space/embed/dt?url=https%3A%2F%2Fethblox.on.fleek.co%2Ffrontend%2Fprofile.html%3F&threadId=global" 
          allowtransparency="true" 
          width="80%" 
          height="370px" 
          style={{border: "10px ridge grey"}} 
          className="theConvoSpace" 
          >
          Chat
        </iframe>
      </div>

    {/* <ValidateAuth /> */}
    <Footer />
  </>
  );
};

export default ChatRoom;