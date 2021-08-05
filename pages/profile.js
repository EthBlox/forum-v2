import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../src/Header';
import Footer from '../src/Footer';
import Connect from '../src/Connect';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectionHandler = (connected) => {
    setProfile(connected);
  };


  return (
  <>
    <Header />
      
      { !profile
        ?
        <>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '53vh' }}
          >
            <Grid item xs={3}>
              <Connect onConnect={connectionHandler} />
            </Grid>   
          </Grid> 
        </>
        :
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

        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Collection" className={classes.tab} {...a11yProps(0)}/>
            <Tab label="Friends" className={classes.tab} {...a11yProps(1)}/>
            <Tab label="Groups" className={classes.tab} {...a11yProps(2)}/>
          </Tabs>
        </Paper>
        
        
        <TabPanel value={value} index={0}>
            <div className="tabcontent" style={{display: "block"}}>
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
        </TabPanel>
        <TabPanel value={value} index={1} >
            <div className="tabcontent">
                <div className="friends-container">
                    <ul className="friends-list">
                        <a href="https://avatars.githubusercontent.com/u/78671439?u=365b906ff895d181b8d4d8a1cd3952ab72c6af81&v=4">
                            <li className="friends-list-item">
                                <img src="https://avatars.githubusercontent.com/u/78671439?u=365b906ff895d181b8d4d8a1cd3952ab72c6af81&v=4" />
                                <p>palm</p>
                            </li>
                        </a>
                        <a href="https://pbs.twimg.com/profile_images/1408031450696339459/GUhXPaKw_400x400.jpg">
                            <li className="friends-list-item">
                                <img src="https://pbs.twimg.com/profile_images/1408031450696339459/GUhXPaKw_400x400.jpg" />
                                <p>sendmeattttt</p>
                            </li>
                        </a>
                    </ul>
                </div>
            </div> 
        </TabPanel>
        <TabPanel value={value} index={2}>
            <div className="tabcontent">
                <div className="groups-container">
                    <ul className="groups-list">
                    <li className="groups-list-item">
                        <img src="https://g.foolcdn.com/editorial/images/624682/roblox-logo.png" />
                        <h3 className="groups-h3">Epic Roblox Gamers</h3>
                        <p className="groups-p">Lorem ipsum dolor sit amet...</p>
                    </li>
                        
                    <li className="groups-list-item">
                        <img src="https://pbs.twimg.com/profile_images/1417510741867999235/PPTcKDBQ_400x400.jpg" />
                        <h3 className="groups-h3">0xHashed Community</h3>
                        <p className="groups-p">Lorem ipsum dolor sit amet...</p>
                    </li>
                
                    <li class="groups-list-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLsVabHSXeKkDd0dQox9cpojMSf1ra1TJFjg&usqp=CAU" />
                        <h3 className="groups-h3">CyberKongz</h3>
                        <p className="groups-p">Lorem ipsum dolor sit amet...</p>
                    </li>
                    </ul>
                </div>
            </div>
        </TabPanel>
        
        </div> }
        <Footer className={classes.footerPost} />
    </>
  )
};

export default Profile;