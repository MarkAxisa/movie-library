import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchButton from './../SearchWidget/SearchButton';

const Navbar = ({toggleSearch, isMobile}) => {

	const useStyles = makeStyles(() => ({
		root: {
			flexGrow: 1,
		},
		appBar: {
			position: 'fixed',
			zIndex: '300'
		},
		toolbar: {
			background: 'rgba(0,0,0,0.8)',
			width: '100%',
			position: 'fixed',
			padding: isMobile ? '0 5%' : '0 3em'
		},
		searchButton: {
			position: 'absolute',
			right: isMobile ? '2.5em' :'7em',
			"& svg": {
				fontSize: '1.5em'
			}
		},
		title: {
			left: '0',
			fontSize: isMobile ? '1.6em' : '2em',
			textDecoration: 'none',
			color: '#fff'
		},
	}));
	
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<a className={classes.title} href="#">Movie Library</a>
					<div className={classes.searchButton}>
						<SearchButton toggleSearch={toggleSearch}/>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar