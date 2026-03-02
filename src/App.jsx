import './App.css'
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Header from '../components/Header/Header';
import SignInModal from '../components/Modal/SignInModal';
import SignUpModal from '../components/Modal/SignUpModal';
import SignUpCompleteModal from '../components/Modal/SignUpCompleteModal';
import Footer from '../components/Footer/Footer';
import SavedNews from '../components/SavedNews/SavedNews';
import Home from '../pages/Home';
import { searchNews } from './utils/newsApi';

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

    // Simulated auth state
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [savedArticles, setSavedArticles] = useState([])

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

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
    }

    return (
        <>
            <Header variant={headerVariant} route={route} isLoggedIn={isLoggedIn} onSignIn={handleLogin} onLogout={handleLogout} />
            <SignInModal isOpen={open} onClose={() => setOpen("")} />
            <SignUpModal isOpen={open} onClose={() => setOpen("")} />
            <SignUpCompleteModal isOpen={open} onClose={() => setOpen("")} />

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
                
                <Route path="/saved-news" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} >
                        <SavedNews setHeader={setHeaderVariant} setRoute={setRoute} />
                    </ProtectedRoute>
                } />
            </Routes>

            <Footer />
        </>
    )
}

export default App
