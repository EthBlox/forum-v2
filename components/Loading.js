import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: '100%',
    height: "80ch",
    alignItems: "center",
    justify: "center",
    marginLeft: '35%',
  },
  container: {
    width: "30%",
    padding: "20px",
  },
  progress: {
    width: "100%",
    padding: "10px",
  },
  loadingContainer: {
    position: "absolute",
    top: "40%",
    left: "0", 
    right: "0",
    bottom: "0",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    fontWeight: 'bold',
    color: "#00AEE9",
    fontSize: "1.2rem",
  },
});

export default function Loading() {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className={classes.loadingContainer}>
        <p className={classes.loadingText}>Cooking your data</p>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <LinearProgress className={classes.progress} variant="determinate" value={progress} />
        </div>
      </div>
    </>
  );
}