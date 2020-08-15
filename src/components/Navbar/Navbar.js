import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchButton from './../SearchWidget/SearchButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
	background: 'rgba(0,0,0,0.8)',
    width: '100%',
    zIndex: '99',
    position: 'fixed'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    left: 0,
  },
}));

const Navbar = ({handleSearchButtonClick}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
		<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
		<Typography variant="h6" className={classes.title}>
            Media Library
          </Typography>
          <SearchButton handleSearchButtonClick={handleSearchButtonClick}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar