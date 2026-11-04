import { db, isAdmin } from "../../lib/admin";
import { login, logout, approve, revoke, addLesson, delLesson } from "./actions";
export const dynamic = "force-dynamic";
const wa = (a, code) => {
  let p = (a.phone || "").replace(/\D/g, ""); if (p.startsWith("0")) p = "213" + p.slice(1);
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const m = `Bonjour ${a.full_name}, votre inscription au Mini MBA est confirmée. Votre code d'accès : ${code}. Rendez-vous sur ${site}/acces avec votre email (${a.email}) et ce code.`;
  return `https://wa.me/${p}?text=${encodeURIComponent(m)}`;
};
export default async function Admin() {
  if (!isAdmin()) return (<main className="wrap" style={{ padding: "80px 20px" }}>
    <form className="formbox" action={login}><h2>Espace administrateur</h2>
      <label>Mot de passe</label><input name="pw" type="password" required />
      <button className="btn" style={{ width: "100%", marginTop: 20 }}>Entrer</button></form></main>);
  const s = db();
  const [{ data: apps }, { data: codes }, { data: lessons }] = await Promise.all([
    s.from("applications").select("*").order("created_at", { ascending: false }),
    s.from("access_codes").select("code,application_id,revoked,redeemed_at"),
    s.from("lessons").select("*").order("created_at")]);
  const byApp = Object.fromEntries((codes || []).map((c) => [c.application_id, c]));
  return (<main className="wrap" style={{ padding: "32px 20px 80px" }}>
    <div className="nav"><span className="logo">Administration</span>
      <form action={logout}><button className="btn sm ghost" style={{ color: "#0e1a2b", borderColor: "#cfc7b4" }}>Déconnexion</button></form></div>
    <h2>Candidatures ({apps?.length || 0})</h2>
    {(apps || []).map((a) => { const c = byApp[a.id]; return (
      <div className="card" key={a.id} style={{ marginTop: 12, borderStyle: "solid" }}>
        <h3>{a.full_name}</h3>
        <p>{a.email} · {a.phone}{a.profession ? " · " + a.profession : ""}</p>
        <p style={{ fontSize: ".85rem" }}>{new Date(a.created_at).toLocaleDateString("fr-FR")}</p>
        {a.motivation && <p style={{ marginTop: 8 }}>« {a.motivation} »</p>}
        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {!c && <form action={approve}><input type="hidden" name="id" value={a.id} />
            <button className="btn sm">Paiement reçu : générer le code</button></form>}
          {c && <><b style={{ fontFamily: "monospace", fontSize: "1.05rem" }}>{c.code}</b>
            <a className="btn sm" href={wa(a, c.code)} target="_blank">Envoyer par WhatsApp</a>
            {c.revoked ? <em>Accès retiré</em> : <form action={revoke}><input type="hidden" name="code" value={c.code} />
              <button className="btn sm ghost" style={{ color: "#b3261e", borderColor: "#b3261e" }}>Retirer l'accès</button></form>}
            {c.redeemed_at && <em>Déjà utilisé</em>}</>}
        </div></div>); })}
    <h2 style={{ marginTop: 56 }}>Leçons du cours</h2>
    <p className="lead">Collez le lien d'intégration de la vidéo (YouTube non répertoriée, Vimeo, Bunny...).</p>
    {(lessons || []).map((l, i) => (<div className="card" key={l.id} style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
      <span>{i + 1}. {l.title}</span><form action={delLesson}><input type="hidden" name="id" value={l.id} />
        <button className="btn sm ghost" style={{ color: "#b3261e", borderColor: "#b3261e" }}>Supprimer</button></form></div>))}
    <form className="formbox" action={addLesson} style={{ marginTop: 20, maxWidth: "none" }}>
      <label>Titre de la leçon</label><input name="title" required />
      <label>Lien vidéo (embed)</label><input name="url" required placeholder="https://www.youtube.com/embed/..." />
      <button className="btn" style={{ marginTop: 18 }}>Ajouter la leçon</button></form>
  </main>);
}
