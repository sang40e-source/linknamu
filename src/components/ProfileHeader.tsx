import type { CSSProperties } from "react";
import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="rise" style={step(0)}>
        {image ? (
          <Image
            src={image}
            alt={`${name} 프로필 사진`}
            width={72}
            height={72}
            priority
            className="h-[72px] w-[72px] rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-moss text-[1.75rem] font-semibold text-paper"
          >
            {name.slice(0, 1)}
          </div>
        )}
      </div>

      <h1
        className="rise mt-7 text-[2.75rem] leading-[1.05] font-extrabold tracking-[-0.045em]"
        style={step(1)}
      >
        {name}
      </h1>
      <p
        className="rise mt-3 max-w-[28ch] text-balance text-[0.95rem] leading-relaxed text-mute"
        style={step(2)}
      >
        {bio}
      </p>
    </section>
  );
}
