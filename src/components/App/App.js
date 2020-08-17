import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './../Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import MovieLobby from '../MovieLobby/MovieLobby';
import SearchWidget from './../SearchWidget/SearchWidget';
import useFetchMedia from './../useFetchMedia';

const App = () => {

	const useStyles = makeStyles(() => ({
		app: {
		font: '#fff',
		}
	}));

	const classes = useStyles();
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	const { handleFetchMoviesByTitle, handleFetchMoviesByGenre } = useFetchMedia();

	useEffect(() => {
		isSearchOpen ?
		document.body.classList.add('scrollLock') :
		document.body.classList.remove('scrollLock')
	}, [isSearchOpen])

	const toggleSearch = () => {
		setSearchOpen(!isSearchOpen);
	}

	const sliceData = (data) => {
		let resultList = [];
		const resultLength = data.results.length;
		for(let i = 0; i+8 < resultLength; i+=8) {
			resultList.push(data.results.splice(0, 8));
		}
		if(data.results.length) {
			resultList.push(data.results)
		}
		setSearchResults(resultList);
	}

	const searchByTitle = (query) => {
		setSearchOpen(false);
		handleFetchMoviesByTitle(query)
		.then((res) => res.json())
		.then((data) => {
			sliceData(data);
		}).catch(console.error);
	}

	const searchByGenre = (genre) => {
		setSearchOpen(false);
		handleFetchMoviesByGenre(genre)
		.then((res) => res.json())
		.then((data) => {
			sliceData(data);
		}).catch(console.error);
	}

	return (
		<div className={classes.app}>
			<Navbar toggleSearch={toggleSearch}/>
			<MovieLobby searchResults={searchResults}/>
			<SearchWidget isSearchOpen={isSearchOpen} toggleSearch={setSearchOpen} searchByTitle={searchByTitle} searchByGenre={searchByGenre}/>
		</div>
	);
}

export default App;
