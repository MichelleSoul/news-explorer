import Hero from '../components/Hero/Hero';
import Author from '../components/Author/Author';
import SearchResults from '../components/SearchResults/SearchResults';
import SearchLoad from '../components/SearchLoad/SearchLoad';
import SearchFail from '../components/SearchFail/SearchFail';
import { useEffect, useRef } from 'react'

export default function Home({ setHeader, setRoute }) {
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
            <Hero ref={heroRef} />
            <SearchLoad />
            <SearchFail />
            <SearchResults />
            <Author />
        </>
    )
}

