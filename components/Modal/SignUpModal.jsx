import Button from "../Button/Button";
import Modal from "./Modal";
import { useState } from "react";
import { authApi } from "../../src/utils/api";

export default function SignUpModal({ isOpen, onClose, onSignUpSuccess = () => {} }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await authApi.signUp(email, password, username);
            
            if (response._id) {
                setEmail("");
                setPassword("");
                setUsername("");
                onSignUpSuccess();
                // Signal parent to show completion modal
                const event = new CustomEvent('openComplete');
                window.dispatchEvent(event);
            }
        } catch (err) {
            setError(err.message || "An error occurred during sign up");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSwitchToSignIn = () => {
        setEmail("");
        setPassword("");
        setUsername("");
        setError("");
        onClose();
        // Signal parent to open signin modal
        const event = new CustomEvent('openSignIn');
        window.dispatchEvent(event);
    };

    return (
        <Modal isOpen={isOpen === "signup"} onClose={onClose}>
            <div>
                <h1 className="mb-4.5 font-roboto text-2xl font-black text-black">
                    Sign Up
                </h1>
            </div>
            <form onSubmit={handleSubmit} noValidate >
                <div className="mb-7.5">
                    <label
                        htmlFor="email"
                        className="font-inter text-xs font-normal text-[#2F71E5]"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter email"
                        className="w-full bg-transparent border-0 border-b border-black/20 px-0 py-2 font-inter text-sm outline-none focus:border-[#2F71E5]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-7.5">
                    <label
                        htmlFor="password"
                        className="font-inter text-xs font-normal text-[#2F71E5]"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter password"
                        className="w-full bg-transparent border-0 border-b border-black/20 px-0 py-2 font-inter text-sm outline-none focus:border-[#2F71E5]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4.25">
                    <label
                        htmlFor="username"
                        className="font-inter text-xs font-normal text-[#2F71E5]"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full bg-transparent border-0 border-b border-black/20 px-0 py-2 font-inter text-sm outline-none focus:border-[#2F71E5]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <p className="font-inter text-xs text-[red] text-center mb-2">
                    {error ? error : "\u00A0"}
                </p>
                <Button type="submit" className="mb-4" disabled={isLoading}>
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </Button>
                <div className="text-center font-inter text-sm text-black">
                    or{" "}
                    <span 
                        className="cursor-pointer text-[#2F71E5] hover:underline"
                        onClick={handleSwitchToSignIn}
                    >
                        Sign In
                    </span>
                </div>
            </form>
        </Modal>
    );
}
