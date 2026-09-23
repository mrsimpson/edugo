---
id: yahtzee-wahrscheinlichkeit
title: "Besser Yahtzee spielen: Wahrscheinlichkeiten durch Würfelsimulation entdecken"
capabilities:
  - angewandte-mathematik
dsgvo: frontend-only
teaser: "Schüler entdecken, warum die 7 am häufigsten fällt — durch eigene Simulation, nicht durch Formel."
source-url: https://github.com/example/yahtzee-probability
---

## Was dieses Tool tut

Eine browserbasierte Würfelsimulation, die Schüler selbst konfigurieren können: Wie viele Würfel? Wie viele Würfe? Die Ergebnisse werden live als Histogramm visualisiert. Schüler können ihre Schätzung vor dem Lauf eingeben und sehen nach dem Lauf, wie weit sie daneben lagen.

Das Yahtzee-Kontext macht das Prinzip greifbar: "Warum ist die 7 beim Würfeln mit zwei Würfeln so viel häufiger als die 2 oder die 12?" Die Simulation zeigt es in Sekunden.

## Klassenzimmer-Szenario

**Fach**: Mathematik, Klasse 7–9  
**Phase**: Einstieg / Erarbeitung (ca. 20 Minuten)

1. Lehrkraft stellt die Frage: "Wenn ihr zwei Würfel werft — welche Summe erscheint am häufigsten?"
2. Schüler schätzen (Handzeichen oder kurze Notiz)
3. Einzeln oder in Paaren: Tool öffnen, 100 Würfe simulieren, Ergebnis notieren
4. 1000 Würfe: Was ändert sich? Wird das Bild stabiler?
5. Gemeinsame Auswertung: Warum sieht die Kurve so aus? (Kombinatorik)

## Warum diese Aufgabe aktivierend ist

Schüler erleben den Widerspruch zwischen Intuition ("alle Summen gleich wahrscheinlich") und Realität selbst — ohne dass die Lehrkraft es erklärt. Das erzeugt kognitive Dissonanz, die Neugier auslöst. Das Werkzeug ist das Experiment; die Erklärung kommt danach.

## Technische Details

Kein Backend. Alle Berechnungen im Browser (JavaScript Pseudo-Zufall). Funktioniert auf Tablets und Smartphones. Keine Anmeldung.
