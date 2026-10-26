"use client";

import { useSyncExternalStore } from "react";

export type DownloadOption = { platform: string; href: string; label: string };

function detectSystem() {
  const ua = navigator.userAgent;
  if (/Windows/.test(ua)) return /ARM64|aarch64/i.test(ua) ? "windows-arm" : "windows";
  if (/Macintosh|Mac OS X/.test(ua) && !/iPhone|iPad/.test(ua)) return "macos";
  if (/Linux/.test(ua) && !/Android/.test(ua)) return /aarch64|arm/i.test(ua) ? "linux-arm" : "linux";
  return "";
}

const preferences: Record<string, string[]> = {
  // Most Macs sold since 2020 are Apple Silicon, and browsers don't say which.
  macos: ["macos-arm64", "macos-x64"],
  windows: ["windows-x64", "windows-arm64"],
  "windows-arm": ["windows-arm64", "windows-x64"],
  linux: ["linux-x64", "linux-arm64"],
  "linux-arm": ["linux-arm64", "linux-x64"],
};

const subscribe = () => () => {};

// Server-renders the default target, then points the button at the file for
// the visitor's system once the page is running in a browser.
export function DownloadButton({
  href,
  label,
  options,
  unavailable,
}: {
  href: string;
  label: string;
  options: DownloadOption[];
  unavailable: string;
}) {
  const system = useSyncExternalStore(subscribe, detectSystem, () => "");
  const wanted = preferences[system] ?? [];
  const match = wanted.map((platform) => options.find((option) => option.platform === platform)).find(Boolean);
  const missing = Boolean(system) && !match && !options.some((option) => option.platform === "any");

  return (
    <>
      <a className="button" href={match?.href ?? href}>
        {match?.label ?? label}
      </a>
      {missing ? <p className="download-box__note">{unavailable}</p> : null}
    </>
  );
}
