const isProd = import.meta.env.VITE_APP_ENV === "production";

const API_BASE_URL =
  isProd
    ? "https://api.michellenews.soon.it"
    : 'http://localhost:3001'

// Helper to handle response and extract actual error message
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    // Handle validation errors from Celebrate
    if (data.validation) {
      const validationError = data.validation.body?.message || data.message;
      const error = new Error(validationError);
      error.statusCode = response.status;
      throw error;
    }
    // Handle regular error messages
    const error = new Error(data.message || `HTTP ${response.status}`);
    error.statusCode = response.status;
    throw error;
  }

  return data;
};

// AUTHENTICATION
export const authApi = {
  signUp: (email, password, username) =>
    fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    }).then(handleResponse),

  signIn: (email, password) =>
    fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  getCurrentUser: (token) =>
    fetch(`${API_BASE_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse),
};

// SAVED ARTICLES
export const articlesApi = {
  getSavedArticles: (token) =>
    fetch(`${API_BASE_URL}/saved-news`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse),

  saveArticle: (token, article, tag) =>
    fetch(`${API_BASE_URL}/saved-news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: article.url,
        tag,
        image: article.urlToImage,
        date: article.publishedAt,
        title: article.title,
        description: article.description,
        source: article.source.name,
      }),
    }).then(handleResponse),

  deleteArticle: (token, articleId) =>
    fetch(`${API_BASE_URL}/saved-news/${articleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse),
};
