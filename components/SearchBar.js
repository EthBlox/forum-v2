import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { ethers } from 'ethers';

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(4),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20vw',
    },
  },
  invalid: {
    borderColor: "red",
    color: "red",
  },
  invalidText: {
    color: "red",
    paddingLeft: theme.spacing(1),
  }
}));


const SearchBar = (props) => {
  const classes = useStyles();
  const [isValid, setIsValid] = useState(true);

  const submitHandler = (event) => {
    if (event.keyCode == 13) {
      let addr = event.target.value.trim();
      let valid = false;

      try { 
        if ( ethers.utils.isAddress(addr) ) {
          valid = true;
        } else {
          valid = false;
        }
      } catch (e) {
        console.log('err');
      } finally {
        console.log('done');
      }

      if (addr.length == 42 && valid ) {
        console.log('value', addr);
        props.onSearch(true, addr);
      } else {
        setIsValid(false);
      }
    } else {
      console.log('err');
    }
  };


  // props.onConnect(true, userAddy);
  const inputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
  };

  return (
    <>
    <div className={` ${classes.search} ${!isValid && classes.invalid}`}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search Address"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={submitHandler}
        onChange={inputChangeHandler}
      />
    </div>
    </>
  )
};



export default SearchBar