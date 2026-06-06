# MCV Treuhand – Website

Statische Website für **MCV Treuhand** – dein strategischer, digitaler
Finanzpartner in Bern für Unternehmer, Bauunternehmen, Handwerksbetriebe und
Immobilieninvestoren. Modern, schlank und ohne Build-Schritt: reines HTML, CSS
und JavaScript.

## Struktur

```
.
├── index.html          # Startseite (Hero, Über uns, Probleme, Leistungen, Immobilien, Philosophie, Nutzen, Kontakt)
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

- **Farben:** Tiefes Slate-Navy `#1B2A38` (Vertrauen) + Sage-Grün `#5E9E7B`
  (das Signal), dazu sanftes Off-White `#F4F5F1`. Alle Farben sind als
  CSS-Variablen in `:root` (siehe `css/style.css`) definiert und an einer Stelle
  anpassbar.
- **Schriften:** *Space Grotesk* (Titel) + *Inter* (Text), via Google Fonts.
- Vollständig responsiv, mit Reduced-Motion-Unterstützung.

## Go-Live-Stand

- [x] Telefon: 031 561 91 13
- [x] Adresse: Worblentalstrasse 33, 3063 Ittigen
- [x] E-Mail: info@mcv-treuhand.ch
- [x] Google Calendar Buchungslink integriert
- [ ] Handelsregister-/MwSt.-Nummer im Impressum ergänzen
- [ ] Kontaktformular an Backend/Mailservice anbinden
