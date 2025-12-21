import { NextResponse, NextRequest } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import { assertAdminPassword } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password");
    assertAdminPassword(password);

    const db = getAdminDb();
    const snap = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(100)
      .get();

    const orders = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ ok: true, orders });
  } catch (e: any) {
    const status = e?.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { ok: false, message: e?.message || "Server error" },
      { status }
    );
  }
}
