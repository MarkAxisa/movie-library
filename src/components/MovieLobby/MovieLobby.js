import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '../MovieCarousel/Carousel';
import SearchResults from './../SearchResults/SearchResults';

const useStyles = makeStyles(() => ({
	lobbyContainer: {
		color: '#fff',
		background: '#000',
		width: '90%',
		margin: 'auto',
		paddingTop: '8em',
		height: '1000px'
	}
  }));

const MovieLobby = ({searchResults}) => {

	const [config, setConfig] = useState({});
	const [searchCollection, setSearchCollection] = useState([]);

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
	return (
		<div className={classes.lobbyContainer}>
			{!searchCollection.length && <div className={classes.mainLobby}>
				<Carousel config={config} type={types.popular}/>
				<Carousel config={config} type={types.nowPlaying}/>
				<Carousel config={config} type={types.topRated}/>
				<Carousel config={config} type={types.upcoming}/>
			</div>}
			{searchCollection.length && searchCollection && <SearchResults config={config} searchResults={searchCollection} handleCloseResults={handleCloseResults} />}
		</div>
	);
}

export default MovieLobby;
