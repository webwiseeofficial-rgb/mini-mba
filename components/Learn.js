"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
export default function Learn({ name, lessons }) {
  const [cur, setCur] = useState(0), [done, setDone] = useState([]);
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem("done") || "[]")); } catch {} }, []);
  const toggle = (id) => { const n = done.includes(id) ? done.filter((x) => x !== id) : [...done, id]; setDone(n); try { localStorage.setItem("done", JSON.stringify(n)); } catch {} };
  const nd = lessons.filter((l) => done.includes(l.id)).length, pct = lessons.length ? Math.round((nd / lessons.length) * 100) : 0;
  const l = lessons[cur], next = lessons.findIndex((x) => !done.includes(x.id));
  return (<div className="app">
    <aside className="side"><Logo />
      <nav><a className="on"><Icon n="grid" s={18} />Tableau de bord</a><a><Icon n="book" s={18} />Mes leçons</a><a className="dis"><Icon n="award" s={18} />Certificat <small>bientôt</small></a></nav>
      <a href="/" className="back">← Retour au site</a></aside>
    <main className="main">
      <div className="mtop"><div><h1>Bonjour{name ? ", " + name : ""}</h1><p>Continuez votre apprentissage là où vous vous êtes arrêté.</p></div><div className="mlogo"><Logo /></div></div>
      <div className="ban"><div><span>Mini MBA</span><h2>Poursuivez votre parcours avec Slimane Khermous</h2>
        <div className="bar"><i style={{ width: pct + "%" }} /></div><small>{pct} % terminé</small></div>
        {lessons.length > 0 && <button className="btn" onClick={() => { setCur(next < 0 ? 0 : next); window.scrollTo({ top: 360, behavior: "smooth" }); }}>{nd ? "Reprendre" : "Commencer"}</button>}</div>
      <div className="stats"><div><small>Leçons terminées</small><b>{nd} / {lessons.length}</b></div><div><small>Progression</small><b>{pct} %</b></div>
        <div><small>Prochaine leçon</small><b>{next >= 0 ? lessons[next].title : "Tout est terminé"}</b></div></div>
      {!lessons.length ? <div className="card" style={{ marginTop: 24 }}><h3>Les leçons arrivent bientôt</h3><p>Le contenu sera ajouté très prochainement.</p></div> :
      <div className="lg"><div>
        <div className="vid"><iframe key={l.id} src={l.video_url} allowFullScreen /></div>
        <div className="vmeta"><h3>{cur + 1}. {l.title}</h3><div>
          <button className={"btn sm" + (done.includes(l.id) ? " ok2" : "")} onClick={() => toggle(l.id)}>{done.includes(l.id) ? "Terminée" : "Marquer comme terminée"}</button>
          {cur < lessons.length - 1 && <button className="btn sm ghost2" onClick={() => setCur(cur + 1)}>Leçon suivante</button>}</div></div></div>
        <div className="list"><h3>Contenu du cours</h3>{lessons.map((x, i) => (<button key={x.id} className={i === cur ? "on" : ""} onClick={() => setCur(i)}>
          <span className={"ck" + (done.includes(x.id) ? " d" : "")}>{done.includes(x.id) ? <Icon n="check" s={14} /> : i + 1}</span><span>{x.title}</span></button>))}</div></div>}
    </main></div>);
}
