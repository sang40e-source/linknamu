import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "linknamu";

// 개발 모드에서 핫 리로드 때마다 연결이 새로 생기지 않도록 전역에 보관
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, {
      // 연결이 안 될 때 오래 기다리지 않고 5초 안에 실패
      serverSelectionTimeoutMS: 5000,
      appName: "linknamu",
    });
    globalForMongo._mongoClientPromise = client.connect().catch((err) => {
      // 실패한 연결을 계속 붙잡고 있지 않도록 비워서 다음 요청 때 다시 시도
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db | null> {
  const client = getClient();
  if (!client) return null;
  return (await client).db(dbName);
}
