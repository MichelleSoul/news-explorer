import CloseIcon from "@/assets/icons/close.svg";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex md:items-center md:justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal container wrapper */}
            <div
                className="absolute top-14 bottom-0 left-0 right-0 md:relative md:w-107.5"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-4 z-10 md:-right-7.5 md:-top-7.5"
                    aria-label="Close modal"
                >
                    <img src={CloseIcon} alt="Close" className="h-6 w-6" />
                </button>

                {/* Modal container */}
                <div className="relative h-full rounded-t-2xl bg-white p-4 md:h-auto md:rounded-2xl md:p-8">
                    {children}
                </div>
            </div>
        </div >
    );
}
