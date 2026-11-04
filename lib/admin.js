import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createHash } from "crypto";
export const db = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
export const adminToken = () => createHash("sha256").update("mba:" + (process.env.ADMIN_PASSWORD || "")).digest("hex");
export const isAdmin = () => !!process.env.ADMIN_PASSWORD && cookies().get("adm")?.value === adminToken();
// A student session is valid if the code in the cookie is still active
export async function studentOk() {
  const code = cookies().get("sess")?.value; if (!code) return false;
  const { data } = await db().from("access_codes").select("revoked,expires_at").eq("code", code).maybeSingle();
  return !!data && !data.revoked && new Date(data.expires_at) > new Date();
}
