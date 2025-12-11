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

// Fetch trending movies
export const getTrendingMovies = async (page = 1) => {
  try {
    const url = getApiUrl('/trending/movie/day', { page });
    const response = await fetch(url);
    const data = await response.json();
    
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
    console.error('Error fetching trending movies:', error);
    return { movies: [], totalPages: 0, currentPage: 1 };
  }
};

// Fetch top rated movies
export const getTopRatedMovies = async (page = 1) => {
  try {
    const url = getApiUrl('/movie/top_rated', { page });
    const response = await fetch(url);
    const data = await response.json();
    
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
    console.error('Error fetching top rated movies:', error);
    return { movies: [], totalPages: 0, currentPage: 1 };
  }
};

// Fetch single movie details
export const getMovieDetails = async (movieId) => {
  try {
    const url = getApiUrl(`/movie/${movieId}`);
    const response = await fetch(url);
    const movie = await response.json();
    
    return {
      id: movie.id,
      title: movie.title,
      poster: getImageUrl(movie.poster_path),
      backdrop: getImageUrl(movie.backdrop_path, 'original'),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      runtime: movie.runtime,
      overview: movie.overview,
      genres: movie.genres,
      tagline: movie.tagline,
      status: movie.status
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Fetch movie cast
export const getMovieCast = async (movieId) => {
  try {
    const url = getApiUrl(`/movie/${movieId}/credits`);
    const response = await fetch(url);
    const data = await response.json();
    
    // Get only the top 10 cast members
    const cast = data.cast.slice(0, 10).map(person => ({
      id: person.id,
      name: person.name,
      character: person.character,
      profileImage: getImageUrl(person.profile_path, 'w185')
    }));
    
    return cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    return [];
  }
};

// Fetch movie videos (trailers)
export const getMovieVideos = async (movieId) => {
  try {
    const url = getApiUrl(`/movie/${movieId}/videos`);
    const response = await fetch(url);
    const data = await response.json();
    
    // Find the first YouTube trailer
    const trailer = data.results.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    
    return trailer ? {
      key: trailer.key,
      name: trailer.name,
      youtubeUrl: `https://www.youtube.com/embed/${trailer.key}`
    } : null;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return null;
  }
};

// Search for movies
export const searchMovies = async (query, page = 1) => {
  try {
    const url = getApiUrl('/search/movie', { query, page });
    const response = await fetch(url);
    const data = await response.json();
    
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
      totalResults: data.total_results,
      currentPage: data.page
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
  }
};