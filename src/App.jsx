import './App.css'
import { useState } from "react";
import Header from '../components/Header/Header';
import SignUpModal from '../components/Modal/SignUpModal';
import Hero from '../components/Hero/Hero';
import Author from '../components/Author/Author';
import Footer from '../components/Footer/Footer';
import SearchResults from '../components/SearchResults/SearchResults';
import SearchLoad from '../components/SearchLoad/SearchLoad';
import SavedNews from '../components/SavedNews/SavedNews';

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Header variant="white" />
            <SignUpModal isOpen={open} onClose={() => setOpen(false)} />
            <SavedNews />
            <Footer />
        </>
    )
}

export default App
