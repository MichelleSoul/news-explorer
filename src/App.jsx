import './App.css'
import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import Header from '../components/Header/Header';
import SignInModal from '../components/Modal/SignInModal';
import SignUpModal from '../components/Modal/SignUpModal';
import SignUpCompleteModal from '../components/Modal/SignUpCompleteModal';
import Footer from '../components/Footer/Footer';
import SavedNews from '../components/SavedNews/SavedNews';
import Home from '../pages/Home';
import { searchNews } from './utils/newsApi';
import { authApi, articlesApi } from './utils/api';

function App() {
    const [open, setOpen] = useState("");
    const [headerVariant, setHeaderVariant] = useState("");
    const [route, setRoute] = useState("");

    // Search and articles state
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [hasSearched, setHasSearched] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)
    const [currentSearchTerm, setCurrentSearchTerm] = useState("")

    // Auth state
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [_isCheckingAuth, setIsCheckingAuth] = useState(true)
    
    // Saved articles from backend (source of truth)
    const [backendSavedArticles, setBackendSavedArticles] = useState([])
    
    // Merged articles with derived UI state (isSaved, savedId)
    const [mergedArticles, setMergedArticles] = useState([])

    // Session detection on app load and fetch saved articles
    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                if (isMounted) setIsCheckingAuth(false);
                return;
            }

            try {
                const userData = await authApi.getCurrentUser(token);
                if (!isMounted) return;

                setIsLoggedIn(true);
                setUsername(userData.username);
                
                // Fetch saved articles for authenticated user (once per session)
                const saved = await articlesApi.getSavedArticles(token);
                if (isMounted) setBackendSavedArticles(saved);
            } catch {
                if (!isMounted) return;

                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setUsername("");
                setBackendSavedArticles([]);
            } finally {
                if (isMounted) setIsCheckingAuth(false);
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    // Modal switching via custom events
    useEffect(() => {
        const handleOpenSignUp = () => {
            setOpen("signup");
        };
        const handleOpenSignIn = () => {
            setOpen("signin");
        };
        const handleOpenComplete = () => {
            setOpen("complete");
        };

        window.addEventListener('openSignUp', handleOpenSignUp);
        window.addEventListener('openSignIn', handleOpenSignIn);
        window.addEventListener('openComplete', handleOpenComplete);

        return () => {
            window.removeEventListener('openSignUp', handleOpenSignUp);
            window.removeEventListener('openSignIn', handleOpenSignIn);
            window.removeEventListener('openComplete', handleOpenComplete);
        };
    }, []);

    // Merge News API articles with saved articles metadata
    const mergeArticles = (newsArticles, saved) => {
        return newsArticles.map(article => ({
            ...article,
            isSaved: saved.some(s => s.url === article.url),
            savedId: saved.find(s => s.url === article.url)?._id || null,
        }));
    };

    const handleSearch = (keyword) => {
        if (!keyword.trim()) {
            setError("Please enter a keyword")
            return
        }

        setCurrentSearchTerm(keyword.trim())
        setHasSearched(true)
        setIsLoading(true)
        setError("")
        setMergedArticles([])
        setVisibleCount(3)

        searchNews(keyword)
            .then((data) => {
                const newsArticles = data.articles || [];
                const merged = mergeArticles(newsArticles, backendSavedArticles);
                setMergedArticles(merged);
            })
            .catch(() => {
                setError(
                    "Sorry, something went wrong during the request. Please try again later."
                )
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleSave = async (article) => {
        if (!isLoggedIn) {
            window.dispatchEvent(new Event('openSignIn'));
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            // Optimistically update merged articles
            setMergedArticles(prev =>
                prev.map(a =>
                    a.url === article.url ? { ...a, isSaved: true } : a
                )
            );

            // Call backend API to save article
            // Capitalize first letter of search term for tag
            const tag = currentSearchTerm.charAt(0).toUpperCase() + currentSearchTerm.slice(1);
            const savedArticle = await articlesApi.saveArticle(
                token,
                article,
                tag
            );

            // Update backend saved articles with actual response
            setBackendSavedArticles(prev => [...prev, savedArticle]);
            
            // Update merged articles with the actual savedId from response
            setMergedArticles(prev =>
                prev.map(a =>
                    a.url === article.url ? { ...a, isSaved: true, savedId: savedArticle._id } : a
                )
            );
        } catch (err) {
            console.error("Error saving article:", err);
            // Revert optimistic update on error
            setMergedArticles(prev =>
                prev.map(a =>
                    a.url === article.url ? { ...a, isSaved: false } : a
                )
            );
        }
    };

    const handleDelete = async (article) => {
        if (!isLoggedIn || !article.savedId) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            // Optimistically update merged articles
            setMergedArticles(prev =>
                prev.map(a =>
                    a.url === article.url ? { ...a, isSaved: false, savedId: null } : a
                )
            );

            // Call backend API to delete article
            await articlesApi.deleteArticle(token, article.savedId);

            // Update backend saved articles
            setBackendSavedArticles(prev =>
                prev.filter(a => a._id !== article.savedId)
            );
        } catch (err) {
            console.error("Error deleting article:", err);
            // Revert optimistic update on error
            setMergedArticles(prev =>
                prev.map(a =>
                    a.url === article.url ? { ...a, isSaved: true, savedId: article.savedId } : a
                )
            );
        }
    };

    const handleOpenSignIn = () => {
        setOpen("signin")
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUsername("")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                variant={headerVariant}
                route={route}
                isLoggedIn={isLoggedIn}
                username={username}
                onSignIn={handleOpenSignIn}
                onLogout={handleLogout}
            />
            <SignInModal isOpen={open} onClose={() => setOpen("")} onSignInSuccess={(newUsername) => {
                setUsername(newUsername)
                setIsLoggedIn(true)
                setOpen("")
            }} />
            <SignUpModal isOpen={open} onClose={() => setOpen("")} onSignUpSuccess={() => {
                setOpen("")
            }} />
            <SignUpCompleteModal isOpen={open} onClose={() => setOpen("")} onSignInClick={() => {
                setOpen("signin")
            }} />

            <div className="flex-1">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                setHeader={setHeaderVariant}
                                setRoute={setRoute}
                                onSearch={handleSearch}
                                articles={mergedArticles}
                                isLoading={isLoading}
                                error={error}
                                hasSearched={hasSearched}
                                visibleCount={visibleCount}
                                onShowMore={() => setVisibleCount(v => v + 3)}
                                isLoggedIn={isLoggedIn}
                                onSave={handleSave}
                                onDelete={handleDelete}
                            />
                        }
                    />
                    <Route path="/saved-news" element={<SavedNews setHeader={setHeaderVariant} setRoute={setRoute} username={username} />} />
                </Routes>
            </div>

            <Footer />
        </div>
    )
}

export default App
