import React, { useState, useEffect } from "react";
import Header from '../../components/Header';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../components/Footer';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#3EDBF0",
    color: "#C0FEFC",
    margin: "0px",
    padding: "0px",
  }
}));

const Home = () => {
  const classes = useStyles();

    return (
      <>
        <Header />
          <section>
            <h1>Meet the Team</h1>
            <ul className="team">
              <li className="team-member">
                <img src="../assets/chebLogo.jpeg" className="whiteborder" width="300px" height="300px"/>
                <h3>Will</h3>
                <h4>Co-Founder, Developer</h4>
                <p>cheb@ethblox.social</p>
              </li>
              <li className="team-member">
                <img src="../assets/meat.png" className="blackborder" width="300px" height="300px"/>
                <h3>sendmeat</h3>
                <h4>Co-Founder, Developer</h4>
                <p>sendmeat@ethblox.social</p>
              </li>
              <li className="team-member">
                <img src="../assets/CyberKong.png" className="whiteborder" width="300px" height="300px" />
                <h3>palm</h3>
                <h4>Co-Founder, Developer</h4>
                <p>palm@ethblox.social</p>
              </li>
            </ul>
          </section>
        <Footer />
      </>
    );
};

export default Home;