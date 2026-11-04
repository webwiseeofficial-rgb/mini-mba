import Logo from "../../components/Logo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../../lib/admin";
export const dynamic = "force-dynamic";
async function enter(fd) {
  "use server";
  const code = String(fd.get("code")).trim().toUpperCase(), email = String(fd.get("email")).trim().toLowerCase();
  const { data } = await db().from("access_codes").select("code,revoked,expires_at,applications(email)").eq("code", code).maybeSingle();
  const ok = data && !data.revoked && new Date(data.expires_at) > new Date() && data.applications?.email?.toLowerCase() === email;
  if (!ok) redirect("/acces?e=1");
  await db().from("access_codes").update({ redeemed_at: new Date().toISOString() }).eq("code", code);
  cookies().set("sess", code, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 90 });
  redirect("/cours");
}
export default function Acces({ searchParams }) {
  return (<main className="wrap" style={{ padding: "32px 20px 80px" }}>
    <Logo />
    <h1 style={{ textAlign: "center", fontSize: "2.2rem", margin: "40px 0 8px" }}>Espace élève</h1>
    <p className="lead" style={{ textAlign: "center", margin: "0 auto 28px" }}>Entrez l'email de votre candidature et le code reçu.</p>
    <form className="formbox" action={enter}>
      <label>Email</label><input name="email" type="email" required />
      <label>Code d'accès</label><input name="code" required placeholder="MBA-XXXXXX-XXXXXX" />
      <button className="btn" style={{ width: "100%", marginTop: 22 }}>Accéder au cours</button>
      {searchParams?.e && <p className="msg err">Email ou code incorrect, ou accès expiré.</p>}
    </form></main>);
}
