import './App.css'
import { useState } from "react";
import Header from '../components/Header/Header';
import SignUpModal from '../components/Modal/SignUpModal';
import Hero from '../components/Button/Hero/Hero';

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Header />
            <SignUpModal isOpen={open} onClose={() => setOpen(false)} />
            <Hero />
        </>
    )
}

export default App
