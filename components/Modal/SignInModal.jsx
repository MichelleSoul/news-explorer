import Button from "../Button/Button";
import Modal from "./Modal";
import { useState } from "react";
import { authApi } from "../../src/utils/api";

export default function SignInModal({ isOpen, onClose, onSignInSuccess = () => {} }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await authApi.signIn(email, password);
            
            if (response.token) {
                localStorage.setItem('token', response.token);
                
                // Fetch user data to get the actual username
                const userData = await authApi.getCurrentUser(response.token);
                
                setEmail("");
                setPassword("");
                onSignInSuccess(userData.username);
            }
        } catch (err) {
            setError(err.message || "An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSwitchToSignUp = () => {
        setEmail("");
        setPassword("");
        setError("");
        onClose();
        // Signal parent to open signup modal
        const event = new CustomEvent('openSignUp');
        window.dispatchEvent(event);
    };

    return (
        <Modal isOpen={isOpen === "signin"} onClose={onClose}>
            <div>
                <h1 className="mb-4.5 font-roboto text-2xl font-black text-black">
                    Sign In
                </h1>
            </div>
            <form onSubmit={handleSubmit} noValidate >
                <div className="mb-3.25">
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
                    <p className="font-inter text-xs text-[red] mt-1.5">
                        {error ? error : "\u00A0"}
                    </p>
                </div>
                <div className="mb-9.75">
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
                <Button type="submit" className="mb-4" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                <div className="text-center font-inter text-sm text-black">
                    or{" "}
                    <span 
                        className="cursor-pointer text-[#2F71E5] hover:underline"
                        onClick={handleSwitchToSignUp}
                    >
                        Sign Up
                    </span>
                </div>
            </form>
        </Modal>
    );
}
