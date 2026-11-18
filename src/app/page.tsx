import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile, links } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-5 py-12 sm:py-16">
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <ul className="mt-8 flex w-full flex-col gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard id={link.id} title={link.title} url={link.url} />
          </li>
        ))}
      </ul>

      <footer className="mt-12 text-xs text-stone-400">링크나무</footer>
    </main>
  );
}
