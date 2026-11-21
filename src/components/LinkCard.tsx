"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
  url: string;
  /** 처음 보여 줄 클릭 수. null이면 숫자를 숨김(DB 미연결) */
  initialClicks: number | null;
};

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 우선 사용
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export default function LinkCard({ id, title, url, initialClicks }: Props) {
  const [clicks, setClicks] = useState(initialClicks);

  function handleClick() {
    recordClick(id);
    // 서버 응답을 기다리지 않고 화면의 숫자를 바로 1 올림
    setClicks((c) => (c === null ? c : c + 1));
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative flex w-full items-center justify-center rounded-2xl border border-line bg-white px-5 py-[1.05rem] text-[0.975rem] font-semibold tracking-[-0.015em] transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss active:scale-[0.99]"
    >
      {clicks !== null && (
        <span
          className="absolute left-5 text-xs font-medium tabular-nums text-mute transition-colors duration-200 group-hover:text-paper/70"
        >
          {clicks.toLocaleString("ko-KR")}
          <span className="sr-only">회 클릭됨</span>
        </span>
      )}
      <span>{title}</span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-5 h-4 w-4 text-mute transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper"
      >
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
      <span className="sr-only">(새 탭에서 열림)</span>
    </a>
  );
}
