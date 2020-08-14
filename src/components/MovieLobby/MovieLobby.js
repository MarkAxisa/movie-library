import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '../MovieCarousel/Carousel';

const useStyles = makeStyles(() => ({
	lobby: {
		color: '#fff',
		background: '#000',
		width: '90%',
		margin: 'auto',
		marginTop: '5%',
		height: '1000px'
	}
  }));

const MovieLobby = () => {

	const [config, setConfig] = useState({});

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/configuration?api_key=f22de4bcfe9ad240a4bdeb99b1c5b637')
        .then(res => res.json())
        .then((data) => {
          setConfig({baseUrl: data.images.secure_base_url})
        })
        .catch(console.log)
	}, [])

	const classes = useStyles();
	return (
		<div className={classes.lobby}>
			Movie Lobby
			<Carousel config={config}/>
			New Movies
			<Carousel config={config}/>

		</div>
	);
}

export default MovieLobby;
