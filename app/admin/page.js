import { db, isAdmin } from "../../lib/admin";
import { login, logout, approve, revoke, addLesson, delLesson } from "./actions";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
export const dynamic = "force-dynamic";
const wa = (a, code) => {
  let p = (a.phone || "").replace(/\D/g, ""); if (p.startsWith("0")) p = "213" + p.slice(1);
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const m = `Bonjour ${a.full_name}, votre inscription au Mini MBA est confirmée. Votre code d'accès : ${code}. Rendez-vous sur ${site}/acces avec votre email (${a.email}) et ce code.`;
  return `https://wa.me/${p}?text=${encodeURIComponent(m)}`;
};
const ini = (n) => (n || "?").split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();
export default async function Admin() {
  if (!isAdmin()) return (<main className="wrap" style={{ padding: "48px 20px 80px" }}>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}><Logo /></div>
    <form className="formbox" action={login}><h2 style={{ fontSize: "1.6rem" }}>Espace administrateur</h2>
      <p className="lead" style={{ fontSize: ".9rem" }}>Entrez le mot de passe pour gérer les candidatures et les leçons.</p>
      <label>Mot de passe</label><input name="pw" type="password" required />
      <button className="btn" style={{ width: "100%", marginTop: 20 }}>Se connecter</button></form></main>);
  const s = db();
  const [{ data: apps }, { data: codes }, { data: lessons }] = await Promise.all([
    s.from("applications").select("*").order("created_at", { ascending: false }),
    s.from("access_codes").select("code,application_id,revoked,redeemed_at"),
    s.from("lessons").select("*").order("created_at")]);
  const byApp = Object.fromEntries((codes || []).map((c) => [c.application_id, c]));
  const pending = (apps || []).filter((a) => !byApp[a.id]).length, active = (codes || []).filter((c) => !c.revoked).length;
  return (<div className="app">
    <aside className="side"><Logo />
      <nav><a href="#candidatures" className="on"><Icon n="user" s={18} />Candidatures</a><a href="#lecons"><Icon n="book" s={18} />Leçons</a></nav>
      <a href="/" className="back">← Voir le site</a></aside>
    <main className="main">
      <div className="mtop"><div><h1>Administration</h1><p>Gérez les candidatures, les accès et les leçons.</p></div>
        <form action={logout}><button className="btn sm ghost2">Déconnexion</button></form></div>
      <div className="stats s4"><div><small>Candidatures</small><b>{apps?.length || 0}</b></div><div><small>En attente de paiement</small><b>{pending}</b></div>
        <div><small>Accès actifs</small><b>{active}</b></div><div><small>Leçons publiées</small><b>{lessons?.length || 0}</b></div></div>
      <h2 id="candidatures" style={{ fontSize: "1.5rem", marginTop: 36 }}>Candidatures</h2>
      {!apps?.length && <div className="card" style={{ marginTop: 12 }}><p>Aucune candidature pour le moment.</p></div>}
      {(apps || []).map((a) => { const c = byApp[a.id]; return (
        <div className="arow" key={a.id}>
          <div className="ainfo"><div className="avt">{ini(a.full_name)}</div><div>
            <b>{a.full_name}
              {!c && <em className="bd w">En attente</em>}{c && !c.revoked && <em className="bd g">{c.redeemed_at ? "Accès utilisé" : "Code envoyé"}</em>}{c?.revoked && <em className="bd r">Accès retiré</em>}</b>
            <span>{a.email} · {a.phone}{a.profession ? " · " + a.profession : ""}</span>
            <span>{new Date(a.created_at).toLocaleDateString("fr-FR")}</span>
            {a.motivation && <p className="mot">« {a.motivation} »</p>}</div></div>
          <div className="acts">
            {!c && <form action={approve}><input type="hidden" name="id" value={a.id} /><button className="btn sm">Paiement reçu : générer le code</button></form>}
            {c && <><span className="code">{c.code}</span>
              {!c.revoked && <a className="btn sm wa" href={wa(a, c.code)} target="_blank">Envoyer par WhatsApp</a>}
              {!c.revoked && <form action={revoke}><input type="hidden" name="code" value={c.code} /><button className="btn sm red">Retirer l'accès</button></form>}</>}
          </div></div>); })}
      <h2 id="lecons" style={{ fontSize: "1.5rem", marginTop: 44 }}>Leçons du cours</h2>
      <p className="lead" style={{ fontSize: ".9rem" }}>Collez le lien d'intégration de la vidéo (YouTube non répertoriée, Vimeo, Bunny...).</p>
      {(lessons || []).map((l, i) => (<div className="arow" key={l.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <div className="ainfo" style={{ alignItems: "center" }}><div className="avt">{i + 1}</div><b>{l.title}</b></div>
        <form action={delLesson}><input type="hidden" name="id" value={l.id} /><button className="btn sm red">Supprimer</button></form></div>))}
      <form className="formbox" action={addLesson} style={{ marginTop: 18, maxWidth: "none" }}>
        <h3 style={{ fontSize: "1.1rem" }}>Ajouter une leçon</h3>
        <label>Titre de la leçon</label><input name="title" required />
        <label>Lien vidéo (embed)</label><input name="url" required placeholder="https://www.youtube.com/embed/..." />
        <button className="btn" style={{ marginTop: 18 }}>Ajouter la leçon</button></form>
    </main></div>);
}
