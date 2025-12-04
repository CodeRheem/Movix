import { getApiUrl, getImageUrl } from './api';

// Fetch popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const url = getApiUrl('/movie/popular', { page });
    const response = await fetch(url);
    const data = await response.json();
    
    // Transform data to include full image URLs
    const movies = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: getImageUrl(movie.poster_path),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      overview: movie.overview
    }));
    
    return {
      movies,
      totalPages: data.total_pages,
      currentPage: data.page
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { movies: [], totalPages: 0, currentPage: 1 };
  }
};