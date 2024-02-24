import React from "react";
import { Button, Link, Typography, Card, CardContent } from "@mui/material"; // Import Material-UI components

function FavoritePostsList({ favorites, posts, toggleFavorite }) {
  // Filter posts to only contain favorite posts
  const favoritePosts = posts.filter((post) => favorites.includes(post.id));

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
