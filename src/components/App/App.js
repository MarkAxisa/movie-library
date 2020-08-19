import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './../Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import MovieLobby from '../MovieLobby/MovieLobby';
import SearchWidget from './../SearchWidget/SearchWidget';
import useFetchMedia from './../useFetchMedia';

const App = () => {

	const [isMobile, setIsMobile] = useState(undefined);
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const { handleFetchMoviesByTitle, handleFetchMoviesByGenre } = useFetchMedia();

	const useStyles = makeStyles(() => ({
		app: {
			font: '#fff',
		}
	}));

	const classes = useStyles();


	const handleWindowResize = () => {
		setIsMobile(window.innerWidth <= 500);
	}

	useEffect(() => {
		isSearchOpen ?
		document.body.classList.add('scrollLock') :
		document.body.classList.remove('scrollLock')

		handleWindowResize();
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);

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

	const disposeSearchResults = () => {
		setSearchResults([]);
	}

	return (
		<div className={classes.app}>
			<Navbar toggleSearch={toggleSearch} isMobile={isMobile}/>
			<MovieLobby searchResults={searchResults}
						disposeSearchResults={disposeSearchResults}
						isMobile={isMobile}/>
			<SearchWidget isSearchOpen={isSearchOpen}
						toggleSearch={setSearchOpen}
						searchByTitle={searchByTitle}
						searchByGenre={searchByGenre}
						isMobile={isMobile}/>
		</div>
	);
}

export default App;
