import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Link, Typography, Card, CardContent } from "@mui/material";

function FavoritePostsList({ favorites, toggleFavorite }) {
  const [favoritePosts, setFavoritePosts] = useState([]);
  console.log("Favorites:", favorites);
  useEffect(() => {
    const fetchFavoritePosts = async () => {
      const favoritePostsData = [];
      for (const postId of favorites) {
        try {
          const response = await axios.get(`https://www.reddit.com/api/info.json?id=t3_${postId}`);
          const postData = response.data.data.children[0].data;
          favoritePostsData.push(postData);
        } catch (error) {
          console.error("Error fetching favorite post:", error);
        }
      }
      setFavoritePosts(favoritePostsData);
    };

    fetchFavoritePosts();
  }, [favorites]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Favorite Posts
      </Typography>
      {favoritePosts.map((post) => (
        <Card key={post.id} variant="outlined" style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography color="textSecondary">Score: {post.score}</Typography>
            <Link
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button color="primary">Comments</Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => toggleFavorite(post.id)}
              style={{ marginTop: "10px" }}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default FavoritePostsList;
