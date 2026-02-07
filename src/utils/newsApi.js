const isProd = import.meta.env.VITE_APP_ENV === "production";

const newsApiBaseUrl =
  isProd
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything"

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

function getDates() {
  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 7)

  return {
    from: sevenDaysAgo.toISOString().split("T")[0],
    to: today.toISOString().split("T")[0],
  }
}

export function searchNews(keyword) {
  const { from, to } = getDates()

  const url = new URL(newsApiBaseUrl)
  url.searchParams.set("q", keyword)
  url.searchParams.set("from", from)
  url.searchParams.set("to", to)
  url.searchParams.set("pageSize", 100)
  url.searchParams.set("apiKey", API_KEY)

  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`)
    }
    return res.json()
  })
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
