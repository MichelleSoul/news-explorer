import Hero from '@/components/Hero/Hero';
import Author from '@/components/Author/Author';
import SearchResults from '@/components/SearchResults/SearchResults';
import { useEffect, useRef } from 'react'

export default function Home({ 
    setHeader, 
    setRoute, 
    onSearch,
    articles,
    isLoading,
    error,
    hasSearched,
    visibleCount,
    onShowMore,
    isLoggedIn,
    savedArticles,
    onSave,
    onDelete,
}) {
    const heroRef = useRef(null)

    useEffect(() => {
        setRoute("home")
    }, [setRoute])

    useEffect(() => {
        const heroEl = heroRef.current
        if (!heroEl) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeader('home')
                } else {
                    setHeader('white')
                }
            },
            { threshold: 0.6 }
        )

        observer.observe(heroEl)

        return () => {
            observer.unobserve(heroEl)
        }
    }, [setHeader])

    return (
        <>
            <Hero ref={heroRef} onSearch={onSearch} error={error} />
            <SearchResults 
                articles={articles}
                visibleCount={visibleCount}
                onShowMore={onShowMore}
                hasSearched={hasSearched}
                isLoading={isLoading}
                error={error}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSave={onSave}
                onDelete={onDelete}
            />
            <Author />
        </>
    )
}

