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
              <p>officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus inventore veritatis et quasi architecto adipisci velit, sed quia
                  non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </p>
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
                <li><a href="# ">About Us</a></li>
                <li><a href="# ">Contact Us</a></li>
                <li><a href="# ">Contribute</a></li>
                <li><a href="# ">Privacy Policy</a></li>
                <li><a href="# ">Sitemap</a></li>
              </ul>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={0} className="footer-socials">
            <Grid item xs={6} className={classes.copyrightItem}>
              <p>Copyright &copy; 2021 All Rights Reserved
              </p>
            </Grid>
            <Grid item xs={3} >
              <p></p>
            </Grid>
            <Grid item xs={3} >
                  <a href="#">
                    <FontAwesomeIcon icon={['fab', 'twitter']} size="3x" className={classes.twitter}/>
                  </a>
                  <a href="#">
                    <FontAwesomeIcon icon={['fab', 'github']} size="3x" className={classes.github}/>
                  </a>
                  <a href="#">
                    <FontAwesomeIcon icon={['fab', 'discord']} size="3x" className={classes.discord}/>
                  </a>
            </Grid>
          </Grid>
        </div>
      </>
    )
};

export default Footer;