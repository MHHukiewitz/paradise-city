"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import {
  getSiteAudioSnapshot,
  setSiteAudioMuted,
  startSiteAudio,
  stopSiteAudio,
  subscribeSiteAudio,
} from "@/lib/site-audio";

export function SiteAudio() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      startSiteAudio();
      return;
    }
    stopSiteAudio();
  }, [pathname]);

  return null;
}

export function SiteAudioMute() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const snapshot = useSyncExternalStore(subscribeSiteAudio, getSiteAudioSnapshot, getSiteAudioSnapshot);
  const label = snapshot.muted ? t.nav.unmute : t.nav.mute;

  if (pathname !== "/" || !snapshot.ready) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      data-site-audio-mute
      aria-label={label}
      aria-pressed={snapshot.muted}
      onClick={() => setSiteAudioMuted(!snapshot.muted)}
    >
      {snapshot.muted ? <VolumeX /> : <Volume2 />}
    </Button>
  );
}
