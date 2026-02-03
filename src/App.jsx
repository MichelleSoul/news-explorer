import './App.css'
import Modal from '../components/Modal/Modal';
import { useState } from "react";
import SignUpModal from '../components/Modal/SignUpModal';

function App() {
    const [open, setOpen] = useState(true);

    return (
        <>
            <SignUpModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default App
