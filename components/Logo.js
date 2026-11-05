export default function Logo({ light = false }) {
  return (<a href="/" className="brand" aria-label="Académie">
    <svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6aa5ff" /><stop offset="1" stopColor="#1d4ed8" /></linearGradient></defs>
      <rect width="40" height="40" rx="10" fill="url(#lg)" />
      <path d="M11.5 29 20 11l8.5 18" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.2 23.5h9.6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <span className="bt" style={light ? { color: "#fff" } : null}><b>Académie</b><small>Formations professionnelles</small></span>
  </a>);
}
