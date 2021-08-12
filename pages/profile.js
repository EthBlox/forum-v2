import React, { useState, useEffect, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Connect from '../components/Connect';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Loading from '../components/Loading';
import Collections from '../components/Collections';
import SubCollections from '../components/SubCollections';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from 'ui-neumorphism';

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
    paddingBottom: "0px"
  },
  footerPost: {
    position: "absolute",
    left:"0",
    bottom:"0",
    right:"0",
  },
  paginationLoc: {
    marginTop: "40%",
    marginLeft: "48%",
  },
  switchButton: {
    margin: "2%"
  }
});


const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(false);
  const [address, setAddress] = useState(null);
  const [collections, setCollections] = useState(null);
  const [pageCollections, setPageCollections] = useState(collections);
  const [subTab, setSubTab] = useState(false);
  const [page, setPage] = useState(1);
  const [subPage, setSubPage] = useState(1);
  const [pageRange, setPageRange] = useState({
    prev: 0,
    current: 9
  });
  const [subPageRange, setSubPageRange] = useState({
    prev: 0,
    current: 9
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  let totalPageCount;
  const pageSize = 10;
  if (collections !== null) {
    totalPageCount = Math.ceil(collections.length / pageSize);
  }
  const handlePageChange = (event, value) => {
    console.log(value);
    setPage(value);
    setPageRange({
      prev: 10 * (value - 1),
      current: 10 * value
    })
  };

  const handleSubPageChange = (event, value) => {
    console.log(value);
    setSubPage(value);
    setSubPageRange({
      prev: 10 * (value - 1),
      current: 10 * value
    })
  };
  console.log(collections);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectionHandler = (connected, address) => {
    setAddress(address);
    setProfile(connected);
  };

  const collectionsLoadedHander = (collections) => {
    setCollections(collections);
    console.log(collections.length);
  };

  const collectionsHandler = () => {
    console.log(subTab);
    setSubTab(!subTab);
  }
  
  const getSelectedAddress = (address) => {
    setSelectedAddress(address);
    collectionsHandler();
    console.log(address);
  }

  const collectionsTabContent = (
    <>
      { !subTab ?
      <>
      <div>
        <div className="tabcontent" style={{display: "block"}} >
          <h2>Click on a Collection to view your NFTs</h2>
          <Button className={classes.switchButton} >Ethereum</Button>
          <Button className={classes.switchButton} >Polygon</Button>
          <div className="collection-gallery" >
            <Collections 
              address={address} 
              loadCollections={collections} 
              collectionsLoaded={collectionsLoadedHander} 
              index={pageRange} 
              onClick={getSelectedAddress}
            />
          </div>
        </div>
        <Pagination 
          className={classes.paginationLoc} 
          count={totalPageCount} 
          page={page} 
          onChange={handlePageChange} 
          size="large"
        />
      </div>
      </>
      :
      <>
        <div>
          <div className="tabcontent" style={{display: "block"}}>
            <Button onClick={collectionsHandler}>Back</Button>
            <div className="collection-gallery">
              <SubCollections 
                address={address} 
                tokenAddress={selectedAddress} 
                key={Math.round(Math.random()*100)} 
                index={subPageRange} 
              />
            </div>
          </div> 
          <Pagination 
            className={classes.paginationLoc} 
            count={totalPageCount} 
            page={subPage} 
            onChange={handleSubPageChange} 
            size="large"
          />
        </div>
      </>
      }
    </>
  );
  
  const friendsTabContent = (
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
  )


  const groupsTabContent = (
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
  )




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
                    <h4>{address}</h4>
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
                onChange={handleTabChange}
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
                {collectionsTabContent}
            </TabPanel>

            <TabPanel value={value} index={1} >
              {friendsTabContent}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {groupsTabContent}
            </TabPanel>
            
            </div> }
        <Footer className={classes.footerPost} />
      </>
    )
};

export default Profile;