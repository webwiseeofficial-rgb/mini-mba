"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";
import { db, isAdmin, adminToken } from "../../lib/admin";

export async function login(fd) {
  if (process.env.ADMIN_PASSWORD && fd.get("pw") === process.env.ADMIN_PASSWORD)
    cookies().set("adm", adminToken(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 604800 });
  redirect("/admin");
}
export async function logout() { cookies().delete("adm"); redirect("/admin"); }
export async function approve(fd) {
  if (!isAdmin()) return;
  const { data: c } = await db().from("courses").select("id").eq("slug", "mini-mba").single();
  const r = () => randomBytes(3).toString("hex").toUpperCase();
  await db().from("access_codes").insert({ code: `MBA-${r()}-${r()}`, course_id: c.id, application_id: fd.get("id"),
    expires_at: new Date(Date.now() + 365 * 864e5).toISOString() });
  await db().from("applications").update({ status: "paid" }).eq("id", fd.get("id"));
  revalidatePath("/admin");
}
export async function revoke(fd) {
  if (!isAdmin()) return;
  await db().from("access_codes").update({ revoked: true }).eq("code", fd.get("code"));
  revalidatePath("/admin");
}
export async function addLesson(fd) {
  if (!isAdmin()) return;
  const { data: c } = await db().from("courses").select("id").eq("slug", "mini-mba").single();
  await db().from("lessons").insert({ course_id: c.id, title: fd.get("title"), video_url: fd.get("url") });
  revalidatePath("/admin");
}
export async function delLesson(fd) {
  if (!isAdmin()) return;
  await db().from("lessons").delete().eq("id", fd.get("id"));
  revalidatePath("/admin");
}
