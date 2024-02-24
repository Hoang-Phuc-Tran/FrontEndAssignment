import React from "react";
import { Card, CardContent, Typography, Button, Link } from "@mui/material";

function PostsList({ posts, toggleFavorite, favorites }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography color="textSecondary">Score: {post.score}</Typography>
            <Link
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comments
            </Link>
            <Button
              variant="contained"
              color={favorites.includes(post.id) ? "secondary" : "primary"}
              onClick={() => toggleFavorite(post.id)}
              style={{ marginTop: "10px" }}
            >
              {favorites.includes(post.id) ? "Unfavorite" : "Favorite"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PostsList;
