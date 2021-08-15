import React from 'react';
import Grid from '@material-ui/core/Grid';

const Showcase = () => {
  return(
    <>
      <h3>Every NFT has a story</h3>
      <Grid container spacing={0} >
        <Grid item xs={6} >
            <ul className="cards">
                <li>
                  <div className="card ">
                    <img src="../assets/phone.gif" className="card__image " alt=" " />
                    <div className="card__overlay ">
                      <div className="card__header ">
                        <svg className="card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                        <img className="card__thumb " src="https://i.imgur.com/7D7I6dI.png " alt=" " />
                        <div className="card__header-text ">
                          <h3 className="card__title ">@0xb136...5B25</h3>
                          <span className="card__status ">1 hour ago</span>
                        </div>
                      </div>
                      <p className="card__description ">LFG BEAR !!!</p>
                    </div>
                  </div>
                </li>
            </ul>
          </Grid>
          <Grid item xs={6}>
            <ul className="cards" >
              <li>
                <div className="card ">
                  <img src="../assets/NFT-Convo.png" className="card__image " alt=" " />
                  <div className="card__overlay ">
                      <div className="card__header ">
                          <svg className="card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                          <img className="card__thumb " src="../assets/CyberKong.png" alt=" " />
                          <div className="card__header-text ">
                              <h3 className="card__title ">palm</h3>
                              <span className="card__status ">2 hours ago</span>
                          </div>
                      </div>
                      <p className="card__description ">Just added this to the collection ^—^</p>
                  </div>
                </div>
              </li>
            </ul>
          </Grid>
      </Grid>
    </>
  )
};

export default Showcase;