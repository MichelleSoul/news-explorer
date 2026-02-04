import './App.css'
import { useState } from "react";
import Header from '../components/Header/Header';
import SignUpModal from '../components/Modal/SignUpModal';
import Hero from '../components/Button/Hero/Hero';
import Author from '../components/Author/Author';

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Header />
            <SignUpModal isOpen={open} onClose={() => setOpen(false)} />
            <Hero />
            <Author />
        </>
    )
}

export default App
