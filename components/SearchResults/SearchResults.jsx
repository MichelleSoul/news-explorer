import Button from "../Button/Button";
import NewsCard from "../NewsCard/NewsCard";
import SearchLoad from "../SearchLoad/SearchLoad";
import SearchFail from "../SearchFail/SearchFail";
import { formatDate } from "@/utils/newsApi";

export default function SearchResults({
    articles = [],
    visibleCount = 3,
    onShowMore = () => {},
    hasSearched = false,
    isLoading = false,
    error = "",
    isLoggedIn = false,
    savedArticles = [],
    onSave = () => {},
    onDelete = () => {},
}) {
    // Don't render anything if user hasn't searched
    if (!hasSearched) {
        return null;
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="bg-[#F5F6F7] pt-8 pb-6 px-4 md:p-10 lg:px-26 py-20">
                <h1 className="font-slab text-3xl mb-4 w-72 md:mb-8 lg:mb-16">Search results</h1>
                <SearchLoad />
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="bg-[#F5F6F7] pt-8 pb-6 px-4 md:p-10 lg:px-26 py-20">
                <h1 className="font-slab text-3xl mb-4 w-72 md:mb-8 lg:mb-16">Search results</h1>
                <p className="font-roboto text-lg text-red-600">{error}</p>
            </div>
        );
    }

    // Show nothing found
    if (articles.length === 0) {
        return (
            <div className="bg-[#F5F6F7] pt-8 pb-6 px-4 md:p-10 lg:px-26 py-20">
                <h1 className="font-slab text-3xl mb-4 w-72 md:mb-8 lg:mb-16">Search results</h1>
                <SearchFail />
            </div>
        );
    }

    const visibleArticles = articles.slice(0, visibleCount);
    const showMoreVisible = visibleCount < articles.length;

    return (
        <div className="bg-[#F5F6F7] pt-8 pb-6 px-4 md:p-10 lg:px-26 py-20">
            <h1 className="font-slab text-3xl mb-4 w-72 md:mb-8 lg:mb-16">Search results</h1>

            <div className="
                flex flex-col gap-4
                md:grid md:grid-cols-3 md:gap-2
                md:w-fit md:mx-auto
                lg:gap-4
            ">
                {visibleArticles.map((article) => (
                    <NewsCard
                        key={article.url}
                        article={article}
                        date={formatDate(article.publishedAt)}
                        source={article.source.name}
                        title={article.title}
                        description={article.description}
                        image={article.urlToImage}
                        variant="search"
                        isLoggedIn={isLoggedIn}
                        isSaved={savedArticles.some(a => a.url === article.url)}
                        onSave={onSave}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {showMoreVisible && (
                <Button 
                    variant="white" 
                    className="mt-5 w-72 h-14 mx-auto md:w-60 md:mt-8"
                    onClick={onShowMore}
                >
                    Show more
                </Button>
            )}
        </div>
    )
}
