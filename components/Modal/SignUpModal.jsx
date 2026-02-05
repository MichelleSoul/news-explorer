import Button from "../Button/Button";
import Modal from "./Modal";

export default function SignUpModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h1 className="mb-4.5 font-roboto text-2xl font-black text-black">
                    Sign Up
                </h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                console.log("Submit:", { email, password });
            }}>
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
                        required
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
                        required
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
                        type="username"
                        placeholder="Enter your username"
                        className="w-full bg-transparent border-0 border-b border-black/20 px-0 py-2 font-inter text-sm outline-none focus:border-[#2F71E5]"
                        required
                    />
                </div>
                <p className="font-inter text-xs text-[red] text-center mb-2">Invalid email address</p>
                <Button type="submit" className="mb-4" disabled >Sign Up</Button>
                <div className="text-center font-inter text-sm text-black">
                    or{" "}
                    <span className="cursor-pointer text-[#2F71E5] hover:underline">
                        Sign In
                    </span>
                </div>
            </form>
        </Modal>
    );
}
