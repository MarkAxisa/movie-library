import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '../MovieCarousel/Carousel';
import SearchResults from './../SearchResults/SearchResults';
import {isMobile} from 'react-device-detect';

const useStyles = makeStyles(() => ({
	lobbyContainer: {
		color: '#fff',
		background: '#000',
		width: isMobile ? '90%' : '100%',
		margin: 'auto',
		paddingTop: isMobile ? '3em' : '8em',
		height: '1000px'
	},
	searchResults: {
		marginLeft: '2em'
	}
  }));

const MovieLobby = ({searchResults}) => {

	const [config, setConfig] = useState({});
	const [searchCollection, setSearchCollection] = useState([]);
	const [drawerChangedFlag, setDrawerChangedFlag] = useState(true);

	useEffect(() => {
		if(!config.length) {
			fetch('https://api.themoviedb.org/3/configuration?api_key=f22de4bcfe9ad240a4bdeb99b1c5b637')
			.then(res => res.json())
			.then((data) => {
			  setConfig({baseUrl: data.images.secure_base_url})
			})
			.catch(console.log)
		}
		if(searchResults) {
			setSearchCollection(searchResults);
		}
	}, [searchResults, config.length])

	const types = {
		popular: 'popular',
		latest: 'latest',
		nowPlaying: 'now_playing',
		topRated: 'top_rated',
		upcoming: 'upcoming'
	}

	const classes = useStyles();

	const handleCloseResults = () => {
		setSearchCollection([]);
	}

	const handleCloseDrawers = () => {
		setDrawerChangedFlag(!drawerChangedFlag);
	}

	return (
		<div className={classes.lobbyContainer}>
			{!searchCollection.length && <div className={classes.mainLobby}>
				<Carousel config={config} type={types.popular} handleCloseDrawers={handleCloseDrawers} drawerChangedFlag={drawerChangedFlag}/>
				<Carousel config={config} type={types.nowPlaying} handleCloseDrawers={handleCloseDrawers} drawerChangedFlag={drawerChangedFlag}/>
				<Carousel config={config} type={types.topRated} handleCloseDrawers={handleCloseDrawers} drawerChangedFlag={drawerChangedFlag}/>
				<Carousel config={config} type={types.upcoming} handleCloseDrawers={handleCloseDrawers} drawerChangedFlag={drawerChangedFlag}/>
			</div>}
			{searchCollection.length && searchCollection && <SearchResults className={classes.searchResults} config={config} searchResults={searchCollection}
			handleCloseResults={handleCloseResults} handleCloseDrawers={handleCloseDrawers} drawerChangedFlag={drawerChangedFlag}/>}
		</div>
	);
}

export default MovieLobby;
