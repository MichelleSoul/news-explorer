import Button from "../Button/Button";
import Modal from "./Modal";

export default function SignUpCompleteModal({ isOpen, onClose, onSignInClick = () => {} }) {
    const handleSignInClick = () => {
        onClose();
        onSignInClick();
    };

    return (
        <Modal isOpen={isOpen === "complete"} onClose={onClose}>
            <div>
                <h1 className="mb-4.5 font-roboto text-2xl font-black text-black">
                    Registration successfully completed!
                </h1>
            </div>
            <div 
                className="font-inter text-sm text-[#2F71E5] hover:underline cursor-pointer"
                onClick={handleSignInClick}
            >
                Sign In
            </div>
        </Modal>
    );
}
