export default function BookmarkIcon({ variant = "default" }) {
    const isBookmarked =
        variant === "bookmarked" || variant === "bookmarked-hover";

    const bookmarkedFill =
        variant === "bookmarked-hover" ? "#1A1B22" : "#2F71E5";

    const outlineStroke =
        variant === "hover" ? "#1A1B22" : "#B6BCBF";

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            {isBookmarked ? (
                /* BOOKMARKED (FILLED) */
                <path
                    d="M5 4C5 3.44771 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V22L12 16.5L5 22V4Z"
                    className="transition-colors duration-300"
                    fill={bookmarkedFill}
                />
            ) : (
                /* DEFAULT / HOVER (OUTLINE) */
                <path
                    d="M18 4V19.9424L12.6182 15.7139L12 15.2285L11.3818 15.7139L6 19.9424V4H18Z"
                    strokeWidth="2"
                    className="fill-none transition-colors duration-300"
                    stroke={outlineStroke}
                />
            )}
        </svg>
    );
}
