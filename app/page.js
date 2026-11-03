const modules = [
  ["Fondamentaux du management", "Rôle du manager, organisation, prise de décision et leadership."],
  ["Marketing et stratégie commerciale", "Positionnement, offre, canaux de vente et relation client."],
  ["Finance pour dirigeants", "Lire un bilan, maîtriser sa trésorerie, rentabilité et budget."],
  ["Stratégie d'entreprise", "Analyse de marché, avantage concurrentiel, plan de croissance."],
  ["Opérations et gestion de projet", "Processus, qualité, pilotage et amélioration continue."],
  ["Management des équipes", "Communication, motivation, délégation et performance."],
];
const steps = [
  ["Candidature", "Remplissez le formulaire en quelques minutes."],
  ["Échange", "Nous vous contactons pour valider votre profil."],
  ["Inscription", "Vous réglez les frais de formation."],
  ["Accès", "Vous recevez votre code personnel et débloquez le programme."],
];
const soon = [
  ["Marketing digital", "Stratégie, contenu et acquisition pour développer une activité."],
  ["Finance et comptabilité", "Les bases financières indispensables pour décider avec clarté."],
  ["Leadership", "Développer son influence et conduire une équipe avec confiance."],
];
export default function Home() {
  return (<>
    <header className="hero"><div className="wrap">
      <nav className="nav"><a className="logo" href="/">Académie</a>
        <a className="btn sm ghost" href="/apply">Candidater</a></nav>
      <div className="grid">
        <div>
          <p className="eyebrow">Programme en ligne</p>
          <h1>Mini MBA : les compétences de gestion, sans les années d'études.</h1>
          <p>Un parcours structuré pour comprendre la stratégie, la finance, le marketing et le management, animé par Slimane Khermous.</p>
          <div className="cta"><a className="btn" href="/apply">Candidater maintenant</a><a className="btn ghost" href="#programme">Voir le programme</a></div>
        </div>
        <div className="portrait"><img src="/slimane.jpg" alt="Slimane Khermous, formateur" />
          <div className="tag"><b>Slimane Khermous</b><span>Formateur</span></div></div>
      </div></div></header>
    <div className="wrap"><div className="facts">
      <div><small>Format</small><b>100 % en ligne</b></div><div><small>Langue</small><b>Français</b></div>
      <div><small>Accès</small><b>Code personnel</b></div><div><small>Validation</small><b>Certificat</b></div></div></div>
    <section id="programme"><div className="wrap">
      <p className="eyebrow">Programme</p><h2>Six modules pour piloter une organisation</h2>
      <p className="lead">Une progression claire, de la théorie aux cas pratiques.</p>
      {modules.map(([t, d], i) => (<details key={t}><summary>Module {i + 1} — {t}</summary><p>{d}</p></details>))}
    </div></section>
    <section style={{ background: "#fff" }}><div className="wrap about">
      <img src="/slimane.jpg" alt="Slimane Khermous" />
      <div><p className="eyebrow">Votre formateur</p><h2>Slimane Khermous</h2>
        <p className="lead">Ajoutez ici sa biographie : parcours, expérience professionnelle et ce qu'il apporte aux participants.</p></div>
    </div></section>
    <section><div className="wrap"><p className="eyebrow">Comment ça marche</p><h2>De la candidature à l'accès</h2>
      <div className="steps">{steps.map(([t, d]) => (<div className="step" key={t}><h3>{t}</h3><p>{d}</p></div>))}</div></div></section>
    <section style={{ background: "#fff" }}><div className="wrap"><p className="eyebrow">Prochainement</p><h2>D'autres programmes arrivent</h2>
      <p className="lead">Nous développons de nouvelles formations. Candidatez pour être informé de leur ouverture.</p>
      <div className="soon">{soon.map(([t, d]) => (<div className="card" key={t}><em>Bientôt</em><h3>{t}</h3><p>{d}</p></div>))}</div></div></section>
    <section className="dark"><div className="wrap"><h2>Prêt à commencer ?</h2><p>Les places sont attribuées après un échange avec notre équipe.</p><a className="btn" href="/apply">Candidater</a></div></section>
    <footer><div className="wrap"><span>© 2026 Académie</span><span>Contact : à renseigner</span></div></footer>
    <div className="sticky"><a className="btn" href="/apply">Candidater</a></div>
  </>);
}
