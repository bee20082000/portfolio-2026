import { useEffect, useState, useRef } from "react";

export default function SpotifyTile({ onSelect }) {
  const audioUrl = "/asset/audio/highway_to_hell.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

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
      // Force visual state to active immediately, then trigger play silently!
      setIsPlaying(true);
      audioRef.current.play().catch(err => {
        console.warn("Silent audio play caught/handled cleanly:", err);
      });
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

  const [showVolumeBar, setShowVolumeBar] = useState(false);

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

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`tile tile-spotify c2 ${isPlaying ? "playing" : ""}`}
      data-i="14"
      style={{ cursor: "default" }}
    >
      <div className="inner">

        <div className="spotify-widget" style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
          <div className="spotify-dare-tag-container">
            <svg className="spotify-dare-arrow" width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M30,8 Q20,10 10,26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none" />
              <path d="M10,18 L10,26 L18,26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none" />
            </svg>
            <span className="spotify-dare-tag-text">
              {isPlaying ? "wow!! awesome" : "Dare you press play!!"}
            </span>
          </div>

          <div
            className="spotify-control-btn"
            onClick={togglePlay}
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
              <span className="spotify-track" style={{ fontWeight: 600, fontSize: "14px" }}>Highway to Hell</span>
              <span className="spotify-artist" style={{ fontSize: "12px", opacity: 0.7 }}>AC/DC — Live At River Plate, 2009</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "10px" }}>
          <div className="spotify-progress-container" onClick={handleScrub} style={{ flexGrow: 1, marginTop: 0 }}>
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

          <div
            className="spotify-volume-wrapper"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "16px"
            }}
          >
            <div
              className="spotify-volume-slider-container"
              style={{
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: showVolumeBar
                  ? "translateX(-50%) translateY(-6px)"
                  : "translateX(-50%) translateY(10px)",
                width: "42px",
                height: "108px",
                backgroundColor: "rgba(30, 31, 36, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 0",
                opacity: showVolumeBar ? 1 : 0,
                pointerEvents: showVolumeBar ? "auto" : "none",
                transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                zIndex: 1000
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="spotify-volume-track"
                onClick={handleVolumeScrub}
                style={{
                  width: "8px",
                  height: "80px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "4px",
                  position: "relative",
                  cursor: "pointer"
                }}
              >
                <div
                  className="spotify-volume-fill"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: `${isMuted ? 0 : volume * 100}%`,
                    backgroundColor: "#FFFFFF",
                    borderRadius: "4px",
                    transition: "height 0.1s linear"
                  }}
                />
              </div>
            </div>

            <button
              className="spotify-volume-btn"
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
  );
}