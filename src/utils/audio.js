// Web Audio API Low-Latency Manager
class AudioManager {
  constructor() {
    this.ctx = null;
    this.buffers = {};
    this.loading = {};
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();
    } catch (e) {
      console.warn("Web Audio API not supported or blocked in this browser:", e);
    }
  }

  async preload(url) {
    this.init();
    if (!this.ctx) return null;
    if (this.buffers[url]) return this.buffers[url];
    if (this.loading[url]) return this.loading[url];

    this.loading[url] = (async () => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await new Promise((resolve, reject) => {
          this.ctx.decodeAudioData(arrayBuffer, resolve, reject);
        });
        this.buffers[url] = audioBuffer;
        return audioBuffer;
      } catch (err) {
        console.error("Failed to load/decode audio:", url, err);
        return null;
      } finally {
        delete this.loading[url];
      }
    })();

    return this.loading[url];
  }

  async play(url, volume = 0.4) {
    this.init();
    if (!this.ctx) return;

    // Wake context up immediately if it has been suspended
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn("Failed to resume audio context:", err);
      }
    }

    let buffer = this.buffers[url];
    if (!buffer) {
      buffer = await this.preload(url);
    }
    if (!buffer) return;

    try {
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      source.start(0);
    } catch (e) {
      console.warn("Playback failed:", e);
    }
  }
}

export const audioManager = new AudioManager();

// Defer AudioContext creation and preloading until the user first interacts with the page.
if (typeof window !== 'undefined') {
  const triggerPreloadOnInteraction = () => {
    // Preload standard interaction audio files
    audioManager.preload('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3');
    audioManager.preload('/asset/audio/oxidvideos-taking-playing-card-522520.mp3');

    // Clean up event listeners immediately
    window.removeEventListener('click', triggerPreloadOnInteraction);
    window.removeEventListener('touchstart', triggerPreloadOnInteraction);
    window.removeEventListener('mousemove', triggerPreloadOnInteraction);
  };

  // Listen for the first user interaction event
  window.addEventListener('click', triggerPreloadOnInteraction, { once: true, passive: true });
  window.addEventListener('touchstart', triggerPreloadOnInteraction, { once: true, passive: true });
  window.addEventListener('mousemove', triggerPreloadOnInteraction, { once: true, passive: true });
}
