import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NFTGif from '../public/assets/nft.gif';
import Image from 'next/image';
import Showcase from '../components/Showcase';
import Footer from '../components/Footer';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#3EDBF0",
    color: "#C0FEFC",
    margin: "0px",
    padding: "0px",
  },
  gridContainer: {
    margin: "0px",
    paddingLeft: "10vw",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
  },
  btn: {
    height: "50px",
    width: "30%",
    borderRadius: "3px",
    background: "rgb(248, 240, 227)",
    display: "inline",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "-7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001",
    transition: "box-shadow 0.6s cubic-bezier(.79, .21, .06, .81)",
    outline: "none",
    fontSize: "1.2vw",
    fontWeight: "800",
    color: "#3EDBF0",
    textDecoration: "none",
    marginRight: "40px",
    border: "0px solid",
    '&:hover': {
      color: "#ad14f2",
      cursor: "pointer",
      boxShadow: "0.6s cubic-bezier(.79, .21, .06, .81)",
    },
  },
}));

const Home = () => {
  const classes = useStyles();

    return (
      <>
        <Header />
          <Grid container spacing={0} className={classes.gridContainer}>
            <Grid item xs={6} className="container-cta">
                <h1>Join a community today!</h1>
                <Link href='/discover' >
                  <button className={classes.btn} >Explore</button>
                </Link>
                <Link href='/profile' >
                  <button className={classes.btn} >Get Started!</button>
                </Link>
            </Grid>
            <Grid item xs={6}>
            <img src="../assets/nft.gif" width="480 " height="480 " frameBorder="0 " className="gif "/>
            </Grid>
          </Grid>
          <Showcase />
          <Footer />
      </>
    );
};

export default Home;