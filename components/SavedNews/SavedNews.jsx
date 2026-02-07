import { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { articlesApi } from "@/utils/api";

export default function SavedNews({ setHeader, setRoute, username }) {
    setHeader("white");
    setRoute("saved");
    
    const [newsArticles, setNewsArticles] = useState([]);
    const [_isLoading, setIsLoading] = useState(true);
    const [_error, setError] = useState(null);
    
    useEffect(() => {
        const fetchSavedNews = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem("token");
                
                const response = await fetch("http://localhost:3001/saved-news", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch saved news: ${response.status}`);
                }
                
                const data = await response.json();
                setNewsArticles(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching saved news:", err);
                setError(err.message);
                setNewsArticles([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchSavedNews();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const onDelete = async (article) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            // Optimistically update UI
            setNewsArticles(newsArticles.filter(a => a._id !== article._id));

            // Call backend API to delete article
            await articlesApi.deleteArticle(token, article._id);
        } catch (err) {
            console.error("Error deleting article:", err);
            // Revert on error
            setNewsArticles(prev => [...prev, article]);
        }
    };

    return (
        <>
            {/* md:pt-26 lg:pt-40 */}
            <div className="pt-16 pb-8 px-4 md:pt-22.5 md:px-10 lg:pt-30 lg:px-26 lg:pb-14">
                <nav className="font-roboto text-xs leading-6 text-[#1A1B22] mb-4">Saved articles</nav>
                <h1 className="font-slab text-3xl leading-8.5 text-[#1A1B22] mb-12.5 md:mb-4">
                    {username}, you have {newsArticles.length} saved<br /> 
                    {newsArticles.length === 1 ? "article" : "articles"}
                </h1>
                {newsArticles.length > 0 && (
                    <>
                        {(() => {
                            const uniqueTags = [...new Set(newsArticles.map(article => article.tag))];
                            const firstTwoTags = uniqueTags.slice(0, 2);
                            const remainingCount = Math.max(0, uniqueTags.length - 2);
                            
                            return (
                                <p className="font-roboto text-lg leading-6 text-[#1A1B22]">
                                    By keywords: <b>{firstTwoTags.join(", ")}{remainingCount > 0 ? `, and ${remainingCount} other` : ""}</b>
                                </p>
                            );
                        })()}
                    </>
                )}
            </div>
            
            {newsArticles.length > 0 && (
                <div className="bg-[#F5F6F7] pt-8 pb-6 px-4 md:p-10 lg:px-26 py-20">
                    <div className="
                        flex flex-col gap-4
                        md:grid md:grid-cols-3 md:gap-2
                        md:w-fit md:mx-auto
                        lg:gap-4
                    ">
                        {newsArticles.map((article) => (
                            <NewsCard
                                key={article._id}
                                article={article}
                                tag={article.tag}
                                date={formatDate(article.date)}
                                title={article.title}
                                description={article.description}
                                image={article.image}
                                source={article.source}
                                variant="saved"
                                isLoggedIn
                                isSaved={true}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}