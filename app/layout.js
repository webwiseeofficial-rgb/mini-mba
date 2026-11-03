import "./globals.css";
export const metadata = { title: "Académie — Mini MBA", description: "Mini MBA en ligne animé par Slimane Khermous. Candidatez et accédez à la formation avec votre code personnel." };
export default function RootLayout({ children }) {
  return (<html lang="fr"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>);
}
