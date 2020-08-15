import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SearchWidget = ({isSearchOpen}) => {
	const [searchOpen, setSearchOpen] = useState(false);

	useEffect(() => {
		setSearchOpen(isSearchOpen);
	}, [isSearchOpen]);

	const useStyles = makeStyles(() => ({
		searchOverlay: {
			width: '100%',
			height: '100%',
			left: '100%',
			zIndex: '100',
			top: '0',
			position: 'fixed',
			background: 'rgb(47 47 47 / 90%)',
			transition:  'transform 300ms ease 100ms',
			transform: searchOpen? 'translateX(-100%)': 'none',
			color: '#fff'
		},
		input: {
			width: '30em',
			top: '30%',
			left: '20%',
			position: 'absolute',
			background: 'none',
			border: 'none',
			fontSize: '7em',
			color: '#fff',
			outline: 'none'
		},
		searchClose: {
			position: 'absolute',
			right: '0',
			"& svg": {
				fontSize: '2.5em'
			}
		}
	}));
	const classes = useStyles();
	const handleSearchClose = () => {
		setSearchOpen(false);
	}
	return (
		<div className={classes.searchOverlay}>
			<IconButton edge='start' className={classes.searchClose} onClick={handleSearchClose} color='inherit' aria-label='menu'>
				<CloseIcon/>
			</IconButton>
			<form className={classes.form} noValidate autoComplete="off">
				<input className={classes.input} placeholder='Search' />
			</form>
		</div>
	);
}

export default SearchWidget;
