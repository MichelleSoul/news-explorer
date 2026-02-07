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
import { authApi } from './utils/api';

function App() {
    const [open, setOpen] = useState("");
    const [headerVariant, setHeaderVariant] = useState("");
    const [route, setRoute] = useState("");

    // Search and articles state
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [hasSearched, setHasSearched] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)

    // Auth state
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [_isCheckingAuth, setIsCheckingAuth] = useState(true)
    const [savedArticles, setSavedArticles] = useState([])

    // Session detection on app load
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
            } catch {
                if (!isMounted) return;

                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setUsername("");
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

    const handleSearch = (keyword) => {
        if (!keyword.trim()) {
            setError("Please enter a keyword")
            return
        }

        setHasSearched(true)
        setIsLoading(true)
        setError("")
        setArticles([])
        setVisibleCount(3)

        searchNews(keyword)
            .then((data) => {
                setArticles(data.articles || [])
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

    const handleSave = (article) => {
        setSavedArticles(prev => {
            if (prev.some(a => a.url === article.url)) {
                return prev
            }
            return [...prev, article]
        })
    }

    const handleDelete = (article) => {
        setSavedArticles(prev =>
            prev.filter(a => a.url !== article.url)
        )
    }

    const handleOpenSignIn = () => {
        setOpen("signin")
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUsername("")
    }

    return (
        <>
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

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            setHeader={setHeaderVariant}
                            setRoute={setRoute}
                            onSearch={handleSearch}
                            articles={articles}
                            isLoading={isLoading}
                            error={error}
                            hasSearched={hasSearched}
                            visibleCount={visibleCount}
                            onShowMore={() => setVisibleCount(v => v + 3)}
                            isLoggedIn={isLoggedIn}
                            savedArticles={savedArticles}
                            onSave={handleSave}
                            onDelete={handleDelete}
                        />
                    }
                />
                <Route path="/saved-news" element={<SavedNews setHeader={setHeaderVariant} setRoute={setRoute} username={username} />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
