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
                    <a href=" " className="card ">
                        <img src="https://i.imgur.com/oYiTqum.jpg " className="card__image " alt=" " />
                        <div className="card__overlay ">
                            <div className="card__header ">
                                <svg className="card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                                <img className="card__thumb " src="https://i.imgur.com/7D7I6dI.png " alt=" " />
                                <div className="card__header-text ">
                                    <h3 className="card__title ">Jessica Parker</h3>
                                    <span className="card__status ">1 hour ago</span>
                                </div>
                            </div>
                            <p className="card__description ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                        </div>
                    </a>
                </li>
            </ul>
          </Grid>
          <Grid item xs={6}>
            <ul className="cards" >
              <li>
                <a href=" " className="card ">
                  <img src="../images/NFT-Convo.png " className="card__image " alt=" " />
                  <div className="card__overlay ">
                      <div className="card__header ">
                          <svg className="card__arc " xmlns="http://www.w3.org/2000/svg "><path /></svg>
                          <img className="card__thumb " src="../images/world_greatest_dictator.jpeg " alt=" " />
                          <div className="card__header-text ">
                              <h3 className="card__title ">Robert Mugabe</h3>
                              <span className="card__status ">1 hour ago</span>
                          </div>
                      </div>
                      <p className="card__description ">Was in Florida and had one too many drinks</p>
                  </div>
                </a>
              </li>
            </ul>
          </Grid>
      </Grid>
    </>
  )
};

export default Showcase;