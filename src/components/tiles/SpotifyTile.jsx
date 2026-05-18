import { useEffect, useState, useRef } from "react";

export default function SpotifyTile({ onSelect }) {
  const audioUrl = "/asset/audio/the_promise_of_the_world.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Aggressive Auto-Play Attempt
    const attemptAutoplay = async () => {
      try {
        // Try instant zero-interaction play first
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Browser blocked instant autoplay. Waiting for mouse movement...");

        // The "Bypass" Function
        const playOnFirstInteraction = async () => {
          if (audioRef.current) {
            try {
              await audioRef.current.play();
              setIsPlaying(true);

              // Success! Now aggressively remove all listeners so it doesn't fire constantly
              window.removeEventListener("mousemove", playOnFirstInteraction);
              window.removeEventListener("click", playOnFirstInteraction);
              window.removeEventListener("touchstart", playOnFirstInteraction);
              window.removeEventListener("keydown", playOnFirstInteraction);
            } catch (err) {
              // Note: Safari is incredibly strict and might still require a hard click, 
              // but Chrome/Edge will usually accept mousemove.
            }
          }
        };

        // Attach to mouse movement for that "instant" feel
        window.addEventListener("mousemove", playOnFirstInteraction);
        // Fallbacks for mobile and keyboard users
        window.addEventListener("touchstart", playOnFirstInteraction);
        window.addEventListener("keydown", playOnFirstInteraction);
        window.addEventListener("click", playOnFirstInteraction);
      }
    };

    attemptAutoplay();

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleScrub = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`tile tile-spotify c2 ${isPlaying ? "playing" : ""}`}
      data-i="14"
      onClick={() => onSelect && onSelect('spotify')}
      style={{ cursor: "pointer" }}
    >
      <div className="inner">
        <div className="lbl">{isPlaying ? "now playing" : "paused"}</div>

        <div className="spotify-widget" style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>

          <div
            className="spotify-control-btn"
            onClick={togglePlay}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              flexShrink: 0,
              transition: "transform 0.2s ease, background-color 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 10 10" fill="currentColor">
                <path d="M2 1h2v8H2zM6 1h2v8H6z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 10 10" fill="currentColor" style={{ marginLeft: "2px" }}>
                <path d="M8 5L2 9V1z" />
              </svg>
            )}
          </div>

          <div className="spotify-info">
            <div className="spotify-track-container" style={{ display: "flex", flexDirection: "column" }}>
              <span className="spotify-track" style={{ fontWeight: 600, fontSize: "14px" }}>The Promise of the World</span>
              <span className="spotify-artist" style={{ fontSize: "12px", opacity: 0.7 }}>Chieko Baisho — Howl's Moving Castle</span>
            </div>
          </div>
        </div>

        <div className="spotify-progress-container" onClick={handleScrub} style={{ marginTop: "20px" }}>
          <div className="spotify-time-display" style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", opacity: 0.7, marginBottom: "6px" }}>
            <span className="time-current">{formatTime(currentTime)}</span>
            <span className="time-duration">{formatTime(duration)}</span>
          </div>
          <div className="spotify-progress-bar-bg" style={{
            width: "100%",
            height: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "2px",
            overflow: "hidden"
          }}>
            <div
              className="spotify-progress-bar-fill"
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "#FFFFFF",
                transition: "width 0.1s linear"
              }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}