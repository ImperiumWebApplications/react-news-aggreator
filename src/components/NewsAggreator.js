import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

function NewsApp() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page}&apiKey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) =>
        setArticles((prevArticles) => [...prevArticles, ...data.articles])
      );
  }, [page]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div onScroll={handleScroll} style={{ height: "100vh", overflow: "auto" }}>
      {articles.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsApp;
