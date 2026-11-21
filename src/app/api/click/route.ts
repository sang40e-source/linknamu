import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { links } from "@/data/profile";
import { CLICKS_COLLECTION as COLLECTION, getClickCounts } from "@/lib/clicks";

const validIds = new Set(links.map((l) => l.id));

const noUri = () =>
  NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });

const dbError = (err: unknown) => {
  console.error("[api/click] MongoDB 오류:", err);
  return NextResponse.json(
    { error: "데이터베이스에 연결하지 못했습니다. 연결 문자열과 Atlas 접속 허용 IP를 확인하세요." },
    { status: 500 },
  );
};

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

  try {
    const db = await getDb();
    if (!db) return noUri();

    await db.collection(COLLECTION).updateOne(
      { linkId: id },
      { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true },
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return dbError(err);
  }
}

// 링크별 클릭 수 조회
export async function GET() {
  if (!process.env.MONGODB_URI) return noUri();
  const counts = await getClickCounts();
  if (!counts) return dbError("getClickCounts 실패");
  return NextResponse.json(
    links.map((l) => ({ id: l.id, title: l.title, clicks: counts[l.id] ?? 0 })),
    { headers: { "Cache-Control": "no-store" } },
  );
}
