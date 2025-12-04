// Base URL for TMDb API
const BASE_URL = 'https://api.themoviedb.org/3';

// The API key for authentication
const API_KEY = 'd4696b33233eb721be83a52369a78bac';

// Helper function to build URLs
export const getApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  
  // Add any extra parameters
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  
  return url.toString();
};

// Image base URL
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Helper to get full image URL
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};