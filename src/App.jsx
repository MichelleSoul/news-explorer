import './App.css'
import { useState } from "react";
import Header from '../components/Header/Header';
import SignUpModal from '../components/Modal/SignUpModal';

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Header variant="" />
            <SignUpModal isOpen={open} onClose={() => setOpen(false)} />
            <div className='bg-gray-500 w-full h-screen -translate-y-20'></div>
        </>
    )
}

export default App
