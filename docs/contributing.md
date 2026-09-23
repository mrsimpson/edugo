# Beitragen zu edugo

edugo lebt von Beiträgen aus der Praxis. Wenn du ein Lernergebnis kennst, das noch nicht auf der Karte ist, oder ein Tool, das eine Lücke füllt — leg einfach los. Du brauchst kein vollständiges Dossier. Ein guter erster Beitrag reicht.

---

## Was du beitragen kannst

### Capability Node — ein Lernergebnis ergänzen

Ein Capability Node beschreibt, was Schülerinnen und Schüler *können* sollen — nicht, welche Tools dafür existieren. Beispiel: "Wahrscheinlichkeiten durch digitale Simulation erfahren."

**Wenn du ein Lernergebnis ergänzen möchtest, das noch fehlt oder schlecht abgedeckt ist:**

1. Erstelle eine neue Datei unter `data/capabilities/{dein-slug}.md`
2. Der Dateiname ist der `id`-Wert: Kleinbuchstaben, Bindestriche, kein Leerzeichen (`argumentieren-mit-daten`)
3. Füge den YAML-Frontmatter ein und schreibe einen Markdown-Body

**Minimales Beispiel:**

```markdown
---
id: argumentieren-mit-daten
title: "Mit Daten argumentieren und Visualisierungen kritisch lesen"
status: needed
kmk-domains:
  - analysieren-reflektieren
---

Schülerinnen und Schüler können Datenvisualisierungen lesen, hinterfragen
und eigene Argumente mit Daten untermauern.
```

**KMK-Domänen** — wähle mindestens eine:

| Slug | Vollständiger Titel |
|------|---------------------|
| `suchen-verarbeiten` | Suchen, Verarbeiten und Aufbewahren (KMK 1) |
| `kommunizieren-kooperieren` | Kommunizieren und Kooperieren (KMK 2) |
| `produzieren-praesentieren` | Produzieren und Präsentieren (KMK 3) |
| `schuetzen-agieren` | Schützen und sicher Agieren (KMK 4) |
| `problemloesen-handeln` | Problemlösen und Handeln (KMK 5) |
| `analysieren-reflektieren` | Analysieren und Reflektieren (KMK 6) |

**Coverstatus:**
- `needed` — kein gutes Tool existiert noch (häufigster Startwert)
- `partial` — es gibt Ansätze, aber keine vollständige Lösung
- `well-covered` — gute Tools existieren bereits

**Was in den Body gehört:**
- Was können Schüler nach dieser Fähigkeit konkret tun?
- Warum ist das wichtig (nicht nur für Schule, sondern für das Leben)?
- 1–2 realistische Unterrichtsszenarien
- Optional: ein "Litmus-Test" — welches Tool würde hier wirklich passen?

---

### Registry Entry — ein Tool oder Projekt eintragen

Ein Registry Entry beschreibt ein konkretes Tool, eine App oder ein Projekt, das eine oder mehrere Fähigkeiten aus der Capability Map adressiert.

**Wenn du ein Tool eintragen möchtest:**

1. Erstelle eine neue Datei unter `data/entries/{tool-slug}.md`
2. Verknüpfe es mit mindestens einem Capability Node aus `data/capabilities/`

**Minimales Beispiel:**

```markdown
---
id: mein-argumentations-tool
title: "ArgumentCheck"
capabilities:
  - argumente-bewerten
teaser: "Schüler analysieren Zeitungskommentare Schritt für Schritt auf Argumentationsstruktur."
dsgvo: frontend-only
source-url: https://github.com/beispiel/argumentcheck
---

Kurze Beschreibung und ein Klassenzimmer-Szenario.
```

**Das wichtigste optionale Feld: `teaser`**  
Ein Satz, der erklärt, was Schüler *tun* (nicht, was das Tool *ist*). Der Teaser erscheint auf der Karte — er ist der erste Eindruck. Investiere 2 Minuten hier.

**DSGVO-Status:**
- `frontend-only` — kein Backend, strukturell keine Datenweitergabe möglich
- `claimed-safe` — du hast geprüft und bist überzeugt, aber kein struktureller Nachweis
- `unknown` — noch nicht bewertet (Standard, wenn weggelassen)

**`x-` Felder** — hast du zusätzliche Infos, für die noch kein offizielles Feld existiert? Präfixiere sie mit `x-`:

```yaml
x-subjects:
  - mathematik
  - informatik
x-min-age: 12
```

Diese Felder werden von der Plattform ignoriert, aber nicht abgewiesen. Wenn viele Beiträge dasselbe `x-` Feld nutzen, wird es in einer späteren Version ein offizielles Feld.

---

## Wie du beiträgst

Du brauchst kein lokales Setup. Alles geht über GitHub:

1. Navigiere zu `data/capabilities/` oder `data/entries/`
2. Klicke auf **Add file → Create new file**
3. Gib Dateiname und Inhalt ein
4. Wähle **Create a new branch** und **Propose new file**
5. Der CI-Check validiert dein Frontmatter automatisch
6. Ein Maintainer reviewed den Inhalt

**Dein erster Beitrag muss nicht vollständig sein.** Ein guter `title`, ein `status` und ein Absatz im Body reichen. Wir helfen beim Rest.

---

## Lokale Entwicklung

```bash
git clone https://github.com/mrsimpson/edugo.git
cd edugo
npm install
npm run validate-data   # prüft alle data/ Dateien gegen die Schemas
npm run docs:dev        # startet VitePress lokal auf http://localhost:5173/edugo/
```

VS Code: Das Repo enthält eine `.vscode/settings.json`, die YAML-Frontmatter in `data/` Dateien automatisch gegen die Schemas validiert (wenn die [YAML Extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) installiert ist).
