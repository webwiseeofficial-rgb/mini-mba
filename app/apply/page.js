"use client";
import Logo from "../../components/Logo";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Apply() {
  const [state, setState] = useState({ s: "idle", m: "" });
  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (f.website) return; // honeypot
    setState({ s: "load", m: "" });
    const { error } = await supabase.from("applications").insert({
      full_name: f.full_name, email: f.email, phone: f.phone, profession: f.profession, motivation: f.motivation });
    setState(error ? { s: "err", m: "Une erreur est survenue. Veuillez réessayer." }
      : { s: "ok", m: "Candidature envoyée. Nous vous contacterons très bientôt." });
    if (!error) e.target.reset();
  }
  return (<main className="wrap" style={{ padding: "32px 20px 80px" }}>
    <Logo />
    <h1 style={{ textAlign: "center", fontSize: "2.2rem", margin: "40px 0 8px" }}>Candidature — Mini MBA</h1>
    <p className="lead" style={{ textAlign: "center", margin: "0 auto 28px" }}>Remplissez ce formulaire, nous vous contacterons pour la suite.</p>
    <form className="formbox" onSubmit={submit}>
      <input className="hp" name="website" tabIndex="-1" autoComplete="off" />
      <label>Nom complet</label><input name="full_name" required />
      <label>Email</label><input name="email" type="email" required />
      <label>Téléphone / WhatsApp</label><input name="phone" required />
      <label>Profession</label><input name="profession" />
      <label>Pourquoi souhaitez-vous suivre ce programme ?</label><textarea name="motivation" rows="4" />
      <button className="btn" style={{ width: "100%", marginTop: 22 }} disabled={state.s === "load"}>
        {state.s === "load" ? "Envoi..." : "Envoyer ma candidature"}</button>
      {state.m && <p className={"msg " + (state.s === "ok" ? "ok" : "err")}>{state.m}</p>}
    </form></main>);
}
