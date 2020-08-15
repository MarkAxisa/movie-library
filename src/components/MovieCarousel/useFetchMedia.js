const useFetchMedia = () => {

	const handleFetchMoviesByType = (type) => {
		return fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=f22de4bcfe9ad240a4bdeb99b1c5b637&language=en-US&page=1`);
	}

	return { handleFetchMoviesByType };
}

export default useFetchMedia