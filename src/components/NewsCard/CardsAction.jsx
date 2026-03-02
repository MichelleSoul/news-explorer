import { cn } from "@/lib/cn";

import { useState } from "react";
import TrashIcon from "../Icon/TrashIcon";
import BookmarkIcon from "../Icon/BookmarkIcon";

export default function CardsAction({
    variant,        // "search" | "saved"
    bookmarked,     // boolean
    onToggle,       // function to call on click
    isLoggedIn,     // boolean
}) {
    const [hovered, setHovered] = useState(false);

    const bookmarkVariant = bookmarked
        ? hovered
            ? "bookmarked-hover"
            : "bookmarked"
        : hovered
            ? "hover"
            : "default";

    const handleClick = () => {
        if (variant === "search") {
            if (isLoggedIn) {
                onToggle();
            }
            // If not logged in, the tooltip will show instead
        } else if (variant === "saved") {
            onToggle();
        }
    };

    return (
        <>
            {/* Desktop only tooltip */}
            <div className={cn(
                `
                    hidden xl:flex
                    rounded-xl
                    items-center justify-center
                    w-fit h-10 px-6.5
                    bg-white
                    font-roboto font-medium text-xs
                    transition-opacity duration-300
                    opacity-0
                `,
                // show search variant tooltip only when logged out
                variant === "search" && !isLoggedIn && hovered && "opacity-100",

                // show saved variant (user is logged in)
                variant === "saved" && hovered && "opacity-100"
            )}>
                {variant === "search" ? "Sign in to save articles" : "Remove from saved"}
            </div>
            <button
                onClick={handleClick}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white transition-colors duration-300"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-pressed={bookmarked}
            >
                {variant === "search" ? (
                    <BookmarkIcon variant={bookmarkVariant} />
                ) : (
                    <TrashIcon variant={hovered ? "hover" : "default"} />
                )}
            </button>
        </>
    );
}
