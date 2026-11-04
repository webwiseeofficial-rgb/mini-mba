import Header from "../components/Header";
import Logo from "../components/Logo";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
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
const feats = [["user", "Formateur expert", "Slimane Khermous"], ["clock", "À votre rythme", "Étudiez où vous voulez"], ["award", "Certificat", "À la fin du programme"], ["key", "Accès 12 mois", "Avec votre code personnel"]];
export default function Home() {
  return (<>
    <Header />
    <section className="hero" style={{ padding: 0 }}><span className="orb o1" /><span className="orb o2" />
      <div className="wrap hgrid" style={{ padding: "56px 20px 90px" }}>
        <div><span className="pill"><b>Nouveau</b>Inscriptions ouvertes au Mini MBA</span>
          <h1>Apprenez. Progressez. <em>Dirigez.</em></h1>
          <p className="sub">Un parcours en ligne en stratégie, finance, marketing et management, animé par Slimane Khermous. Étudiez à votre rythme, avec un accès personnel.</p>
          <div className="cta"><a className="btn" href="/apply">Candidater maintenant</a><a className="btn ghost" href="#programme">Voir le programme</a></div></div>
        <div className="pwrap"><img src="/slimane.jpg" alt="Slimane Khermous, formateur" />
          <div className="fl f1"><b>Slimane Khermous</b><span>Formateur</span></div>
          <div className="fl f2"><b>Mini MBA</b><span>6 modules · 100 % en ligne</span></div></div>
      </div></section>
    <div className="wrap"><Reveal><div className="feats">{feats.map(([i, t, d]) => <div className="ft" key={t}><i><Icon n={i} /></i><div><b>{t}</b><span>{d}</span></div></div>)}</div></Reveal></div>
    <section id="programme"><div className="wrap">
      <Reveal><p className="eyebrow">Nos formations</p><h2>Programme à la une</h2><p className="lead">Notre première formation est ouverte. D'autres arrivent bientôt.</p></Reveal>
      <div className="cgrid">
        <Reveal><a href="/apply" className="cc" style={{ display: "block" }}><div className="thumb"><span className="badge">Inscriptions ouvertes</span><h4>Mini MBA</h4></div>
          <div className="cb"><h3>Mini MBA : management et stratégie</h3><p>Les compétences clés pour diriger une activité.</p><div className="cm"><span>6 modules</span><span>En ligne</span><span>Certificat</span></div></div></a></Reveal>
        {soon.map(([t, d], i) => (<Reveal key={t} delay={(i + 1) * 80}><div className="cc"><div className={"thumb t" + (i + 2)}><span className="badge g">Bientôt</span><h4>{t}</h4></div>
          <div className="cb"><h3>{t}</h3><p>{d}</p></div></div></Reveal>))}
      </div></div></section>
    <section className="alt"><div className="wrap"><Reveal><p className="eyebrow">Au programme</p><h2>Six modules pour piloter une organisation</h2></Reveal>
      <div className="mods">{modules.map(([t, d], i) => (<Reveal key={t} delay={i * 70}><div className="mod"><div className="n">0{i + 1}</div><h3>{t}</h3><p>{d}</p></div></Reveal>))}</div></div></section>
    <section id="formateur"><div className="wrap about">
      <Reveal><div className="pwrap"><img src="/slimane.jpg" alt="Slimane Khermous" /></div></Reveal>
      <Reveal delay={120}><p className="eyebrow">Votre formateur</p><h2>Slimane Khermous</h2>
        <p className="lead">Ajoutez ici sa biographie : parcours, expérience professionnelle et ce qu'il apporte aux participants.</p></Reveal></div></section>
    <section id="parcours" className="alt"><div className="wrap"><Reveal><p className="eyebrow">Comment ça marche</p><h2>De la candidature à l'accès</h2></Reveal>
      <div className="steps">{steps.map(([t, d], i) => (<Reveal key={t} delay={i * 80}><div className="step"><i>{i + 1}</i><h3>{t}</h3><p>{d}</p></div></Reveal>))}</div></div></section>
    <section id="bientot" style={{ paddingBottom: 0 }}><Reveal><div className="band"><span className="orb o1" style={{ width: 240, height: 240 }} />
      <div style={{ position: "relative", textAlign: "center" }}><h2>Prêt à passer au niveau supérieur ?</h2>
        <div className="bst"><div><b>6</b><span>Modules</span></div><div><b>100 %</b><span>En ligne</span></div><div><b>12 mois</b><span>D'accès</span></div><div><b>1</b><span>Certificat</span></div></div>
        <a className="btn" href="/apply">Candidater</a></div></div></Reveal></section>
    <footer><div className="wrap"><div className="fg">
      <div><Logo light /><p style={{ marginTop: 14, maxWidth: 320 }}>Des formations professionnelles en ligne, animées par des experts.</p></div>
      <div><h4>Plateforme</h4><a href="/#programme">Programme</a><a href="/apply">Candidater</a><a href="/acces">Espace élève</a></div>
      <div><h4>Contact</h4><a href="#">Email : à renseigner</a><a href="#">WhatsApp : à renseigner</a></div></div>
      <div className="copy">© 2026 Académie. Tous droits réservés.</div></div></footer>
    <div className="sticky"><a className="btn" href="/apply">Candidater</a></div>
  </>);
}
