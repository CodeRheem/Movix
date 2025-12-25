<!-- import React, { useState, useEffect } from 'react';
import { Heart, Star, Calendar, Clock, Trash2, Play, Info, Grid, List, Loader } from 'lucide-react';

export default function MovieFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

  // Configuration - Replace with your actual API details
  const API_KEY = 'API_KEY';
  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  // Load favorites from localStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      // Get favorite movie IDs from localStorage
      const favoriteIds = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
      
      if (favoriteIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      // Fetch details for each favorite movie
      const moviePromises = favoriteIds.map(id => 
        fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`)
          .then(res => res.json())
      );

      const movies = await Promise.all(moviePromises);
      
      // Add addedDate from localStorage if stored
      const favoritesWithDates = movies.map(movie => ({
        ...movie,
        addedDate: localStorage.getItem(`movie_${movie.id}_added`) || new Date().toISOString()
      }));

      setFavorites(favoritesWithDates);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (movieId) => {
    // Remove from state
    setFavorites(favorites.filter(movie => movie.id !== movieId));
    
    // Update localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    const updatedIds = favoriteIds.filter(id => id !== movieId);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedIds));
    localStorage.removeItem(`movie_${movieId}_added`);
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch(sortBy) {
      case 'recent':
        return new Date(b.addedDate) - new Date(a.addedDate);
      case 'rating':
        return (b.vote_average || 0) - (a.vote_average || 0);
      case 'title':
        return (a.title || '').localeCompare(b.title || '');
      case 'year':
        return (b.release_date || '').localeCompare(a.release_date || '');
      default:
        return 0;
    }
  });

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your favorites...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                MovieHub
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Home</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Movies</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">TV Shows</a>
                <a href="#" className="text-white font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  Favorites
                </a>
              </div>
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                placeholder="Search movies..." 
                className="hidden md:block bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none w-64"
              />
            </div>
      </nav>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <h2 className="text-4xl font-bold text-white">My Favorites</h2>
              </div>
              <p className="text-slate-400">
                {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls Bar */}
        {favorites.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <label className="text-slate-300 text-sm font-medium">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none cursor-pointer"
              >
                <option value="recent">Recently Added</option>
                <option value="rating">Highest Rating</option>
                <option value="title">Title (A-Z)</option>
                <option value="year">Release Year</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm mr-2">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-20 bg-slate-900 rounded-lg border border-slate-800">
            <Heart className="w-20 h-20 text-slate-700 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">No favorites yet</h3>
            <p className="text-slate-400 mb-6">Start adding movies to your favorites list!</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
              Browse Movies
            </button>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && favorites.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {sortedFavorites.map((movie) => (
              <div 
                key={movie.id}
                className="group relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
                  <img 
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Rating Badge */}
                  {movie.vote_average > 0 && (
                    <div className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(movie.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-300"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Hover Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded flex items-center justify-center gap-1 text-sm font-medium transition-colors">
                        <Play className="w-4 h-4" />
                        Play
                      </button>
                      <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded transition-colors">
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1" title={movie.title}>
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{getYear(movie.release_date)}</span>
                    {movie.runtime && (
                      <>
                        <span>•</span>
                        <span>{formatRuntime(movie.runtime)}</span>
                      </>
                    )}
                  </div>
                  {movie.genres && movie.genres.length > 0 && (
                    <p className="text-slate-500 text-xs mt-1">
                      {movie.genres.slice(0, 2).map(g => g.name).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && favorites.length > 0 && (
          <div className="space-y-4">
            {sortedFavorites.map((movie) => (
              <div 
                key={movie.id}
                className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex gap-4 p-4">
                  {/* Poster Thumbnail */}
                  <div className="flex-shrink-0 w-20 h-28 rounded overflow-hidden bg-slate-800">
                    <img 
                      src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Movie Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-2">
                          {movie.vote_average > 0 && (
                            <>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}</span>
                              </div>
                              <span>•</span>
                            </>
                          )}
                          <span>{getYear(movie.release_date)}</span>
                          {movie.runtime && (
                            <>
                              <span>•</span>
                              <span>{formatRuntime(movie.runtime)}</span>
                            </>
                          )}
                        </div>
                        {movie.genres && movie.genres.length > 0 && (
                          <p className="text-slate-400 text-sm mb-2">
                            {movie.genres.map(g => g.name).join(', ')}
                          </p>
                        )}
                        {movie.overview && (
                          <p className="text-slate-500 text-sm line-clamp-2">{movie.overview}</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                          <Play className="w-4 h-4" />
                          Watch
                        </button>
                        <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemove(movie.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} -->