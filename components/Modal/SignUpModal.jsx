import ModalWithForm from "./ModalWithForm";

export default function SignUpModal({ isOpen, onClose }) {
    return (
        <ModalWithForm
            isOpen={isOpen === "signup"}
            onClose={onClose}
            title="Sign Up"
            submitLabel="Sign Up"
            disabled
            footer={(
                <>
                    or{" "}
                    <span className="cursor-pointer text-[#2F71E5] hover:underline">Sign In</span>
                </>
            )}
            onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const username = e.target.username.value;

                console.log("Submit:", { email, password, username });
            }}
        >
            <div className="mb-7.5">
                <label htmlFor="email" className="font-inter text-xs font-normal text-[#2F71E5]">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter email"
                    className="w-full bg-transparent border-0 border-b border-black/20 px-0 py-2 font-inter text-sm outline-none focus:border-[#2F71E5]"
                    required
                />
            </div>

            <div className="mb-7.5">
                <label htmlFor="password" className="font-inter text-xs font-normal text-[#2F71E5]">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    className="w-full bg-transparent border-0 border-b border-black/20 px-0 py-2 font-inter text-sm outline-none focus:border-[#2F71E5]"
                    required
                />
            </div>

            <div className="mb-4.25">
                <label htmlFor="username" className="font-inter text-xs font-normal text-[#2F71E5]">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full bg-transparent border-0 border-b border-black/20 px-0 py-2 font-inter text-sm outline-none focus:border-[#2F71E5]"
                    required
                />

            </div>

            <p className="font-inter text-xs text-[red] text-center mb-2">Invalid email address</p>
        </ModalWithForm>
    );
}
