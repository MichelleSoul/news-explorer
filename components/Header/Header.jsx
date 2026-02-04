import { cn } from "@/lib/cn";
import Button from "../Button/Button";
import MenuIcon from "../Icon/MenuIcon";
import LogoutIcon from "../Icon/LogoutIcon"
import { useState } from "react";

export default function Header({ variant }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSignedIn, _setIsSignedIn] = useState(false);
    const [route, _setRoute] = useState("home");

    const headerBgClass = cn(
        // mobile behavior
        menuOpen ? "bg-transparent" : variant === "white" ? "bg-white" : "bg-transparent",

        // md+ override (variant always wins)
        variant === "white" && "md:bg-white",
        variant === "dark" && "md:bg-transparent"
    );

    const mobileTextColor =
        menuOpen ? "text-white" : variant === "white" ? "text-black" : "text-white";

    const desktopTextColor =
        variant === "white" ? "md:text-black" : "md:text-white";


    const navItemBase = (variant) =>
        cn(
            "font-roboto font-medium text-lg h-full flex justify-center items-center w-fit transition-colors duration-300",
            variant === "white" ? "text-black" : "text-white"
        );

    const activeUnderline = (variant) =>
        cn(
            "pt-0.75 border-b-[3px]",
            variant === "white" ? "border-black" : "border-white"
        );

    const navButtonVariant = (variant) => {
        if (variant === "white") {
            return "outline-dark";
        }

        return "outline";
    };

    const navButtonIconVariant = (variant) => {
        if (variant === "white") {
            return "";
        }

        return "white";
    };


    const menuIconVariant = variant === "white" ? menuOpen ? "light" : "dark" : "light";

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-30 transition-opacity",
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                    "md:opacity-0 md:pointer-events-none"
                )}
                onClick={() => setMenuOpen(false)}
            />

            <div className="sticky top-0 z-50">
                {/* Topbar */}
                <header
                    className={cn(
                        `
                            relative z-50
                            flex items-center justify-between
                            h-14 px-4
                            border-b border-white/20
                            md:h-16.5 md:px-10
                            lg:h-20 lg:px-26
                            transition-colors duration-300
                        `,
                        variant === "white" ? "border-[#d1d2d6]" : "border-white/20",
                        headerBgClass
                    )}
                >
                    <span className={cn(
                        "font-slab text-base font-bold md:text-xl transition-colors duration-300",
                        mobileTextColor,
                        desktopTextColor
                    )}>
                        NewsExplorer
                    </span>
                    <button
                        className="flex items-center justify-center md:hidden"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <MenuIcon open={menuOpen} variant={menuIconVariant} />
                    </button>
                    <div className="hidden md:flex flex-row items-center gap-8 h-full">
                        {/* Home */}
                        <div className={cn(navItemBase(variant), "w-17", route === "home" && activeUnderline(variant))}>
                            Home
                        </div>
                        {/* Saved articles */}
                        {isSignedIn && (
                            <div className={cn(navItemBase(variant), "w-44.5", route === "saved" && activeUnderline(variant))}>
                                Saved articles
                            </div>
                        )}
                        <Button
                            variant={navButtonVariant(variant)}
                            className={cn(
                                "font-roboto h-10 lg:h-12 flex items-center justify-center",
                                isSignedIn ? "w-fit px-5 gap-3.75" : "w-44"
                            )}
                        >
                            {isSignedIn ? (
                                <>
                                    Elise
                                    <LogoutIcon variant={navButtonIconVariant(variant)} />
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>
                </header>
                <nav
                    className={cn(
                        "absolute bg-[#1a1b22] w-full top-0 pt-18 pb-6 px-4 z-40 space-y-5.5 rounded-b-4xl transition-transform duration-300",
                        menuOpen ? "translate-y-0" : "-translate-y-full",
                        "md:-translate-y-full"
                    )}
                >
                    <div className="font-roboto font-medium text-white h-14 flex items-center">Home</div>
                    <Button variant="outline" className="font-roboto flex items-center justify-center gap-3.75" >
                        {isSignedIn ? (
                            <>
                                Elise
                                <LogoutIcon variant="white" />
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </nav>
            </div>
        </>
    );
}
