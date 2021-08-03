import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../src/Header';
import Footer from '../src/Footer';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tab: {
    minWidth: "300px", // a number of your choice
    width: "300px", // a number of your choice
    height: "5vh",
  },
  lazyFooter: {
    paddingBottom: "800px"
  },
  footerPost: {
    position: "absolute",
    left:"0",
    bottom:"0",
    right:"0",
  },
});


const Profile = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
  <>
    <Header />
      <div className={classes.lazyFooter}>
        <div className="profile-banner">
            <div className="profile-wrapper">
                <img src="https://devforum.roblox.com/uploads/default/original/4X/c/5/f/c5fc157827728c0030ce41031b1deeb3826b751e.png" class="profile-image" />
            </div>
        </div>
        <div className="profile-text-container">
            <div className="username">
                <h4>cheb.eth</h4>
            </div>
            <div className="profile-dot-divider">
                <h4>•</h4>
            </div>
            <div className="number-of-nfts">
                <h4>23 NFTs</h4>
            </div>
            <div className="profile-dot-divider">
                <h4>•</h4>
            </div>
            <div className="number-of-friends">
                <h4>145 Friends</h4>
            </div>
        </div>
        {/* <!-- End Profile Banner --> */}

        {/* <!-- Tabs --> */}
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Collection" className={classes.tab} />
            <Tab label="Friends" className={classes.tab} />
            <Tab label="Groups" className={classes.tab}/>
          </Tabs>
        </Paper>
        
        {/* <!-- Tab content --> */}
        { value==0 &&        
          <div id="Collection" className="tabcontent" style={{display: "block"}}>
            <div className="collection-gallery">
              <div className="gallery">
                <a target="_blank" href="../images/CyberKong.png">
                  <img src="../images/CyberKong.png" alt="Cinque Terre" width="600" height="400" />
                </a>
              <div className="desc">Add a description of the image here</div>
              </div>
              
              <div className="gallery">
                <a target="_blank" href="../images/CryptoTinies.png">
                  <img src="../images/CryptoTinies.png" alt="Forest" width="600" height="400" />
                </a>
                <div className="desc">Add a description of the image here</div>
              </div>
              
              <div className="gallery">
                <a target="_blank" href="../images/GSA.png">
                  <img src="../images/GSA.png" alt="Northern Lights" width="600" height="400" />
                </a>
                <div className="desc">Add a description of the image here</div>
              </div>
              
              <div className="gallery">
                <a target="_blank" href="../images/SupDuck.png">
                  <img src="../images/SupDuck.png" alt="Mountains" width="600" height="400" />
                </a>
                <div className="desc">Add a description of the image here</div>
              </div>
            </div>
        </div>
        
        }
        
        { value==1 &&
        <div id="Friends" className="tabcontent">
          <h5>Friends</h5>
          <p>Paris is the capital of France.</p>
        </div> }
        
        { value ==2 &&
        <div id="Groups" className="tabcontent">
          <h5>Groups</h5>
          <p>Tokyo is the capital of Japan.</p>
        </div>}
        
        </div>
        <Footer className={classes.footerPost} />
    </>
  )
};

export default Profile;