import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { playPreview, stopPreview } from "../utils/audioGenerator";

export default function SongGallery({ songs, loadMore }) {
  const { ref, inView } = useInView();

  const firstRender = useRef(true);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {songs.map((song) => (
          <div
            key={song.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "0.2s",
            }}
          >
            <img
              src={song.cover}
              alt={song.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                height: "250px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "10px",
                }}
              >
                #{song.index}
              </h3>

              <p
                title={song.title}
                style={{
                  fontWeight: "600",
                  marginBottom: "8px",

                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {song.title}
              </p>

              <p
                title={song.artist}
                style={{
                  color: "#475569",
                  marginBottom: "12px",

                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {song.artist}
              </p>

              <p>
                <strong>Album:</strong> {song.album}
              </p>

              <p>
                <strong>Genre:</strong> {song.genre}
              </p>

              <p>
                <strong>❤️ Likes:</strong> {song.likes}
              </p>
              <button
                onClick={() => {
                  if (playingId === song.id) {
                    stopPreview();
                    setPlayingId(null);
                    return;
                  }

                  stopPreview();

                  playPreview(`${song.id}-${song.title}-${song.artist}`);

                  setPlayingId(song.id);
                }}
                style={{
                  width: "100%",
                  marginTop: "auto",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background: playingId === song.id ? "#dc2626" : "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {playingId === song.id ? "⏸ Pause" : "🎵 Preview"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={ref}
        style={{
          height: "50px",
          marginTop: "20px",
        }}
      />
    </>
  );
}
