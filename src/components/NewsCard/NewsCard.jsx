import { useState } from "react";
import CardsAction from "./CardsAction.jsx";

export default function NewsCard({
    article,
    image,
    date,
    title,
    description,
    source,
    variant,
    isLoggedIn,
    isSaved = false,
    onSave = () => {},
    onDelete = () => {},
}) {
    const [bookmarked, setBookmarked] = useState(isSaved);

    const handleToggle = () => {
        if (bookmarked) {
            onDelete(article);
            setBookmarked(false);
        } else {
            onSave(article);
            setBookmarked(true);
        }
    };

    return (
        <div className="
            relative w-72 mx-auto bg-white rounded-2xl overflow-hidden
            hover:shadow-lg transition-shadow duration-300
            md:w-56 lg:w-66 xl:w-fit 2xl:w-108
        ">
            {/* Feature Image */}
            <img
                src={image}
                alt={description}
                className="
                    w-full
                    h-49 md:h-37.5 xl:h-68
                    object-cover object-center
                "
            />
            {/* Action Button */}
            <div className="
                absolute top-4 right-4
                flex flex-row items-center gap-2
                rounded-xl

                md:top-2 md:right-2
                lg:top-4 lg:right-4
                xl:top-6 xl:right-6
            ">
                <CardsAction
                    variant={variant}
                    bookmarked={bookmarked}
                    onToggle={handleToggle}
                    isLoggedIn={isLoggedIn}
                />
            </div>
            {/* News */}
            <div className="h-61 p-4 flex flex-col md:h-67.5 xl:h-76 xl:p-6">
                <p className="font-sanspro text-lg text-[#B6BCBF] mb-2.5 md:pt-1 xl:pt-0" >{date}</p>
                <h2 className="font-slab text-[22px] text-[#1A1B22] leading-5.5 line-clamp-2 md:line-clamp-3 xl:leading-7.5 xl:line-clamp-2 2xl:text-[26px]" >{title}</h2>
                <p className="
                    absolute top-77 left-4 right-4
                    font-roboto text-base text-[#1A1B22]
                    leading-5.5 line-clamp-4
                    md:top-71
                    xl:top-102 xl:left-6 xl:right-6
                ">
                    {description}
                </p>
                <p className="mt-auto font-slab text-base text-[#B6BCBF] font-bold uppercase leading-5 tracking-[0.4px] md:line-clamp-1" >{source}</p>
            </div>
        </div>
    )
}