"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
const links = [["Programme", "/#programme"], ["Formateur", "/#formateur"], ["Parcours", "/#parcours"], ["Bientôt", "/#bientot"]];
export default function Header() {
  const [open, setOpen] = useState(false), [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 8); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return (<>
    <div className="topbar"><span className="dot" />Inscriptions ouvertes : Mini MBA, places limitées <a href="/apply">Candidater →</a></div>
    <header className={"hd" + (sc ? " sc" : "")}><div className="wrap hdin">
      <Logo />
      <nav className="links">{links.map(([t, h]) => <a key={t} href={h}>{t}</a>)}</nav>
      <div className="hdcta"><a className="btn sm ghost2" href="/acces">Espace élève</a><a className="btn sm" href="/apply">Candidater</a></div>
      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /><i /></button>
    </div>
    {open && <div className="mnav">{links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}<a href="/acces">Espace élève</a></div>}
    </header></>);
}
