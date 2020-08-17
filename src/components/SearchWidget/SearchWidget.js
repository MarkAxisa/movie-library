import React, { useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useSearch from './useSearch';
import useFetchMedia from './../useFetchMedia';
import {isMobile} from 'react-device-detect';

const SearchWidget = ({isSearchOpen, toggleSearch, searchByTitle, searchByGenre}) => {
	const [searchOpen, setSearchOpen] = useState(false);
	const [genres, setGenres] = useState([]);
	const searchInput = useRef(null);
	const { handleSearchToggle, searchShown} = useSearch();
	const { handleFetchGenres } = useFetchMedia();

	useEffect(() => {
		if(!genres.length) {
			handleFetchGenres()
			.then(res => res.json())
			.then((data) => {
				setGenres(data['genres']);
			})
			.catch(console.log);
		}
		setSearchOpen(isSearchOpen);
		searchInput.current.focus();
		if(isSearchOpen) {
			searchInput.current.value = '';
		}
	}, [isSearchOpen, genres.length, handleFetchGenres]);

	const useStyles = makeStyles(() => ({
		searchOverlay: {
			width: '100%',
			height: '100%',
			left: '100%',
			zIndex: '400',
			top: '0',
			position: 'fixed',
			background: 'rgb(47 47 47 / 90%)',
			transition:  'transform 300ms ease 100ms',
			transform: searchOpen? 'translateX(-100%)': 'none',
			color: '#fff'
		},
		searchInput: {
			width: '7em',
			top: '30%',
			left: '20%',
			position: 'absolute',
			background: 'none',
			border: 'none',
			fontSize: isMobile ? '2.5em' : '6vw',
			color: '#fff',
			outline: 'none'
		},
		searchClose: {
			position: 'absolute',
			right: '0',
			"& svg": {
				fontSize: '2em'
			}
		},
		searchFilters: {
			background: 'none',
			border: '1px solid #fff',
			color: '#fff',
			padding: '0.5em 1em',
			cursor: 'pointer',
			margin: '1em 0.5em',
			fontSize: '1em'
		},
		searchWidgetContainer: {
			left: '0',
			width: '100%',
			height: '100%',
			position: 'absolute',
			transition:  'transform 300ms ease 100ms',
			transform: searchShown? 'none' : 'translateX(-100%)'
		},
		genreSelector: {
			left: '100%',
			width: '100%',
			height: '100%',
			position: 'absolute',
			transition:  'transform 300ms ease 100ms',
			transform: searchShown? 'none' : 'translateX(-100%)'
		},
		genreList: {
			position: 'absolute',
			margin: 'auto',
			left: isMobile ? '0' : '20%',
			paddingRight: '90%',
			listStyle: 'none',
			height: '42%',
			top: '10%',
			overflowY: 'scroll',
			fontSize: isMobile ? '3em' : '4em',
		},
		genreItem: {
			cursor: 'pointer',
			padding: '0 0.5em',
			border: '1px solid transparent',
			transition:  '0.2s',
			"&:hover": {
				border: '1px solid',
			}
		}
	}));
	const classes = useStyles();

	const handleShowSearch = (show) => {
		handleSearchToggle(show);
		searchInput.current.focus();
	}

	const handleSearchClose = () => {
		handleSearchToggle(true);
		toggleSearch();
	}

	const handleSearchKeyDown = (e) => {
		if (e.key === 'Enter') {
			searchByTitle(e.currentTarget.value);
		}
	}

	const handleSearchByGenre = (genreId) => {
		handleSearchToggle(true);
		searchByGenre(genreId);
	}

	return (
		<div className={classes.searchOverlay}>
			<input className={classes.searchFilters} onClick={() => handleShowSearch(true)} type="button" value="Title"></input>
			<input className={classes.searchFilters} onClick={() => handleSearchToggle(false)} type="button" value="Genre"></input>

			<IconButton edge='start' className={classes.searchClose} onClick={handleSearchClose} color='inherit' aria-label='menu'>
				<CloseIcon/>
			</IconButton>
			<div className={classes.searchWidgetContainer}>
				<input ref={searchInput} className={classes.searchInput} onKeyDown={handleSearchKeyDown} spellCheck="false" autoComplete="off" placeholder='Search by Title' />
			</div>
			<div className={classes.genreSelector}>
				<ul className={classes.genreList}>
					{genres.map((genre) => (
						<li className={classes.genreItem} key={genre.id} onClick={() => {handleSearchByGenre(genre.id)}} itemID={genre.id}>
							<span>{genre.name}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default SearchWidget;
