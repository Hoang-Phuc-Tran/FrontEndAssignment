import React, { useState, useEffect } from "react";
import axios from "axios";
import SubredditForm from "./components/SubredditForm";
import PostsList from "./components/PostsList";
import FavoritePostsList from "./components/FavoritePostsList";

function App() {
  const [subreddit, setSubreddit] = useState("reactjs");
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!showFavorites) {
      fetchPosts(); // Fetch posts only when showFavorites is false
    }
  }, [subreddit, showFavorites]); // Include subreddit and showFavorites in the dependencies

  const fetchPosts = async () => {
    setError(""); // Clear previous errors
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json`);
      const retrievedPosts = response.data.data.children.map((post) => post.data).slice(0, 10);
      if (retrievedPosts.length === 0) {
        setPosts([]); // Clear the posts as no posts were found
      } else {
        setPosts(retrievedPosts);
        setError(""); // Clear the error message if posts are successfully fetched
      }
    } catch (error) {
      setError("No posts found. Please try again.");
      setPosts([]); // Clear the posts as an error occurred
      setTimeout(() => {
        setError(""); // Clear the error message after 2 seconds
      }, 2000);
    }
  };

  const handleSubredditChange = (newSubreddit) => {
    setSubreddit(newSubreddit);
  };

  const toggleFavorite = (postId) => {
    const updatedFavorites = favorites.includes(postId)
      ? favorites.filter((id) => id !== postId)
      : [...favorites, postId];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div style={{ padding: "20px" }}>
      <SubredditForm
        onSubredditChange={handleSubredditChange}
        showFavorites={showFavorites}
        onToggleFavorites={handleToggleFavorites}
      />
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
      {showFavorites ? (
        <FavoritePostsList posts={posts} favorites={favorites} toggleFavorite={toggleFavorite} />
      ) : (
        posts.length > 0 && (
          <PostsList posts={posts} toggleFavorite={toggleFavorite} favorites={favorites} />
        )
      )}
    </div>
  );
}

export default App;
