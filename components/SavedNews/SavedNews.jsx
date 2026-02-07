import NewsCard from "../NewsCard/NewsCard";
import Image1 from "@/assets/images/news/image_08.png";
import Image2 from "@/assets/images/news/image_06.png";
import Image3 from "@/assets/images/news/image_05.png";
import Image4 from "@/assets/images/news/image_07.png";
import Image5 from "@/assets/images/news/image_01.png";

export default function SavedNews({ setHeader, setRoute }) {
    setHeader("white");
    setRoute("saved");
    
    const newsArticles = [
        {
            id: 1,
            image: Image1,
            tag: "Nature",
            date: "November 4, 2020",
            headlines: "Everyone Needs a Special 'Sit Spot' in Nature",
            description:
                "Ever since I read Richard Louv's influential book, \"Last Child in the Woods,\" the idea of having a special \"sit spot\" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...",
            source: "Treehugger",
        },
        {
            id: 2,
            image: Image2,
            tag: "Nature",
            date: "February 19, 2019",
            headlines: "Nature makes you better",
            description:
                "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
            source: "National Geographic",
        },
        {
            id: 3,
            image: Image3,
            tag: "Yellowstone",
            date: "November 4, 2020",
            headlines: "Nostalgic Photos of Tourists in U.S. National Parks",
            description:
                "Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...",
            source: "National Geographic",
        },
        {
            id: 4,
            image: Image4,
            tag: "Parks",
            date: "November 4, 2020",
            headlines: "Grand Teton Renews Historic Crest Trail",
            description:
                "\"The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...",
            source: "National Parks Traveler",
        },
        {
            id: 5,
            image: Image5,
            tag: "Photography",
            date: "November 4, 2020",
            headlines: "Scientists Don't Know Why Polaris Is So Weird ",
            description:
                "Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.",
            source: "Treehugger",
        },
    ];

    return (
        <>
            {/* md:pt-26 lg:pt-40 */}
            <div className="pt-16 pb-8 px-4 md:pt-22.5 md:px-10 lg:pt-30 lg:px-26 lg:pb-14">
                <nav className="font-roboto text-xs leading-6 text-[#1A1B22] mb-4">Saved articles</nav>
                <h1 className="font-slab text-3xl leading-8.5 text-[#1A1B22] mb-12.5 md:mb-4">Elise, you have 5 saved<br /> articles</h1>
                <p className="font-roboto text-lg leading-6 text-[#1A1B22]">By keywords: <b>Nature, Yellowstone, and 2 other</b></p>
            </div>
            
            <div className="bg-[#F5F6F7] pt-8 pb-6 px-4 md:p-10 lg:px-26 py-20">
                <div className="
                    flex flex-col gap-4
                    md:grid md:grid-cols-3 md:gap-2
                    md:w-fit md:mx-auto
                    lg:gap-4
                ">
                    {newsArticles.map((article) => (
                        <NewsCard
                            key={article.id}
                            image={article.image}
                            tag={article.tag}
                            date={article.date}
                            headlines={article.headlines}
                            description={article.description}
                            source={article.source}
                            variant="saved"
                            isSignedIn
                        />
                    ))}
                </div>
            </div>
        </>
    )
}