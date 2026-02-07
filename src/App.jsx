import './App.css'
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Header from '../components/Header/Header';
import SignInModal from '../components/Modal/SignInModal';
import SignUpModal from '../components/Modal/SignUpModal';
import SignUpCompleteModal from '../components/Modal/SignUpCompleteModal';
import Footer from '../components/Footer/Footer';
import SavedNews from '../components/SavedNews/SavedNews';
import Home from '../pages/Home';

function App() {
    const [open, setOpen] = useState("");
    const [headerVariant, setHeaderVariant] = useState("");
    const [route, setRoute] = useState("");

    return (
        <>
            <Header variant={headerVariant} route={route} />
            <SignInModal isOpen={open} onClose={() => setOpen("")} />
            <SignUpModal isOpen={open} onClose={() => setOpen("")} />
            <SignUpCompleteModal isOpen={open} onClose={() => setOpen("")} />

            <Routes>
                <Route path="/" element={<Home setHeader={setHeaderVariant} setRoute={setRoute} />} />
                <Route path="/saved-news" element={<SavedNews setHeader={setHeaderVariant} setRoute={setRoute} />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
