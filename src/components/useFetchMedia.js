const useFetchMedia = () => {
	const apiKey = 'f22de4bcfe9ad240a4bdeb99b1c5b637';

	const handleFetchConfig = () => {
		return fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
	}

	const handleFetchMoviesByType = (type) => {
		return fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=1`);
	}

	const handleFetchMoviesByTitle = (query) => {
		return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`);
	}

	const handleFetchMoviesByGenre = (genre) => {
		return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`);
	}

	const handleFetchGenres = () => {
		return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
	}

	return { handleFetchConfig, handleFetchMoviesByType, handleFetchMoviesByTitle, handleFetchMoviesByGenre, handleFetchGenres };
}

export default useFetchMedia