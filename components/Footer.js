import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fab);
const useStyles = makeStyles((theme) => ({
  gridItem: {
    paddingLeft: "12vw",
  },
  copyrightItem: {
    paddingRight: "6vw",
  },
  socialItem: {
    alignItems: "right",
  },
  github: {
    color: "#00AEE9",
    marginRight: "2vw",
    '&:hover':{
      color: "#000"
    }
  },
  twitter: {
    color: "#00AEE9",
    marginRight: "2vw",
    '&:hover':{
      color: "#FFF"
    }
  },
  discord: {
    color: "#00AEE9",
    marginRight: "2vw",
    '&:hover':{
      color: "#007bb6"
    }
  },
}));
const Footer = () => {
  const classes = useStyles();
    return (
      <>
      
        <div className="site-footer">
          <Grid container spacing={0} >
            <Grid item xs={4} className={classes.gridItem}>
              <h6>About</h6>
              <p>Ethblox is a social platform for users to share their NFTs, join communities, and make friends—with all posts and communication hosted on IPFS.</p>
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
              <h6>Categories</h6>
              <ul className="footer-links ">
                <li><a href="# ">veritatis</a></li>
                <li><a href="# ">dolorem </a></li>
                <li><a href="# ">fugiat</a></li>
                <li><a href="# ">pariatur</a></li>
                <li><a href="# ">repellat</a></li>
                <li><a href="# ">asperiores </a></li>
              </ul>
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
              <h6>Quick Links</h6>
              <ul className="footer-links ">
                <li><a href="# ">About the Team</a></li>
                <li><a href = "mailto: contact@ethblox.social">Contact Us</a></li>
                <li><a href="https://github.com/EthBlox/forum-v2" target="_blank">Contribute</a></li>
                <li><a href="https://ipfs.io/ipfs/QmRmwCTcrBYMrPjzo7S1vxLTcWiBJNTD4hqn1EJHv29mRJ?filename=Screen%20Shot%202021-08-13%20at%2010.59.24%20PM.png" target="_blank">Roadmap</a></li>
                <li><a href="/privacypolicy">Privacy Policy</a></li>
              </ul>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={0} className="footer-socials">
            <Grid item xs={6} className={classes.copyrightItem}>
              <p>&copy; EthBlox Ltd. 2021. All Rights Reserved.
              </p>
            </Grid>
            <Grid item xs={3} >
              <p></p>
            </Grid>
            <Grid item xs={3} >
                  <a href="https://twitter.com/0xhashed" target="_blank">
                    <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" className={classes.twitter}/>
                  </a>
                  <a href="https://github.com/EthBlox/forum-v2" target="_blank">
                    <FontAwesomeIcon icon={['fab', 'github']} size="2x" className={classes.github}/>
                  </a>
                  <a href="https://discord.gg/VU5kNNk2PR" target="_blank">
                    <FontAwesomeIcon icon={['fab', 'discord']} size="2x" className={classes.discord}/>
                  </a>
            </Grid>
          </Grid>
        </div>
      </>
    )
};

export default Footer;