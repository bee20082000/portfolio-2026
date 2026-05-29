import { useEffect, useState, useRef } from "react";
import styles from './SpotifyTile.module.css';

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "span 3";
const TILE_HEIGHT = "span 2";
const TILE_BG_COLOR = "#36363621";
const TILE_TEXT_COLOR = "#ffffffff";
const TILE_RADIUS = "5px";

export default function SpotifyTile() {
  const audioUrl = "/asset/audio/highway_to_hell.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [showVolumeBar, setShowVolumeBar] = useState(false);

  // Lazy initialize the audio element to prevent memory leaks, especially in StrictMode
  const audioRef = useRef(null);
  const progressContainerRef = useRef(null);

  // Use a ref for dragging state to keep audio event listeners stable
  const isDraggingRef = useRef(false);

  // Handle core audio setup and stable subscription layout
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.loop = true;
    audio.volume = volume;

    const handleTimeUpdate = () => {
      if (!isDraggingRef.current) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleError = (err) => {
      console.error("Spotify Audio failed to load:", err);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);

    if (audio.duration) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audio.play().catch(err => {
        console.warn("Spotify playback blocked or failed:", err);
        setIsPlaying(false);
      });
    }
  };

  const handleStartDrag = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !duration) return;

    isDraggingRef.current = true;

    const updateProgress = (clientX) => {
      if (!progressContainerRef.current) return;
      const rect = progressContainerRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const width = rect.width;
      let percent = clickX / width;
      percent = Math.max(0, Math.min(1, percent));
      const newTime = percent * duration;

      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateProgress(clientX);

    const handleMouseMove = (moveEvent) => {
      const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      updateProgress(currentX);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
  };

  useEffect(() => {
    const handleCloseVolume = () => {
      setShowVolumeBar(false);
    };
    if (showVolumeBar) {
      window.addEventListener("click", handleCloseVolume);
    }
    return () => {
      window.removeEventListener("click", handleCloseVolume);
    };
  }, [showVolumeBar]);

  const toggleVolumeBar = (e) => {
    e.stopPropagation();
    setShowVolumeBar(!showVolumeBar);
  };

  const handleVolumeScrub = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const height = rect.height;
    let newVol = 1 - (clickY / height);
    newVol = Math.max(0, Math.min(1, newVol));

    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const isSpan2 = TILE_WIDTH === "span 2";
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`tile ${styles['tile-spotify']} c2 ${isPlaying ? "playing" : ""}`}
      data-i="14"
      style={{ cursor: "default", gridColumn: TILE_WIDTH, gridRow: TILE_HEIGHT, height: '100%', background: TILE_BG_COLOR, color: TILE_TEXT_COLOR, "--text": TILE_TEXT_COLOR, "--text2": TILE_TEXT_COLOR, "--text3": TILE_TEXT_COLOR, "--tile-bg-color": TILE_BG_COLOR }}
    >
      <div className="inner" style={{ padding: isSpan2 ? "10px" : "18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", height: "100%" }}>

        <div className={styles['spotify-widget']} style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "10px", marginTop: "0px", padding: isSpan2 ? "10px 12px" : "0 12px", position: "relative", width: "100%", boxSizing: "border-box", background: "transparent", border: "none", boxShadow: "none" }}>

          {/* Glass Container for Play Button & Song Info */}
          <div style={{
            display: "flex",
            flexDirection: isSpan2 ? "column" : "row",
            alignItems: isSpan2 ? "flex-start" : "center",
            gap: isSpan2 ? "14px" : "24px",
            alignSelf: "center",
            position: "relative",
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            borderRadius: TILE_RADIUS, // Pill shape
            padding: isSpan2 ? "12px 16px" : "8px 20px 8px 14px",
            width: "fit-content",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)"
          }}>
            {!isSpan2 && (
              <div className={styles['spotify-dare-tag-container']} style={{ position: "absolute", top: "-30px", left: "10px" }}>
                <svg className={styles['spotify-dare-arrow']} width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M30,8 Q20,10 10,26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M10,18 L10,26 L18,26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
                <span className={styles['spotify-dare-tag-text']}>
                  client feedback healing song :)
                </span>
              </div>
            )}

            <div
              className={styles['spotify-control-btn']}
              onClick={togglePlay}
              style={{
                alignSelf: isSpan2 ? "flex-end" : "auto",
                position: isSpan2 ? "absolute" : "relative",
                right: isSpan2 ? "0" : "auto",
                top: isSpan2 ? "0" : "auto"
              }}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 1h2v8H2zM6 1h2v8H6z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M8 5L2 9V1z" />
                </svg>
              )}
            </div>

            <div className={styles['spotify-info']} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", paddingRight: "8px" }}>
              <div className={styles['spotify-track-container']} style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                <span className={styles['spotify-track']} style={{ fontWeight: 700, fontSize: "15px", color: "inherit", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Highway to hell</span>
                <span className={styles['spotify-artist']} style={{ fontSize: "13px", opacity: 0.8, color: "inherit", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>AC/DC</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              ref={progressContainerRef}
              className={styles['spotify-progress-container']}
              onMouseDown={handleStartDrag}
              onTouchStart={handleStartDrag}
              style={{
                flexGrow: 1,
                marginTop: 0,
                padding: "6px 0",
                margin: "-6px 0",
                cursor: "pointer"
              }}
            >
              <div className={styles['spotify-time-display']} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", opacity: 0.7, marginBottom: "6px", userSelect: "none" }}>
                <span className={styles['time-current']}>{formatTime(currentTime)}</span>
                <span className={styles['time-duration']}>{formatTime(duration)}</span>
              </div>
              <div className={styles['spotify-progress-bar-bg']} style={{
                width: "100%",
                height: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: TILE_RADIUS,
                position: "relative"
              }}>
                <div
                  className={styles['spotify-progress-bar-fill']}
                  style={{
                    width: `${progressPercent}%`,
                    height: "100%",
                    backgroundColor: "currentColor",
                    borderRadius: TILE_RADIUS,
                    position: "relative",
                    transition: isDraggingRef.current ? "none" : "width 0.1s linear"
                  }}
                >
                  <div
                    className={styles['spotify-progress-dot']}
                    style={{
                      position: "absolute",
                      right: "-7px",
                      top: "50%",
                      transform: isDraggingRef.current ? "translateY(-50%) scale(1.3)" : "translateY(-50%)",
                      width: "14px",
                      height: "14px",
                      backgroundColor: "currentColor",
                      borderRadius: TILE_RADIUS,
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                      pointerEvents: "none"
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={styles['spotify-volume-wrapper']}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "8px"
              }}
            >
              <div
                className={styles['spotify-volume-slider-container']}
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "50%",
                  transform: showVolumeBar
                    ? "translateX(-50%) translateY(-6px)"
                    : "translateX(-50%) translateY(10px)",
                  width: "42px",
                  height: "108px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: TILE_RADIUS,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 0",
                  opacity: showVolumeBar ? 1 : 0,
                  pointerEvents: showVolumeBar ? "auto" : "none",
                  transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  zIndex: 1000,
                  color: "#000"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={styles['spotify-volume-track']}
                  onClick={handleVolumeScrub}
                  style={{
                    width: "8px",
                    height: "80px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: TILE_RADIUS,
                    position: "relative",
                    cursor: "pointer"
                  }}
                >
                  <div
                    className={styles['spotify-volume-fill']}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: `${isMuted ? 0 : volume * 100}%`,
                      backgroundColor: "currentColor",
                      borderRadius: TILE_RADIUS,
                      transition: "height 0.1s linear"
                    }}
                  />
                </div>
              </div>

              <button
                className={styles['spotify-volume-btn']}
                onClick={toggleVolumeBar}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.8,
                  transition: "opacity 0.2s ease, transform 0.2s ease, color 0.2s ease",
                  margin: 0
                }}
                title="Adjust Volume"
              >
                {isMuted || volume === 0 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
