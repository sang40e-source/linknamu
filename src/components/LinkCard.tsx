"use client";

type Props = {
  id: string;
  title: string;
  url: string;
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

export default function LinkCard({ id, title, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(id)}
      className="block w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md active:translate-y-0"
    >
      {title}
    </a>
  );
}
