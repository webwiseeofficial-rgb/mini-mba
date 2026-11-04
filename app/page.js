import Logo from "../../components/Logo";
import { redirect } from "next/navigation";
import { db, studentOk } from "../../lib/admin";
export const dynamic = "force-dynamic";
export default async function Cours() {
  if (!(await studentOk())) redirect("/acces");
  const { data: lessons } = await db().from("lessons").select("*").order("created_at");
  return (<main className="wrap" style={{ padding: "32px 20px 80px" }}>
    <Logo />
    <p className="eyebrow" style={{ marginTop: 40 }}>Votre formation</p><h1 style={{ marginBottom: 24 }}>Mini MBA</h1>
    {!lessons?.length && <p className="lead">Les leçons seront bientôt disponibles.</p>}
    {(lessons || []).map((l, i) => (<div key={l.id} style={{ marginBottom: 36 }}>
      <h3 style={{ marginBottom: 12 }}>{i + 1}. {l.title}</h3>
      <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden", background: "#000" }}>
        <iframe src={l.video_url} allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} /></div></div>))}
  </main>);
}
