import Header from "../components/Header";
import Logo from "../components/Logo";
import Reveal from "../components/Reveal";
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
const topics = ["Stratégie", "Finance", "Marketing", "Management", "Opérations", "Leadership"];
export default function Home() {
  return (<>
    <Header />
    <section className="hero">
      <span className="orb o1" /><span className="orb o2" />
      <div className="wrap grid">
        <div>
          <span className="pill">PROGRAMME EN LIGNE · PROMOTION OUVERTE</span>
          <h1>Le <em>Mini MBA</em> pour décider et diriger avec assurance.</h1>
          <p className="sub">Un parcours structuré en stratégie, finance, marketing et management, animé par Slimane Khermous. Accessible à distance, à votre rythme.</p>
          <div className="cta"><a className="btn" href="/apply">Candidater maintenant</a><a className="btn ghost" href="#programme">Découvrir le programme</a></div>
        </div>
        <div className="pwrap"><img src="/slimane.jpg" alt="Slimane Khermous, formateur" />
          <div className="fl f1"><b>Slimane Khermous</b><span>Formateur</span></div>
          <div className="fl f2"><b>100 % en ligne</b><span>Accès personnel</span></div></div>
      </div>
    </section>
    <div className="mq"><div>{[...topics, ...topics, ...topics, ...topics].map((t, i) => <span key={i}>{t}</span>)}</div></div>
    <div className="wrap"><Reveal><div className="facts">
      <div><small>Format</small><b>100 % en ligne</b></div><div><small>Langue</small><b>Français</b></div>
      <div><small>Accès</small><b>Code personnel</b></div><div><small>Validation</small><b>Certificat</b></div></div></Reveal></div>
    <section id="programme"><div className="wrap">
      <Reveal><p className="eyebrow">Programme</p><h2>Six modules pour piloter une organisation</h2>
        <p className="lead">Une progression claire, de la théorie aux cas pratiques.</p></Reveal>
      <div className="mods">{modules.map(([t, d], i) => (<Reveal key={t} delay={i * 70}><div className="mod"><div className="n">0{i + 1}</div><h3>{t}</h3><p>{d}</p></div></Reveal>))}</div>
    </div></section>
    <section id="formateur" className="alt"><div className="wrap about">
      <Reveal><div className="pwrap"><img src="/slimane.jpg" alt="Slimane Khermous" /></div></Reveal>
      <Reveal delay={120}><p className="eyebrow">Votre formateur</p><h2>Slimane Khermous</h2>
        <p className="lead">Ajoutez ici sa biographie : parcours, expérience professionnelle et ce qu'il apporte aux participants.</p></Reveal>
    </div></section>
    <section id="parcours"><div className="wrap"><Reveal><p className="eyebrow">Comment ça marche</p><h2>De la candidature à l'accès</h2></Reveal>
      <div className="steps">{steps.map(([t, d], i) => (<Reveal key={t} delay={i * 80}><div className="step"><i>{i + 1}</i><h3>{t}</h3><p>{d}</p></div></Reveal>))}</div></div></section>
    <section id="bientot" className="alt"><div className="wrap"><Reveal><p className="eyebrow">Prochainement</p><h2>D'autres programmes arrivent</h2>
      <p className="lead">Nous développons de nouvelles formations. Candidatez pour être informé de leur ouverture.</p></Reveal>
      <div className="soon">{soon.map(([t, d], i) => (<Reveal key={t} delay={i * 80}><div className="card"><em>Bientôt</em><h3>{t}</h3><p>{d}</p></div></Reveal>))}</div></div></section>
    <Reveal><div className="band"><span className="orb o1" style={{ width: 260, height: 260 }} />
      <div style={{ position: "relative" }}><h2>Prêt à passer au niveau supérieur ?</h2>
        <p>Les places sont attribuées après un échange avec notre équipe.</p><a className="btn" href="/apply">Candidater</a></div></div></Reveal>
    <footer><div className="wrap"><div className="fg">
      <div><Logo light /><p style={{ marginTop: 14, maxWidth: 320 }}>Des formations professionnelles en ligne, animées par des experts.</p></div>
      <div><h4>Plateforme</h4><a href="/#programme">Programme</a><a href="/apply">Candidater</a><a href="/acces">Espace élève</a></div>
      <div><h4>Contact</h4><a href="#">Email : à renseigner</a><a href="#">WhatsApp : à renseigner</a></div></div>
      <div className="copy">© 2026 Académie. Tous droits réservés.</div></div></footer>
    <div className="sticky"><a className="btn" href="/apply">Candidater</a></div>
  </>);
}
