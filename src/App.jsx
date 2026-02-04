import './App.css'
import { useState } from "react";
import Header from '../components/Header/Header';
import SignUpModal from '../components/Modal/SignUpModal';
import Hero from '../components/Hero/Hero';
import Author from '../components/Author/Author';
import Footer from '../components/Footer/Footer';
import SearchResults from '../components/SearchResults/SearchResults';

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Header />
            <SignUpModal isOpen={open} onClose={() => setOpen(false)} />
            <Hero />
            <SearchResults />
            <Author />
            <Footer />
        </>
    )
}

export default App
