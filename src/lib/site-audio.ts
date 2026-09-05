export const SITE_AUDIO_SRC = "/paradise-city.mp3";

export type SiteAudioSnapshot = {
  ready: boolean;
  muted: boolean;
  started: boolean;
  finished: boolean;
};

const idle: SiteAudioSnapshot = { ready: false, muted: false, started: false, finished: false };
let snapshot: SiteAudioSnapshot = idle;

type SiteAudio = SiteAudioSnapshot & {
  element: HTMLAudioElement;
};

declare global {
  interface Window {
    __pcSiteAudio?: SiteAudio;
  }
}

let audio: SiteAudio | null = null;
const listeners = new Set<() => void>();
let gestureBound = false;

function writeSnapshot() {
  if (!audio) {
    snapshot = idle;
    return;
  }
  snapshot = {
    ready: audio.ready,
    muted: audio.muted,
    started: audio.started,
    finished: audio.finished,
  };
}

function notify() {
  writeSnapshot();
  listeners.forEach((listener) => listener());
}

function isHomePath() {
  return typeof window !== "undefined" && window.location.pathname === "/";
}

function bindElement(current: SiteAudio) {
  const { element } = current;

  element.addEventListener("canplay", () => {
    if (!audio) {
      return;
    }
    if (!audio.ready) {
      audio.ready = true;
      notify();
    }
    startSiteAudio();
  });

  element.addEventListener("error", () => {
    if (!audio) {
      return;
    }
    audio.ready = false;
    notify();
  });

  element.addEventListener("ended", () => {
    if (!audio) {
      return;
    }
    audio.finished = true;
    notify();
  });
}

function getAudio(): SiteAudio {
  if (audio) {
    return audio;
  }

  if (typeof window !== "undefined" && window.__pcSiteAudio) {
    audio = window.__pcSiteAudio;
    return audio;
  }

  const element = new Audio(SITE_AUDIO_SRC);
  element.preload = "auto";
  element.loop = false;

  audio = { element, ready: false, muted: false, started: false, finished: false };
  if (typeof window !== "undefined") {
    window.__pcSiteAudio = audio;
  }
  bindElement(audio);
  bindGestureStart();
  startSiteAudio();
  return audio;
}

export function subscribeSiteAudio(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

export function getSiteAudioSnapshot(): SiteAudioSnapshot {
  return snapshot;
}

export function stopSiteAudio() {
  if (!audio) {
    return;
  }
  audio.element.pause();
  notify();
}

export function startSiteAudio() {
  if (typeof window === "undefined" || !isHomePath()) {
    return;
  }

  const current = getAudio();
  if (current.finished) {
    return;
  }
  if (!current.element.paused) {
    current.started = true;
    current.ready = true;
    notify();
    return;
  }

  current.element.muted = current.muted;
  current.element.volume = 1;
  void current.element.play().then(
    () => {
      current.started = true;
      current.ready = true;
      notify();
    },
    () => {
      bindGestureStart();
    },
  );
}

export function setSiteAudioMuted(muted: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  const current = getAudio();
  current.muted = muted;
  current.element.muted = muted;
  if (!muted) {
    startSiteAudio();
  }
  notify();
}

function isMuteControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-site-audio-mute]"));
}

function bindGestureStart() {
  if (gestureBound || typeof window === "undefined") {
    return;
  }
  gestureBound = true;

  const onGesture = (event: Event) => {
    if (isMuteControl(event.target)) {
      return;
    }
    startSiteAudio();
  };

  window.addEventListener("pointerdown", onGesture, true);
  window.addEventListener("keydown", onGesture, true);
}
