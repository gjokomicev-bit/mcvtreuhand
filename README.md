# MCV Treuhand – Website

Statische Website für **MCV Treuhand** – Ihr digitaler Buchhalter für die Region
Bern und Zürich. Modern, schlank und ohne Build-Schritt: reines HTML, CSS und
JavaScript.

## Struktur

```
.
├── index.html          # Startseite (Hero, Leistungen, Über uns, Ablauf, Kontakt)
├── impressum.html      # Impressum
├── datenschutz.html    # Datenschutzerklärung (DSG)
├── css/
│   └── style.css       # gesamtes Styling (Design-Tokens als CSS-Variablen)
├── js/
│   └── main.js         # Navigation, Scroll-Animationen, Formular
└── assets/             # Platz für eigene Bilder / Logos
```

## Lokal ansehen

Einfach `index.html` im Browser öffnen. Für saubere relative Pfade empfiehlt sich
ein lokaler Server, z. B.:

```bash
python3 -m http.server 8000
# danach http://localhost:8000 öffnen
```

## Design

- **Farben:** Marineblau `#0F2A47` (Vertrauen) + gedämpftes Gold `#B0894F` (Premium),
  dazu warmes Off-White `#F6F4EF`. Alle Farben sind als CSS-Variablen in `:root`
  (siehe `css/style.css`) definiert und an einer Stelle anpassbar.
- **Schriften:** *Space Grotesk* (Titel) + *Inter* (Text), via Google Fonts.
- Vollständig responsiv, mit Reduced-Motion-Unterstützung.

## ✅ Vor dem Go-Live ausfüllen

Folgende Platzhalter sind noch durch echte Angaben zu ersetzen:

- [ ] **Telefonnummer** – in `index.html` (`tel:`-Links) und im `impressum.html`
- [ ] **Adresse** (Strasse, PLZ, Ort) – `impressum.html` und `datenschutz.html`
- [ ] **Rechtsform & Handelsregister-/MwSt.-Nummer** – `impressum.html`
- [ ] **E-Mail prüfen** – aktuell `info@mcvtreuhand.ch`
- [ ] **Kontaktformular anbinden** – aktuell reine Frontend-Demo
  (siehe Hinweis in `js/main.js`); an Mailservice/Backend anschliessen
- [ ] **Eigene Bilder/Team-Fotos** ergänzen (optional)

> Inhalte und Positionierung orientieren sich an der bestehenden Marke
> „MCV Treuhand – digitaler Buchhalter". Texte können jederzeit angepasst werden.
