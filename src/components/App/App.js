import React, {useState} from 'react';
import './App.css';
import Navbar from './../Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import MovieLobby from '../MovieLobby/MovieLobby';
import SearchWidget from './../SearchWidget/SearchWidget';

const useStyles = makeStyles((theme) => ({
	app: {
		font: '#fff'
	}
}));

const App = () => {
  const classes = useStyles();
  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearchButtonClick = () => {
    setSearchOpen(true);
  }
  return (
    <div className={classes.app}>
        <Navbar handleSearchButtonClick={handleSearchButtonClick}/>
        <MovieLobby/>
        <SearchWidget isSearchOpen={isSearchOpen}/>
    </div>
  );
}

export default App;
