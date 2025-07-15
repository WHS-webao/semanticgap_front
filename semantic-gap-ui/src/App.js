import React, { useEffect, useState } from "react";
import { fetchPages } from "./api";
import { buildTree } from "./utils/buildTree";
import CategoryGrid from "./components/CategoryGrid";
import "./App.css";
function App() {
  const [tree, setTree] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPages()
      .then(pages => setTree(buildTree(pages)))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="error">Error: {error}</div>;
  if (!tree) return <div className="loading">Loading…</div>;

  return (
    <div>
      <div className="App">
        <h1>Semantic Gap Categories</h1>
      </div>
      <CategoryGrid tree={tree} />
    </div>
  );
}

export default App;