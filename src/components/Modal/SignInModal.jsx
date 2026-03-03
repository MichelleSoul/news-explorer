import ModalWithForm from "./ModalWithForm";

export default function SignInModal({ isOpen, onClose }) {
    return (
        <ModalWithForm
            isOpen={isOpen === "signin"}
            onClose={onClose}
            title="Sign In"
            submitLabel="Sign In"
            disabled
            footer={(
                <>
                    or{" "}
                    <span className="cursor-pointer text-[#2F71E5] hover:underline">Sign Up</span>
                </>
            )}
            onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                console.log("Submit:", { email, password });
            }}
        >
            <div className="mb-3.25">
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
                <p className="font-inter text-xs text-[red] mt-1.5">Invalid email address</p>
            </div>

            <div className="mb-9.75">
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
        </ModalWithForm>
    );
}
