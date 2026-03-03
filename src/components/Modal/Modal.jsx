import { useEffect } from "react";
import CloseIcon from "@/assets/icons/close.svg";
import { cn } from "@/lib/cn";

export default function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex md:items-center md:justify-center",
                isOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
        >
            {/* Overlay */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            {/* Modal wrapper */}
            <div
                className={cn(
                    "absolute top-14 bottom-0 left-0 right-0 md:relative md:w-107.5",
                    "transition-all duration-300 ease-out",
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-6"
                )}
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
        </div>
    );
}
