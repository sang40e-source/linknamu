import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { links } from "@/data/profile";

const COLLECTION = "clicks";
const validIds = new Set(links.map((l) => l.id));

// 링크 클릭 1회 기록
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  await db.collection(COLLECTION).updateOne(
    { linkId: id },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true },
  );

  return NextResponse.json({ ok: true });
}

// 링크별 클릭 수 조회
export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  const docs = await db
    .collection<{ linkId: string; count: number }>(COLLECTION)
    .find({}, { projection: { _id: 0, linkId: 1, count: 1 } })
    .toArray();

  const counts = Object.fromEntries(docs.map((d) => [d.linkId, d.count]));
  return NextResponse.json(
    links.map((l) => ({ id: l.id, title: l.title, clicks: counts[l.id] ?? 0 })),
  );
}
