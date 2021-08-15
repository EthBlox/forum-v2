import React, { useState, useEffect, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Connect from '../../components/Connect';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collections from '../../components/Collections';
import SubCollections from '../../components/SubCollections';
import PolyCollections from '../../components/PolyCollections';
import SubPolyCollections from '../../components/SubPolyCollections';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from 'ui-neumorphism';
import { 
  getTokenBalancesForAddress
} from './api/classA';
import {
  ETHEREUM,
  MATIC
} from './api/constants';
import SearchBar from '../../components/SearchBar';



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
  // default ethereum
  const [chain, setChain] = useState(false);

  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(false);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);

  const pageSize = 10;

  // const [pageCollections, setPageCollections] = useState(collections);



  /*
      MAIN FUNCTIONS
  */

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectionHandler = (connected, address) => {
    setAddress(address);
    setProfile(connected);
  };

  const searchHandler = (connected, address) => {
    setAddress(address);
    setProfile(connected);
  };



  // const TokenBal = async (address) => {
  //   const ETH_res = await getTokenBalancesForAddress(ETHEREUM, address);
  //   const eth_tokens = ETH_res.data.items;
  //   let eth_bal;
  //   for (let i=0; i<eth_tokens.length; i++) {
  //     if (eth_tokens[i].supports_erc.includes("erc721") && eth_tokens[i].balance != null){
  //       eth_bal += +eth_tokens[i].balance;
  //     }
  //   }
  
  //   const Matic_res = await getTokenBalancesForAddress(MATIC, address);
  //   const matic_tokens = Matic_res.data.items;
  //   let matic_bal;
  
  //   for (let i=0; i<matic_tokens.length; i++) {
  //     if (matic_tokens[i].supports_erc.includes("erc721") && matic_tokens[i].balance != null){
  //       matic_bal += +matic_tokens[i].balance;
  //     }
  //   }
  //   const total = matic_bal + eth_bal;
  //   console.log(total);
  //   return total;
  
  // };

  useEffect(() => {
    const TokenBal = async (address) => {
      console.log('running');
      const ETH_res = await getTokenBalancesForAddress(ETHEREUM, address, {
        nft: true,
        'no-nft-fetch': true,
      });
      const eth_tokens = ETH_res.data.items;
      console.log(eth_tokens);
      let eth_bal = 0;
      for (let i=0; i<eth_tokens.length; i++) {
        if (eth_tokens[i].supports_erc?.includes("erc721") && eth_tokens[i].balance != null){
          eth_bal += +eth_tokens[i].balance;
          console.log(eth_bal);
        }
      };
    
      const Matic_res = await getTokenBalancesForAddress(MATIC, address, {
        nft: true,
        'no-nft-fetch': true,
      });
      const matic_tokens = Matic_res.data.items;
      console.log(matic_tokens);
      let matic_bal = 0;
    
      for (let i=0; i<matic_tokens.length; i++) {
        if (matic_tokens[i].supports_erc?.includes("erc721") && matic_tokens[i].balance != null){
          matic_bal += +matic_tokens[i].balance;
          console.log(matic_bal);
        }
      };
      const total = matic_bal + eth_bal;
      console.log(total);
      setBalance(total);
    
    };
    if (profile) {
      TokenBal(address);
    }
    console.log('test')
  },[profile]);
  
  



  /*
      ETHEREUM COLLECTION PAGE
  */


  const [selectedAddress, setSelectedAddress] = useState(null);
  const [subTab, setSubTab] = useState(false);
  const [collections, setCollections] = useState(null);
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
  let totalPageCount;

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

  const collectionsLoadedHandler = (collections) => {
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

  const switchEthHandler = () => {
    setChain(false);
  }


  /*
      POLYGON COLLECTION PAGE
  */

  const [polySelectedAddress, setPolySelectedAddress] = useState(null);
  // const [polySubTab, setPolySubTab] = useState(false);
  const [polyCollections, setPolyCollections] = useState(null);
  const [polyPage, setPolyPage] = useState(1);
  const [subPolyPage, setSubPolyPage] = useState(1);
  const [polyPageRange, setPolyPageRange] = useState({
    prev: 0,
    current: 9
  });
  const [subPolyPageRange, setSubPolyPageRange] = useState({
    prev: 0,
    current: 9
  });
  let totalPolyPageCount;

  if (polyCollections !== null) {
    totalPolyPageCount = Math.ceil(polyCollections.length / pageSize);
  }

  const handlePolyPageChange = (event, value) => {
    console.log(value);
    setPolyPage(value);
    setPolyPageRange({
      prev: 10 * (value - 1),
      current: 10 * value
    })
  };

  const handlePolySubPageChange = (event, value) => {
    console.log(value);
    setSubPolyPage(value);
    setSubPolyPageRange({
      prev: 10 * (value - 1),
      current: 10 * value
    })
  };

  const polyCollectionsLoadedHandler = (collections) => {
    setPolyCollections(collections);
    console.log(collections.length);
  };

  const polyCollectionsHandler = () => {
    console.log(subTab);
    setSubTab(!subTab);
  }

  const getPolySelectedAddress = (address) => {
    setPolySelectedAddress(address);
    polyCollectionsHandler();
    console.log(address);
  }

  const switchPolyHandler = () => {
    setChain(true);
  };

  const collectionsTabContent = (
    <>
      { !subTab ?
      <>
      <div>
        <div className="tabcontent" style={{display: "block"}} >
          <h2>Click on a Collection to view your NFTs</h2>
          <Button className={classes.switchButton} onClick={switchEthHandler} >Ethereum</Button>
          <Button className={classes.switchButton} onClick={switchPolyHandler} >Polygon</Button>
          <div className="collection-gallery" >
            { !chain ? <Collections 
              address={address} 
              loadCollections={collections} 
              collectionsLoaded={collectionsLoadedHandler} 
              index={pageRange} 
              onClick={getSelectedAddress}
            /> :
            <>
              <PolyCollections 
                address={address}
                loadCollections={polyCollections} 
                collectionsLoaded={polyCollectionsLoadedHandler} 
                index={polyPageRange} 
                onClick={getPolySelectedAddress}
              />
            </>
            }
          </div>
        </div>
        { !chain && 
        <Pagination 
          className={classes.paginationLoc} 
          count={totalPageCount} 
          page={page} 
          onChange={handlePageChange} 
          size="large"
        /> }
        {chain && 
        <Pagination 
          className={classes.paginationLoc} 
          count={totalPolyPageCount} 
          page={polyPage} 
          onChange={handlePolyPageChange} 
          size="large"
        />    
        }
      </div>
      </>
      :
      <>
        <div>
          <div className="tabcontent" style={{display: "block"}}>
            <Button onClick={collectionsHandler}>Back</Button>
            <div className="collection-gallery">
              { 
                !chain ?
                <SubCollections 
                address={address} 
                tokenAddress={selectedAddress} 
                key={Math.round(Math.random()*100)} 
                index={subPageRange} 
              /> 
              :

                <SubPolyCollections 
                  address={address} 
                  tokenAddress={polySelectedAddress}
                  key={Math.round(Math.random()*100)} 
                  collections={polyCollections}
                  index={subPolyPageRange} 
                />
              }
            </div>
          </div> 
          { !chain &&
            <Pagination 
            className={classes.paginationLoc} 
            count={totalPageCount} 
            page={subPage} 
            onChange={handleSubPageChange} 
            size="large"
          />
          }
          {chain &&
          <Pagination 
            className={classes.paginationLoc} 
            count={totalPolyPageCount} 
            page={subPolyPage} 
            onChange={handlePolySubPageChange} 
            size="large"
          />
          }
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
                <Grid item xs={6}>
                  <Connect onConnect={connectionHandler} />
                </Grid>   
                <Grid item xs={6}>
                  <SearchBar onSearch={searchHandler}/>
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
                    <h4>{ address.slice(0,6) + '...' + address.slice(-4) } </h4>
                </div>
                <div className="profile-dot-divider">
                    <h4>•</h4>
                </div>
                <div className="number-of-nfts">
                    <h4>{balance} NFTs</h4>
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