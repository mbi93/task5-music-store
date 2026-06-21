import { useEffect, useState } from "react";
import { api } from "./services/api";

import SongTable from "./components/SongTable";
import SongGallery from "./components/SongGallery";

function App() {
  const [songs, setSongs] = useState([]);

  const [seed, setSeed] = useState(1);
  const [likes, setLikes] = useState(3.7);
  const [locale, setLocale] = useState("en-US");

  const [page, setPage] = useState(1);

  const [view, setView] = useState("table");

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setSongs([]);
    setPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [seed, likes, locale]);

  useEffect(() => {
    setSongs([]);
    setPage(1);
  }, [view]);

  useEffect(() => {
    loadSongs();
  }, [page, seed, likes, locale]);

  async function loadSongs() {
    try {
      const response = await api.get("/songs", {
        params: {
          page,
          seed,
          likes,
          locale,
        },
      });

      if (view === "gallery") {
        if (page === 1) {
          setSongs(response.data.items);
        } else {
          setSongs((prev) => [
            ...prev,
            ...response.data.items,
          ]);
        }
      } else {
        setSongs(response.data.items);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{
        padding: "20px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          color: "#1e293b",
          marginBottom: "24px",
        }}
      >
        🎵 Music Store Showcase
      </h1>

      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,

          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          alignItems: "center",
          flexWrap: "wrap",

          padding: "16px",

          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <select
          value={locale}
          onChange={(e) =>
            setLocale(e.target.value)
          }
          style={inputStyle}
        >
          <option value="en-US">
            English (US)
          </option>
          <option value="de-DE">
            German (DE)
          </option>
        </select>

        <input
          style={inputStyle}
          type="number"
          value={seed}
          onChange={(e) =>
            setSeed(e.target.value)
          }
          placeholder="Seed"
        />

        <input
          style={inputStyle}
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={likes}
          onChange={(e) =>
            setLikes(e.target.value)
          }
          placeholder="Likes"
        />

        <button
          style={{
            ...buttonStyle,
            background: "#2563eb",
          }}
          onClick={() =>
            setSeed(
              Math.floor(
                Math.random() * 1000000
              )
            )
          }
        >
          Random Seed
        </button>

        <button
          style={{
            ...buttonStyle,
            background:
              view === "table"
                ? "#2563eb"
                : "#94a3b8",
          }}
          onClick={() => {
            if (view === "table") return;
            setView("table");
          }}
        >
          Table View
        </button>

        <button
          style={{
            ...buttonStyle,
            background:
              view === "gallery"
                ? "#2563eb"
                : "#94a3b8",
          }}
          onClick={() => {
            if (view === "gallery") return;
            setView("gallery");
          }}
        >
          Gallery View
        </button>
      </div>

      {view === "table" ? (
        <SongTable
          songs={songs}
          page={page}
          setPage={setPage}
        />
      ) : (
        <SongGallery
          songs={songs}
          loadMore={loadMore}
        />
      )}
    </div>
  );
}

export default App;