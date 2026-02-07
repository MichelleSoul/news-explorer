import Button from "../Button/Button";
import Modal from "./Modal";

export default function SignInModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen === "signin"} onClose={onClose}>
            <div>
                <h1 className="mb-4.5 font-roboto text-2xl font-black text-black">
                    Sign In
                </h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                console.log("Submit:", { email, password });
            }}>
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
                        required
                    />
                    <p className="font-inter text-xs text-[red] mt-1.5">Invalid email address</p>
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
                        required
                    />
                </div>
                <Button type="submit" className="mb-4" disabled >Sign In</Button>
                <div className="text-center font-inter text-sm text-black">
                    or{" "}
                    <span className="cursor-pointer text-[#2F71E5] hover:underline">
                        Sign Up
                    </span>
                </div>
            </form>
        </Modal>
    );
}
