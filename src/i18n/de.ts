/**
 * German copy for the landing page and shared UI elements.
 *
 * All user-visible text lives here — never hardcoded in templates.
 * To add a new locale, create src/i18n/en.ts with the same shape and
 * import the correct file via a locale composable.
 *
 * Design principle 1.5: every user-visible text is in German; every identifier is English.
 */

export const de = {
  nav: {
    catalog: 'Kompetenzkatalog',
    apps: 'Tool-Registry',
    github: 'GitHub',
  },

  landing: {
    // ── HERO ───────────────────────────────────────────────────────────────────
    hero: {
      headline: 'Deutschlands Schulen haben ein\nDigitalisierungsproblem.',
      subtitle: 'Und da geht es nicht um WLAN oder iPads, sondern um passende Lösungen.',
    },

    // ── SECTION 1: Problem cards (dark background, first-person pain) ──────────
    problems: {
      teacher: {
        role: 'Lehrkraft',
        icon: '📚',
        quote:
          'Ich suche seit einer Stunde nach einem Tool, mit dem meine Klasse gemeinsam Argumente strukturieren kann. Alles, was ich finde, läuft entweder über US-Server oder will eine Einwilligung der Eltern. Ich gebe auf. Wir machen es wieder auf Papier.',
      },
      navigator: {
        role: 'Schulleitung',
        icon: '🗺️',
        quote:
          'Wir haben jetzt 40 iPads im Haus. Jede Lehrkraft nutzt andere Apps. Ich weiß nicht, welche Kompetenzen wir damit eigentlich fördern — und welche komplett auf der Strecke bleiben. Im nächsten Schulentwicklungsgespräch soll ich das beantworten können.',
      },
      builder: {
        role: 'Elternteil',
        icon: '🔧',
        quote:
          'Ich habe an einem Wochenende eine kleine App gebaut, mit der Schüler Wahrscheinlichkeiten durch Simulationen entdecken können. Meine Tochter liebt sie. Aber wie bekomme ich das zu anderen Schulen? Ich habe keine Zeit für Marketing. Das Ding liegt auf GitHub und wird nicht gefunden.',
      },
    },

    // ── SECTION 2: Ecosystem problem reveal ────────────────────────────────────
    ecosystemProblem: {
      headline: 'Das ist kein Einzelproblem.\nDas ist ein Ökosystem-Problem.',
      body:
        'Engagierte Lehrkräfte und Entwickler bauen gute Dinge — aber isoliert, ohne Verbindung. Gute Tools sind unsichtbar, schwer einzuschätzen, nicht aufeinander aufgebaut. Gute Arbeit verschwindet, weil sie nirgends zusammenkommt.',
      bridge:
        'Wir können nicht alles auf einmal lösen. Aber wir können anfangen, diese drei Probleme zu verbinden.',
    },

    // ── SECTION 3: Solution cards (same three personas, now with promise) ──────
    solutions: {
      intro: 'Was edugo für dich tut',
      teacher: {
        role: 'Für Lehrkräfte',
        icon: '📚',
        headline: 'Finde Tools, denen du vertrauen kannst.',
        story:
          'edugo bietet dir einen einfach zu durchsuchenden Katalog mit Apps, die sicher nutzbar sind. Keine dubiosen Seiten — einfache, zielgerichtete Apps mit einem klaren Bildungsbezug.\n\nJedes Tool zeigt sofort seinen Datenschutzstatus. Kein Backend heißt: Schülerdaten können gar nicht erst abfließen.',
        cta: 'Tools entdecken',
        ctaHref: '/edugo/app.html#/apps',
      },
      navigator: {
        role: 'Für Schulen & Koordinatoren',
        icon: '🗺️',
        headline: 'Sieh, was abgedeckt ist — und was fehlt.',
        story:
          'Die Kompetenzkarte zeigt, welche Lernziele durch digitale Tools unterstützt werden — und wo die Lücken sind. Nicht als statisches Dokument, sondern als lebendige Karte, die wächst.\n\nDu bekommst eine ehrliche Antwort auf die Frage, die du im nächsten Schulentwicklungsgespräch beantworten musst.',
        cta: 'Kompetenzkarte ansehen',
        ctaHref: '/edugo/app.html#/catalog',
      },
      builder: {
        role: 'Für Digital Schaffende',
        icon: '🔧',
        headline: 'Bau in eine reale Lücke — und werde gefunden.',
        story:
          '„It\'s the age of personal software." Aber wäre es nicht cool, wenn noch mehr Menschen davon profitieren könnten?\n\nedugo zeigt dir, wo Bedarf ist: welche Lernziele keine passenden Tools haben. Du trägst dein Tool in wenigen Minuten ein — es landet auf der Karte, für alle Schulen findbar, ohne Marketing, ohne Vertrieb.',
        cta: 'Lücken ansehen',
        ctaHref: '/edugo/app.html#/catalog?gap=true',
      },
    },

    // ── SECTION 4: How it works ─────────────────────────────────────────────────
    howItWorks: {
      title: 'Wie es funktioniert',
      steps: [
        {
          number: '01',
          title: 'Kompetenzkarte',
          description:
            'Lernziele als lebendige Karte. Jeder Knoten zeigt, ob es gute Tools gibt — oder eine Lücke.',
        },
        {
          number: '02',
          title: 'Tool-Katalog',
          description:
            'Jedes Tool mit Datenschutzstatus, Teaser und Link. Gefiltert nach dem, was Schüler dabei tun.',
        },
        {
          number: '03',
          title: 'Beitragen per Pull Request',
          description:
            'Ein neues Tool eintragen dauert wenige Minuten. GitHub als Backend — auditierbar, forkbar, kein Login.',
        },
      ],
    },

    // ── SECTION 5: Final CTA ────────────────────────────────────────────────────
    cta: {
      title: 'Mit Machern mitmachen.',
      description:
        'Es hilft nichts, sich über schlechte Digitalisierung zu beschweren. Wenn zukünftige Generationen nicht das beherrschen, was die Welt von ihnen verlangt, haben wir alle ein Problem. Lasst es uns ändern.',
      primary: 'Tools entdecken',
      primaryHref: '/edugo/app.html#/apps',
      secondary: 'Auf GitHub ansehen',
      secondaryHref: 'https://github.com/mrsimpson/edugo',
    },

    footer: {
      tagline: 'edugo — die fehlende Infrastruktur für Bildungsinnovation.',
      links: [
        { label: 'Vision', href: '/edugo/docs/vision' },
        { label: 'Beitragen', href: '/edugo/docs/contributing' },
        { label: 'Architektur', href: '/edugo/architecture/' },
        { label: 'GitHub', href: 'https://github.com/mrsimpson/edugo' },
      ],
      dsgvo: 'Diese Seite setzt keine Cookies und sendet keine Daten an Dritte.',
    },
  },
} as const

export type LandingCopy = typeof de
