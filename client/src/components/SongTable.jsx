import React, { useState } from "react";
import { playPreview, stopPreview } from "../utils/audioGenerator";

export default function SongTable({ songs, page, setPage }) {
  const [expandedId, setExpandedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  return (
    <>
      <table
        border="1"
        style={{
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Likes</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song) => (
            <React.Fragment key={song.id}>
              <tr
                onClick={() =>
                  setExpandedId(expandedId === song.id ? null : song.id)
                }
                style={{
                  cursor: "pointer",
                }}
              >
                <td>{song.index}</td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>{song.likes}</td>
              </tr>

              {expandedId === song.id && (
                <tr>
                  <td colSpan="6">
                    <div
                      style={{
                        padding: "20px",
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "24px",
                          alignItems: "flex-start",
                        }}
                      >
                        <img
                          src={song.cover}
                          alt={song.title}
                          width="180"
                          height="180"
                          style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        />

                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          <h3
                            style={{
                              marginTop: 0,
                            }}
                          >
                            {song.title}
                          </h3>

                          <p>
                            <strong>Artist:</strong> {song.artist}
                          </p>

                          <p>
                            <strong>Album:</strong> {song.album}
                          </p>

                          <p>
                            <strong>Genre:</strong> {song.genre}
                          </p>

                          <h4>Review</h4>

                          <p>{song.review}</p>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              if (playingId === song.id) {
                                stopPreview();
                                setPlayingId(null);
                                return;
                              }

                              stopPreview();

                              playPreview(
                                `${song.id}-${song.title}-${song.artist}`,
                              );

                              setPlayingId(song.id);
                            }}
                            style={{
                              marginTop: "10px",
                              padding: "10px 18px",
                              border: "none",
                              borderRadius: "8px",
                              background:
                                playingId === song.id ? "#dc2626" : "#2563eb",
                              color: "white",
                              cursor: "pointer",
                              fontWeight: "600",
                              minWidth: "150px",
                            }}
                          >
                            {playingId === song.id
                              ? "⏸ Pause"
                              : "🎵 Play Preview"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: page === 1 ? "#cbd5e1" : "#2563eb",
            color: "white",
            cursor: page === 1 ? "not-allowed" : "pointer",
            fontWeight: "600",
          }}
        >
          ← Previous
        </button>

        <div
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            fontWeight: "600",
            minWidth: "100px",
            textAlign: "center",
          }}
        >
          Page {page}
        </div>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Next →
        </button>
      </div>
    </>
  );
}
