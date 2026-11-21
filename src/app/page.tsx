import type { CSSProperties } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile, links } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// 방문할 때마다 최신 클릭 수를 보여 주도록 매번 새로 그림
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[26rem] flex-col px-6 pt-16 pb-10 sm:pt-24">
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <ul className="mt-10 flex flex-col gap-2.5">
        {links.map((link, i) => (
          <li key={link.id} className="rise" style={{ "--i": i + 3 } as CSSProperties}>
            <LinkCard
              id={link.id}
              title={link.title}
              url={link.url}
              initialClicks={counts ? (counts[link.id] ?? 0) : null}
            />
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-16 text-center text-xs tracking-tight text-mute/70">링크나무</footer>
    </main>
  );
}
