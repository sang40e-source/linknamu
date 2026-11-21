import { getDb } from "@/lib/mongodb";

export const CLICKS_COLLECTION = "clicks";

/** 링크 ID별 클릭 수. DB가 없거나 연결에 실패하면 null */
export async function getClickCounts(): Promise<Record<string, number> | null> {
  try {
    const db = await getDb();
    if (!db) return null;
    const docs = await db
      .collection<{ linkId: string; count: number }>(CLICKS_COLLECTION)
      .find({}, { projection: { _id: 0, linkId: 1, count: 1 } })
      .toArray();
    return Object.fromEntries(docs.map((d) => [d.linkId, d.count]));
  } catch (err) {
    console.error("[clicks] 클릭 수를 불러오지 못했습니다:", err);
    return null;
  }
}
