import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function SubredditForm({ onSubredditChange, showFavorites, onToggleFavorites }) {
  const [subreddit, setSubreddit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubredditChange(subreddit); // Update the subreddit state
  };

  // Style object for hiding elements
  const hideStyle = {
    visibility: "hidden",
    // Use this instead if you don't want the button to take up space when hidden:
    // display: 'none',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
      <TextField
        label="Enter subreddit name"
        variant="outlined"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={!showFavorites ? {} : hideStyle}
      >
        Load Posts
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorites();
        }}
      >
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </Button>
    </form>
  );
}

export default SubredditForm;
