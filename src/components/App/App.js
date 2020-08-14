import React from 'react';
import './App.css';
import Navbar from './../Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import MovieLobby from '../MovieLobby/MovieLobby';

const useStyles = makeStyles((theme) => ({
	app: {
		font: '#fff'
	}
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
        <Navbar/>
        <MovieLobby/>
    </div>
  );
}

export default App;
