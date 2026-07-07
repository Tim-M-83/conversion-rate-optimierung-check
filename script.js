const STORAGE_KEY = "croCheckState.v1";
const CRO_URL = "https://mediencenteressen.com/conversion-rate-optimierung/";
const CRO_CONTACT_URL = "https://mediencenteressen.com/conversion-rate-optimierung/#kontakt";

const answerValues = {
  yes: 1,
  partial: 0.5,
  no: 0,
  na: null
};

const answerLabels = {
  yes: "Ja",
  partial: "Teilweise",
  no: "Nein",
  na: "Nicht relevant"
};

const modes = [
  {
    id: "website",
    icon: "W",
    title: "Website / Dienstleisterseite",
    description: "Für Firmenwebsites, lokale Dienstleister, B2B und WordPress-Seiten.",
    hint: "Fokus auf Positionierung, Kontaktanfragen, Vertrauen und Formular-UX.",
    image: "assets/conversion-rate-optimierung-dienstleister.png"
  },
  {
    id: "landingpage",
    icon: "L",
    title: "Landingpage",
    description: "Für Kampagnen, Leadgenerierung und einzelne Angebotsseiten.",
    hint: "Fokus auf Above-the-Fold-Bereich, Botschaft, CTA und Reibungsverluste.",
    image: "assets/conversion-rate-optimierung.png"
  },
  {
    id: "shop",
    icon: "S",
    title: "Onlineshop / WooCommerce",
    description: "Für Shops, Produktseiten, Warenkorb und Checkout-Optimierung.",
    hint: "Fokus auf Produktseiten, Versand, Zahlung, Warenkorb und Checkout.",
    image: "assets/conversion-rate-optimierung-onlineshop.png"
  },
  {
    id: "unsure",
    icon: "?",
    title: "Ich bin mir nicht sicher",
    description: "Für eine neutrale CRO-Erstanalyse ohne Spezialmodus.",
    hint: "Fokus auf die wichtigsten universellen Conversion-Hebel.",
    image: "assets/conversion-rate-optimierung.png"
  }
];

const categories = [
  { id: "a", label: "A", title: "Ersteindruck & Positionierung", shopOnly: false },
  { id: "b", label: "B", title: "Inhalte & Verkaufsargumente", shopOnly: false },
  { id: "c", label: "C", title: "Vertrauen & Sicherheit", shopOnly: false },
  { id: "d", label: "D", title: "UX & Nutzerführung", shopOnly: false },
  { id: "e", label: "E", title: "Formulare & Kontakt", shopOnly: false },
  { id: "f", label: "F", title: "Technik & Ladezeit", shopOnly: false },
  { id: "g", label: "G", title: "Onlineshop & Checkout", shopOnly: true }
];

const questions = [
  q("q1", "a", "Ist innerhalb von 5 Sekunden klar, was angeboten wird?", "Besucher sollten sofort erkennen, ob Ihr Angebot zu ihrem Problem passt.", ["positioning", "hero"], ["website", "landingpage", "shop", "unsure"]),
  q("q2", "a", "Ist die Zielgruppe sofort erkennbar?", "Je schneller sich die richtige Zielgruppe wiederfindet, desto geringer ist die Absprungrate.", ["positioning"], ["website", "landingpage", "shop", "unsure"]),
  q("q3", "a", "Gibt es ein klares Nutzenversprechen?", "Ein starkes Nutzenversprechen beantwortet die Frage: Warum genau dieses Angebot?", ["positioning", "content"], ["website", "landingpage", "shop", "unsure"]),
  q("q4", "a", "Ist der wichtigste CTA im sichtbaren Bereich?", "Der nächste Schritt sollte ohne Scrollen und ohne Suchen sichtbar sein.", ["cta", "hero"], ["website", "landingpage", "shop", "unsure"]),
  q("q5", "a", "Wirkt die Seite professionell und vertrauenswürdig?", "Designqualität, Konsistenz und Lesbarkeit beeinflussen Vertrauen sofort.", ["trust", "design"], ["website", "landingpage", "shop", "unsure"]),

  q("q6", "b", "Werden konkrete Vorteile genannt?", "Konkrete Vorteile sind stärker als allgemeine Leistungsversprechen.", ["content"], ["website", "landingpage", "shop", "unsure"]),
  q("q7", "b", "Werden Einwände beantwortet?", "Einwände zu Preis, Aufwand, Sicherheit oder Ablauf entstehen oft vor dem Kontakt.", ["content", "trust"], ["website", "landingpage", "shop", "unsure"]),
  q("q8", "b", "Gibt es eine klare Leistungsbeschreibung?", "Besucher sollten wissen, was sie bekommen und was nicht.", ["content"], ["website", "landingpage", "shop", "unsure"]),
  q("q9", "b", "Gibt es FAQ?", "FAQ reduzieren Unsicherheit und unterstützen Suchmaschinen mit relevanten Inhalten.", ["content", "seo"], ["website", "landingpage", "shop", "unsure"]),
  q("q10", "b", "Werden Preise, Ablauf oder nächste Schritte erklärt?", "Transparenz senkt die Hemmschwelle für Anfrage oder Kauf.", ["content", "trust"], ["website", "landingpage", "shop", "unsure"]),

  q("q11", "c", "Gibt es Kundenbewertungen?", "Bewertungen liefern sozialen Beweis und helfen bei der Entscheidungsabsicherung.", ["trust"], ["website", "landingpage", "shop", "unsure"]),
  q("q12", "c", "Gibt es Referenzen oder Beispiele?", "Referenzen zeigen, dass Ihr Angebot schon erfolgreich funktioniert hat.", ["trust", "content"], ["website", "landingpage", "shop", "unsure"]),
  q("q13", "c", "Gibt es echte Kontaktinformationen?", "Adresse, Telefon, E-Mail und Ansprechpartner machen ein Angebot greifbar.", ["trust", "contact"], ["website", "landingpage", "shop", "unsure"]),
  q("q14", "c", "Gibt es ein persönliches Element, z. B. Foto, Video oder Vorstellung?", "Menschen kaufen eher, wenn sie wissen, wer hinter einem Angebot steht.", ["trust"], ["website", "landingpage", "shop", "unsure"]),
  q("q15", "c", "Werden Datenschutz, Sicherheit oder Garantien verständlich kommuniziert?", "Sicherheitsinformationen sind besonders wichtig bei Formularen, Zahlungen und sensiblen Anfragen.", ["trust", "security"], ["website", "landingpage", "shop", "unsure"]),

  q("q16", "d", "Sind Buttons gut sichtbar?", "Buttons brauchen klare Farbe, genug Kontrast und verständliche Beschriftung.", ["cta", "ux"], ["website", "landingpage", "shop", "unsure"]),
  q("q17", "d", "Gibt es klare Kontaktmöglichkeiten?", "Kontakt, Anfrage oder Kauf sollten jederzeit leicht erreichbar sein.", ["contact", "cta"], ["website", "landingpage", "shop", "unsure"]),
  q("q18", "d", "Ist die Navigation einfach?", "Eine einfache Navigation hilft Besuchern, ohne Umwege zur Entscheidung zu kommen.", ["ux"], ["website", "landingpage", "shop", "unsure"]),
  q("q19", "d", "Gibt es zu viele Ablenkungen?", "Ablenkungen konkurrieren mit dem wichtigsten Ziel der Seite.", ["ux", "focus"], ["website", "landingpage", "shop", "unsure"]),
  q("q20", "d", "Ist die Seite mobil gut nutzbar?", "Viele Conversions starten oder passieren direkt auf dem Smartphone.", ["mobile", "ux"], ["website", "landingpage", "shop", "unsure"]),

  q("q21", "e", "Ist das Formular kurz genug?", "Jedes zusätzliche Feld kann die Abschlussrate reduzieren.", ["form"], ["website", "landingpage", "shop", "unsure"]),
  q("q22", "e", "Sind Pflichtfelder reduziert?", "Nur wirklich notwendige Pflichtfelder sollten abgefragt werden.", ["form"], ["website", "landingpage", "shop", "unsure"]),
  q("q23", "e", "Ist klar, was nach dem Absenden passiert?", "Erwartungssicherheit erhöht die Bereitschaft, ein Formular abzusenden.", ["form", "trust"], ["website", "landingpage", "shop", "unsure"]),
  q("q24", "e", "Gibt es alternative Kontaktwege wie Telefon oder E-Mail?", "Nicht jeder Nutzer möchte das gleiche Kontaktmedium verwenden.", ["contact"], ["website", "landingpage", "shop", "unsure"]),
  q("q25", "e", "Funktioniert das Formular auch mobil gut?", "Mobile Formularprobleme sind ein häufiger Grund für abgebrochene Anfragen.", ["form", "mobile"], ["website", "landingpage", "shop", "unsure"]),

  q("q26", "f", "Lädt die Seite schnell?", "Ladezeit wirkt direkt auf Absprünge, Rankings und Conversion Rate.", ["technical", "speed"], ["website", "landingpage", "shop", "unsure"]),
  q("q27", "f", "Sind Bilder optimiert?", "Zu große Bilder bremsen Seiten und verschlechtern mobile Nutzung.", ["technical", "speed"], ["website", "landingpage", "shop", "unsure"]),
  q("q28", "f", "Gibt es störende Popups?", "Popups können sinnvoll sein, dürfen aber die Hauptaufgabe nicht blockieren.", ["ux", "technical"], ["website", "landingpage", "shop", "unsure"]),
  q("q29", "f", "Gibt es technische Fehler?", "Fehlerhafte Links, Skripte oder Layoutbrüche reduzieren Vertrauen und Abschlüsse.", ["technical"], ["website", "landingpage", "shop", "unsure"]),
  q("q30", "f", "Funktioniert die Seite auf Smartphone, Tablet und Desktop?", "Conversion-Optimierung muss über wichtige Geräteklassen hinweg funktionieren.", ["mobile", "technical"], ["website", "landingpage", "shop", "unsure"]),

  q("q31", "g", "Sind Produktbilder hochwertig?", "Produktbilder ersetzen im Onlineshop den realen Blick auf das Produkt.", ["shop", "content"], ["shop"]),
  q("q32", "g", "Sind Lieferzeit und Versandkosten klar?", "Unerwartete Kosten sind ein klassischer Grund für Kaufabbrüche.", ["shop", "checkout"], ["shop"]),
  q("q33", "g", "Gibt es sichtbare Zahlungsarten?", "Zahlungsarten reduzieren Unsicherheit, wenn sie früh genug sichtbar sind.", ["shop", "checkout", "trust"], ["shop"]),
  q("q34", "g", "Gibt es Bewertungen oder Trust-Signale auf Produktseiten?", "Trust-Signale auf Produktseiten sichern die Kaufentscheidung ab.", ["shop", "trust"], ["shop"]),
  q("q35", "g", "Ist ein Gast-Checkout möglich?", "Ein Kontozwang kann Kaufabbrüche verursachen.", ["checkout"], ["shop"]),
  q("q36", "g", "Sind Warenkorb und Checkout einfach verständlich?", "Der Checkout sollte klar, linear und ohne Überraschungen funktionieren.", ["checkout", "ux"], ["shop"]),
  q("q37", "g", "Gibt es unnötige Schritte im Checkout?", "Jeder unnötige Schritt erhöht die Wahrscheinlichkeit eines Abbruchs.", ["checkout"], ["shop"]),
  q("q38", "g", "Werden Kaufabbrüche gemessen?", "Ohne Messung bleiben Checkout-Probleme oft unsichtbar.", ["tracking", "checkout"], ["shop"])
];

const recommendations = [
  rec("r1", "Hero-Bereich überarbeiten", "Formulieren Sie Angebot, Zielgruppe und Nutzen so, dass sie innerhalb weniger Sekunden verstanden werden.", "Hoch", "Mittel", "strategic", ["hero", "positioning"]),
  rec("r2", "CTA im sichtbaren Bereich platzieren", "Der wichtigste Button sollte above the fold sichtbar sein und klar zur nächsten Handlung führen.", "Hoch", "Gering", "quick", ["cta", "hero"]),
  rec("r3", "Nutzenversprechen schärfen", "Ersetzen Sie allgemeine Aussagen durch konkrete Ergebnisse, Zeitersparnis, Risikoreduktion oder Umsatzhebel.", "Hoch", "Mittel", "strategic", ["positioning", "content"]),
  rec("r4", "Zielgruppe klar benennen", "Sagen Sie direkt, für wen das Angebot gedacht ist und bei welchem Problem es hilft.", "Mittel", "Gering", "quick", ["positioning"]),
  rec("r5", "Professionelles visuelles System vereinheitlichen", "Prüfen Sie Abstände, Typografie, Bildstil, Farben und Button-Hierarchie auf Konsistenz.", "Mittel", "Mittel", "strategic", ["design", "trust"]),
  rec("r6", "Konkrete Vorteile ergänzen", "Machen Sie aus Leistungsmerkmalen nachvollziehbare Vorteile für Kunden.", "Hoch", "Gering", "quick", ["content"]),
  rec("r7", "Einwände sichtbar beantworten", "Ergänzen Sie Antworten zu Aufwand, Kosten, Sicherheit, Dauer, Garantie und nächstem Schritt.", "Hoch", "Mittel", "strategic", ["content", "trust"]),
  rec("r8", "Leistungsbeschreibung strukturieren", "Gliedern Sie Leistungen in klare Pakete, Schritte oder Anwendungsfälle.", "Mittel", "Mittel", "strategic", ["content"]),
  rec("r9", "FAQ ergänzen", "Beantworten Sie häufige Fragen direkt auf der Seite und nutzen Sie natürlich relevante SEO-Begriffe.", "Mittel", "Gering", "quick", ["seo", "content"]),
  rec("r10", "Ablauf und nächste Schritte erklären", "Zeigen Sie, was nach Anfrage, Bestellung oder Terminbuchung passiert.", "Mittel", "Gering", "quick", ["content", "trust"]),
  rec("r11", "Kundenbewertungen integrieren", "Platzieren Sie echte Bewertungen in der Nähe wichtiger Entscheidungspunkte.", "Hoch", "Gering", "quick", ["trust"]),
  rec("r12", "Referenzen oder Beispiele zeigen", "Nutzen Sie Vorher-Nachher-Beispiele, Projekte, Cases oder konkrete Ergebnisse.", "Hoch", "Mittel", "strategic", ["trust", "content"]),
  rec("r13", "Kontaktinformationen sichtbarer machen", "Zeigen Sie Telefon, E-Mail, Adresse oder Ansprechpartner dort, wo Vertrauen entsteht.", "Mittel", "Gering", "quick", ["contact", "trust"]),
  rec("r14", "Persönliches Element ergänzen", "Ein Foto, Teamabschnitt oder kurzes Video kann Nähe und Glaubwürdigkeit erhöhen.", "Mittel", "Mittel", "strategic", ["trust"]),
  rec("r15", "Datenschutz und Sicherheit verständlich machen", "Erklären Sie kurz, wie Daten verarbeitet werden und welche Sicherheiten gelten.", "Mittel", "Gering", "quick", ["security", "trust"]),
  rec("r16", "Button-Kontraste verbessern", "Prüfen Sie Farbe, Größe, Beschriftung und Wiederholung der zentralen Call-to-Actions.", "Hoch", "Gering", "quick", ["cta", "ux"]),
  rec("r17", "Kontaktwege wiederholen", "Bieten Sie Kontaktpunkte im Header, im Hauptbereich und nach Vertrauenselementen an.", "Mittel", "Gering", "quick", ["contact", "cta"]),
  rec("r18", "Navigation vereinfachen", "Reduzieren Sie Navigationspunkte und führen Sie Nutzer stärker zum Hauptziel.", "Mittel", "Mittel", "strategic", ["ux"]),
  rec("r19", "Ablenkungen entfernen", "Entfernen Sie konkurrierende Banner, unnötige Slider und sekundäre CTAs auf entscheidenden Seiten.", "Hoch", "Gering", "quick", ["focus", "ux"]),
  rec("r20", "Mobile Nutzerführung prüfen", "Optimieren Sie Header, Buttons, Formularfelder und Abstände für Smartphone-Nutzung.", "Hoch", "Mittel", "strategic", ["mobile", "ux"]),
  rec("r21", "Formularfelder reduzieren", "Fragen Sie nur ab, was für den ersten Kontakt wirklich nötig ist.", "Hoch", "Gering", "quick", ["form"]),
  rec("r22", "Pflichtfelder minimieren", "Machen Sie optionale Angaben wirklich optional und kennzeichnen Sie Pflichtfelder klar.", "Mittel", "Gering", "quick", ["form"]),
  rec("r23", "Formular-Erwartung erklären", "Ergänzen Sie einen kurzen Hinweis zu Antwortzeit, Datenschutz und nächstem Schritt.", "Mittel", "Gering", "quick", ["form", "trust"]),
  rec("r24", "Alternative Kontaktwege anbieten", "Ergänzen Sie Telefon, E-Mail, Rückruf oder Terminbuchung für unterschiedliche Nutzertypen.", "Mittel", "Gering", "quick", ["contact"]),
  rec("r25", "Mobile Formulare testen", "Prüfen Sie Tastaturtypen, Feldgrößen, Fehlermeldungen und Absende-Button auf Smartphones.", "Hoch", "Mittel", "technical", ["form", "mobile"]),
  rec("r26", "Ladezeit optimieren", "Komprimieren Sie Assets, reduzieren Sie unnötige Skripte und prüfen Sie Core Web Vitals.", "Hoch", "Hoch", "technical", ["speed", "technical"]),
  rec("r27", "Bilder komprimieren", "Nutzen Sie moderne Bildformate, passende Größen und Lazy Loading für nicht kritische Bilder.", "Mittel", "Mittel", "technical", ["speed"]),
  rec("r28", "Popups entschärfen", "Vermeiden Sie blockierende Popups auf mobilen Geräten und wichtigen Conversion-Schritten.", "Mittel", "Gering", "quick", ["technical", "ux"]),
  rec("r29", "Technische Fehler beheben", "Prüfen Sie Formularversand, Links, JavaScript-Fehler, Layoutbrüche und Tracking-Skripte.", "Hoch", "Mittel", "technical", ["technical"]),
  rec("r30", "Responsive QA durchführen", "Testen Sie Hauptseiten systematisch auf Smartphone, Tablet und Desktop.", "Hoch", "Mittel", "technical", ["mobile", "technical"]),
  rec("r31", "Produktseiten mit Kaufargumenten erweitern", "Ergänzen Sie Nutzen, Einsatzszenarien, Material, Größen, Lieferumfang und Einwände.", "Hoch", "Mittel", "strategic", ["shop", "content"], ["shop"]),
  rec("r32", "Produktbilder verbessern", "Nutzen Sie klare Produktfotos, Detailansichten, Größenbezug und mobile Galerie-Optimierung.", "Hoch", "Mittel", "strategic", ["shop"], ["shop"]),
  rec("r33", "Versandkosten früher kommunizieren", "Zeigen Sie Versandkosten und Lieferzeit vor Warenkorb und Checkout deutlich an.", "Hoch", "Gering", "quick", ["shop", "checkout"], ["shop"]),
  rec("r34", "Zahlungsarten sichtbar platzieren", "Kommunizieren Sie akzeptierte Zahlungsarten auf Produktseite, Warenkorb und Checkout.", "Mittel", "Gering", "quick", ["checkout", "trust"], ["shop"]),
  rec("r35", "Trust-Signale im Warenkorb platzieren", "Zeigen Sie Bewertungen, sichere Zahlung, Rückgabe und Support nahe dem Kaufabschluss.", "Hoch", "Gering", "quick", ["shop", "trust"], ["shop"]),
  rec("r36", "Gast-Checkout ermöglichen", "Reduzieren Sie Kontozwang und erlauben Sie den Kauf ohne Registrierung.", "Hoch", "Mittel", "strategic", ["checkout"], ["shop"]),
  rec("r37", "Checkout vereinfachen", "Reduzieren Sie Schritte, Pflichtfelder und Überraschungen im Checkout.", "Hoch", "Hoch", "technical", ["checkout"], ["shop"]),
  rec("r38", "Checkout-Fortschritt anzeigen", "Zeigen Sie Nutzern, wo sie im Kaufprozess stehen und was noch folgt.", "Mittel", "Mittel", "strategic", ["checkout"], ["shop"]),
  rec("r39", "Kaufabbrüche messen", "Richten Sie Funnel-Tracking für Produktseite, Warenkorb, Checkout-Schritte und Kauf ein.", "Hoch", "Mittel", "technical", ["tracking", "checkout"], ["shop"]),
  rec("r40", "Conversion-Tracking einrichten", "Messen Sie Anfragen, Klicks auf Telefonnummern, Formularfehler, Scrolltiefe und Verkäufe sauber.", "Hoch", "Mittel", "technical", ["tracking", "technical"]),
  rec("r41", "A/B-Test für Hauptbotschaft planen", "Testen Sie unterschiedliche Nutzenversprechen, CTA-Texte oder Hero-Strukturen mit ausreichend Traffic.", "Mittel", "Hoch", "later", ["positioning", "hero"]),
  rec("r42", "Landingpage-Fokus erhöhen", "Entfernen Sie sekundäre Navigationspfade und führen Sie die Seite konsequent auf ein Ziel.", "Hoch", "Mittel", "strategic", ["focus", "cta"], ["landingpage"]),
  rec("r43", "Newsletter-Versprechen konkretisieren", "Nennen Sie Frequenz, Inhalt und Nutzen der Anmeldung statt nur 'Newsletter abonnieren'.", "Mittel", "Gering", "quick", ["content", "cta"]),
  rec("r44", "Mikrocopy an kritischen Stellen verbessern", "Ergänzen Sie kleine Hinweise an Formularen, Buttons, Preisen und Versandinformationen.", "Mittel", "Gering", "later", ["form", "checkout", "trust"])
];

const problemRules = [
  problem("Unklare Positionierung", "Besucher verstehen möglicherweise nicht schnell genug, ob das Angebot zu ihnen passt.", "Mehr Absprünge, weniger qualifizierte Anfragen und schwächere Werbewirkung.", "Schärfen Sie Headline, Zielgruppe, Nutzenversprechen und erste Bildschirmansicht.", "Hoch", "Mittel", ["positioning"], ["a"]),
  problem("Schwacher Hero-Bereich", "Der Einstieg transportiert Angebot, Nutzen oder nächsten Schritt nicht stark genug.", "Der erste Eindruck verliert Aufmerksamkeit, bevor Inhalte gelesen werden.", "Überarbeiten Sie Hero-Text, Haupt-CTA, visuelle Hierarchie und Vertrauenselemente.", "Hoch", "Mittel", ["hero"], ["a"]),
  problem("Fehlende Trust-Elemente", "Bewertungen, Referenzen, Kontaktinformationen oder Sicherheitsargumente fehlen oder sind zu schwach.", "Nutzer zögern länger und brechen vor Anfrage oder Kauf eher ab.", "Integrieren Sie Bewertungen, Referenzen, echte Kontaktinformationen und Sicherheitsbelege.", "Hoch", "Mittel", ["trust"], ["c"]),
  problem("Zu wenig überzeugende Inhalte", "Vorteile, Einwände, FAQ oder Ablauf sind nicht ausreichend erklärt.", "Besucher bleiben unsicher und vergleichen eher mit Wettbewerbern.", "Ergänzen Sie Nutzenargumente, FAQ, Einwandbehandlung und klare nächste Schritte.", "Mittel", "Mittel", ["content"], ["b"]),
  problem("Zu kompliziertes Formular", "Formulare enthalten zu viele Hürden oder kommunizieren den nächsten Schritt nicht klar.", "Mehr Nutzer brechen kurz vor der Anfrage ab.", "Reduzieren Sie Felder, Pflichtangaben und Unsicherheit direkt am Formular.", "Hoch", "Gering", ["form"], ["e"]),
  problem("Schlechte mobile Nutzerführung", "Auf Smartphone oder Tablet können Navigation, Buttons oder Formulare Reibung erzeugen.", "Mobile Besucher konvertieren deutlich schlechter als Desktop-Nutzer.", "Prüfen und optimieren Sie mobile Abstände, Buttons, Formulare und Performance.", "Hoch", "Mittel", ["mobile"], ["d", "e", "f"]),
  problem("Schwache Call-to-Actions", "Die wichtigsten Handlungsaufforderungen sind nicht sichtbar, eindeutig oder überzeugend genug.", "Nutzer wissen nicht, welcher nächste Schritt erwartet wird.", "Verbessern Sie CTA-Texte, Kontrast, Positionierung und Wiederholung auf der Seite.", "Hoch", "Gering", ["cta"], ["a", "d"]),
  problem("Technische Reibung", "Ladezeit, Fehler, Popups oder Geräteprobleme können die Nutzung stören.", "Selbst überzeugende Inhalte verlieren Wirkung, wenn die Seite technisch bremst.", "Optimieren Sie Ladezeit, Bildgrößen, Skriptqualität und responsive Darstellung.", "Hoch", "Hoch", ["technical", "speed"], ["f"]),
  problem("Checkout-Probleme", "Produktseiten, Warenkorb oder Checkout enthalten potenzielle Kaufabbruchsgründe.", "Warenkörbe werden häufiger verlassen, obwohl Kaufinteresse vorhanden ist.", "Vereinfachen Sie Checkout, Versandkommunikation, Zahlungsarten und Trust-Signale.", "Hoch", "Mittel", ["checkout"], ["g"], ["shop"]),
  problem("Fehlendes Tracking", "Wichtige Conversion-Schritte oder Abbrüche werden nicht ausreichend gemessen.", "Optimierung basiert auf Vermutungen statt auf belastbaren Daten.", "Richten Sie Conversion-Tracking, Funnel-Tracking und Ereignisse für kritische Schritte ein.", "Mittel", "Mittel", ["tracking"], ["g", "f"])
];

const state = {
  mode: "website",
  basics: {
    url: "",
    industry: "",
    visitors: "",
    inquiries: "",
    sales: "",
    aov: "",
    goal: "Mehr Anfragen"
  },
  answers: {},
  calculation: null,
  result: null,
  savedAt: null
};

let activeCategoryId = "a";

document.addEventListener("DOMContentLoaded", init);

function init() {
  bindStaticEvents();
  renderModeCards();
  hydrateBasicsForm();
  renderAll();
}

function q(id, category, text, help, tags, modesForQuestion) {
  return { id, category, text, help, tags, modes: modesForQuestion, weight: 1 };
}

function rec(id, title, text, impact, effort, group, tags, modesForRecommendation = ["website", "landingpage", "shop", "unsure"]) {
  return { id, title, text, impact, effort, group, tags, modes: modesForRecommendation };
}

function problem(name, explanation, impact, recommendation, priority, effort, tags, categoryIds, modesForProblem = ["website", "landingpage", "shop", "unsure"]) {
  return { name, explanation, impact, recommendation, priority, effort, tags, categoryIds, modes: modesForProblem };
}

function bindStaticEvents() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.getElementById("basicsForm").addEventListener("input", handleBasicsInput);
  document.getElementById("basicsForm").addEventListener("change", handleBasicsInput);
  document.getElementById("saveBtn").addEventListener("click", saveState);
  document.getElementById("loadBtn").addEventListener("click", loadState);
  document.getElementById("resetBtn").addEventListener("click", resetState);
  document.getElementById("prevQuestion").addEventListener("click", () => moveCategory(-1));
  document.getElementById("nextQuestion").addEventListener("click", () => moveCategory(1));
  document.getElementById("copyReportBtn").addEventListener("click", copyReport);
  document.getElementById("downloadMarkdownBtn").addEventListener("click", downloadMarkdown);
  document.getElementById("downloadJsonBtn").addEventListener("click", downloadJson);
  document.getElementById("printBtn").addEventListener("click", () => window.print());
}

function renderAll() {
  ensureActiveCategory();
  state.calculation = calculateConversion();
  state.result = calculateResult();
  renderModeCards();
  renderModeHint();
  renderCalculator();
  renderCategoryTabs();
  renderQuestions();
  renderProgress();
  renderResults();
}

function renderModeCards() {
  const modeGrid = document.getElementById("modeGrid");
  modeGrid.innerHTML = modes.map((mode) => `
    <button class="mode-card" type="button" role="radio" aria-checked="${state.mode === mode.id}" data-mode="${mode.id}">
      <span class="mode-icon" aria-hidden="true">${mode.icon}</span>
      <img class="mode-thumb" src="${mode.image}" alt="" loading="lazy">
      <strong>${mode.title}</strong>
      <span>${mode.description}</span>
    </button>
  `).join("");

  modeGrid.querySelectorAll(".mode-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      ensureActiveCategory();
      renderAll();
    });
  });
}

function renderModeHint() {
  const mode = modes.find((item) => item.id === state.mode);
  document.getElementById("modeHint").textContent = mode ? mode.hint : "Wählen Sie einen Modus, um passende Fragen und Hinweise zu erhalten.";
}

function hydrateBasicsForm() {
  const form = document.getElementById("basicsForm");
  Object.entries(state.basics).forEach(([key, value]) => {
    if (form.elements[key]) {
      form.elements[key].value = value;
    }
  });
}

function handleBasicsInput(event) {
  const field = event.target;
  if (!field.name) return;
  state.basics[field.name] = field.value;
  renderAll();
}

function getActiveCategories() {
  return categories.filter((category) => !category.shopOnly || state.mode === "shop");
}

function getActiveQuestions() {
  return questions.filter((question) => question.modes.includes(state.mode));
}

function ensureActiveCategory() {
  const activeCategories = getActiveCategories();
  if (!activeCategories.some((category) => category.id === activeCategoryId)) {
    activeCategoryId = activeCategories[0].id;
  }
}

function renderCategoryTabs() {
  const categoryTabs = document.getElementById("categoryTabs");
  const activeCategories = getActiveCategories();
  categoryTabs.innerHTML = activeCategories.map((category) => {
    const categoryQuestions = getActiveQuestions().filter((question) => question.category === category.id);
    const answered = categoryQuestions.filter((question) => state.answers[question.id]).length;
    return `
      <button class="category-tab" type="button" role="tab" aria-selected="${activeCategoryId === category.id}" data-category="${category.id}">
        ${category.label}: ${category.title} (${answered}/${categoryQuestions.length})
      </button>
    `;
  }).join("");

  categoryTabs.querySelectorAll(".category-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategoryId = button.dataset.category;
      renderAll();
    });
  });
}

function renderQuestions() {
  const list = document.getElementById("questionsList");
  const currentQuestions = getActiveQuestions().filter((question) => question.category === activeCategoryId);
  list.innerHTML = currentQuestions.map((question, index) => {
    const selected = state.answers[question.id] || "";
    return `
      <article class="question-card">
        <div class="question-meta">
          <div>
            <div class="question-text">${index + 1}. ${question.text}</div>
            <p class="question-help">${question.help}</p>
          </div>
          <span class="tag">${question.tags.slice(0, 2).join(" + ")}</span>
        </div>
        <div class="answer-grid" role="radiogroup" aria-label="${escapeHtml(question.text)}">
          ${Object.entries(answerLabels).map(([value, label]) => `
            <label class="answer-option">
              <input type="radio" name="${question.id}" value="${value}" ${selected === value ? "checked" : ""}>
              <span>${label}</span>
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");

  list.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", () => {
      state.answers[input.name] = input.value;
      renderAll();
    });
  });
}

function moveCategory(direction) {
  const activeCategories = getActiveCategories();
  const currentIndex = activeCategories.findIndex((category) => category.id === activeCategoryId);
  const nextIndex = Math.max(0, Math.min(activeCategories.length - 1, currentIndex + direction));
  activeCategoryId = activeCategories[nextIndex].id;
  renderAll();
}

function renderProgress() {
  const activeQuestions = getActiveQuestions();
  const answered = activeQuestions.filter((question) => state.answers[question.id]).length;
  const total = activeQuestions.length;
  const percent = total ? Math.round((answered / total) * 100) : 0;
  document.getElementById("progressText").textContent = `${answered} von ${total} Fragen beantwortet`;
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function calculateConversion() {
  const visitors = toNumber(state.basics.visitors);
  const inquiries = toNumber(state.basics.inquiries);
  const sales = toNumber(state.basics.sales);
  const aov = toNumber(state.basics.aov);
  const goal = state.basics.goal || "";
  const preferSales = goal.includes("Verkäufe") || goal.includes("Kaufabbrüche");

  let conversionType = "";
  let conversions = 0;

  if (preferSales && sales > 0) {
    conversions = sales;
    conversionType = "Verkäufe";
  } else if (inquiries > 0) {
    conversions = inquiries;
    conversionType = "Anfragen";
  } else if (sales > 0) {
    conversions = sales;
    conversionType = "Verkäufe";
  }

  if (visitors <= 0 || conversions <= 0) {
    return {
      ready: false,
      visitors,
      inquiries,
      sales,
      aov,
      message: "Geben Sie Besucher und Anfragen oder Verkäufe ein, um die aktuelle Conversion Rate zu berechnen."
    };
  }

  const rate = (conversions / visitors) * 100;
  const improvements = [10, 25, 50].map((lift) => {
    const projectedConversions = conversions * (1 + lift / 100);
    const additionalConversions = projectedConversions - conversions;
    return {
      lift,
      projectedConversions,
      additionalConversions,
      additionalRevenue: aov > 0 ? additionalConversions * aov : null
    };
  });

  return {
    ready: true,
    visitors,
    conversions,
    conversionType,
    inquiries,
    sales,
    aov,
    rate,
    improvements
  };
}

function renderCalculator() {
  const calculator = document.getElementById("calculator");
  const calc = state.calculation;

  if (!calc.ready) {
    calculator.innerHTML = `<div class="metric" style="grid-column: 1 / -1;"><span>Conversion-Rate-Rechner</span><strong>Noch keine Berechnung</strong><small>${calc.message}</small></div>`;
    return;
  }

  calculator.innerHTML = `
    <div class="metric">
      <span>Aktuelle Conversion Rate</span>
      <strong>${formatPercent(calc.rate)}</strong>
      <small>${formatNumber(calc.conversions)} ${calc.conversionType} bei ${formatNumber(calc.visitors)} Besuchern</small>
    </div>
    ${calc.improvements.map((item) => `
      <div class="metric">
        <span>Potenzial bei +${item.lift}%</span>
        <strong>${formatNumber(item.projectedConversions)}</strong>
        <small>${formatNumber(item.additionalConversions)} zusätzliche ${calc.conversionType}${item.additionalRevenue !== null ? `, ca. ${formatCurrency(item.additionalRevenue)} Umsatz` : ""}</small>
      </div>
    `).join("")}
    <div class="metric" style="grid-column: 1 / -1;">
      <span>Hinweis</span>
      <strong>Unverbindliche Beispielrechnung</strong>
      <small>Die tatsächliche Entwicklung hängt von Traffic-Qualität, Angebot, Tracking, Saison, Preisen und Umsetzung der Maßnahmen ab.</small>
    </div>
  `;
}

function calculateResult() {
  const activeQuestions = getActiveQuestions();
  const activeCategories = getActiveCategories();
  const categoryScores = activeCategories.map((category) => {
    const categoryQuestions = activeQuestions.filter((question) => question.category === category.id);
    return {
      ...category,
      ...scoreQuestions(categoryQuestions)
    };
  });

  const totalScore = scoreQuestions(activeQuestions);
  const weakTags = collectWeakTags(activeQuestions);
  const detectedProblems = detectProblems(categoryScores, weakTags);
  const dynamicRecommendations = buildRecommendations(weakTags);
  const priorityMatrix = buildPriorityMatrix(dynamicRecommendations);
  const scoreBand = getScoreBand(totalScore.percent);

  return {
    total: totalScore,
    categoryScores,
    weakTags,
    detectedProblems,
    recommendations: dynamicRecommendations,
    priorityMatrix,
    scoreBand
  };
}

function scoreQuestions(questionSet) {
  let possible = 0;
  let achieved = 0;
  let answered = 0;
  let excluded = 0;

  questionSet.forEach((question) => {
    const answer = state.answers[question.id];
    if (!answer) return;
    answered += 1;
    const value = answerValues[answer];
    if (value === null) {
      excluded += 1;
      return;
    }
    possible += question.weight;
    achieved += question.weight * value;
  });

  return {
    achieved,
    possible,
    answered,
    excluded,
    percent: possible > 0 ? Math.round((achieved / possible) * 100) : 0
  };
}

function collectWeakTags(activeQuestions) {
  const tagCounts = {};
  activeQuestions.forEach((question) => {
    const answer = state.answers[question.id];
    if (answer !== "no" && answer !== "partial") return;
    const multiplier = answer === "no" ? 2 : 1;
    question.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + multiplier;
    });
  });
  return tagCounts;
}

function detectProblems(categoryScores, weakTags) {
  return problemRules
    .filter((rule) => rule.modes.includes(state.mode))
    .map((rule) => {
      const tagScore = rule.tags.reduce((sum, tag) => sum + (weakTags[tag] || 0), 0);
      const categoryWeak = rule.categoryIds.some((categoryId) => {
        const score = categoryScores.find((item) => item.id === categoryId);
        return score && score.possible > 0 && score.percent < 65;
      });
      return { ...rule, triggerScore: tagScore + (categoryWeak ? 2 : 0) };
    })
    .filter((rule) => rule.triggerScore >= 2)
    .sort((a, b) => b.triggerScore - a.triggerScore)
    .slice(0, 8);
}

function buildRecommendations(weakTags) {
  const modeRecommendations = recommendations.filter((item) => item.modes.includes(state.mode));
  const scored = modeRecommendations.map((item) => {
    const triggerScore = item.tags.reduce((sum, tag) => sum + (weakTags[tag] || 0), 0);
    const impactScore = item.impact === "Hoch" ? 3 : item.impact === "Mittel" ? 2 : 1;
    const effortBonus = item.effort === "Gering" ? 1.2 : item.effort === "Mittel" ? 0.6 : 0;
    return { ...item, triggerScore, sortScore: triggerScore * 3 + impactScore + effortBonus };
  });

  const triggered = scored.filter((item) => item.triggerScore > 0);
  const fallback = scored.filter((item) => item.triggerScore === 0 && ["quick", "technical"].includes(item.group));
  return [...triggered, ...fallback]
    .sort((a, b) => b.sortScore - a.sortScore)
    .slice(0, 16);
}

function buildPriorityMatrix(items) {
  return {
    quick: items.filter((item) => item.group === "quick").slice(0, 5),
    strategic: items.filter((item) => item.group === "strategic").slice(0, 5),
    technical: items.filter((item) => item.group === "technical").slice(0, 5),
    later: items.filter((item) => item.group === "later").slice(0, 5)
  };
}

function getScoreBand(percent) {
  if (percent <= 39) {
    return {
      title: "Kritischer Optimierungsbedarf",
      text: "Die Analyse zeigt deutliche Conversion-Hürden. Priorisieren Sie zuerst Klarheit, Vertrauen, CTA und technische Reibung."
    };
  }
  if (percent <= 59) {
    return {
      title: "Deutliches Verbesserungspotenzial",
      text: "Die Basis ist erkennbar, aber mehrere zentrale Hebel bremsen Anfragen, Verkäufe oder Checkout-Abschlüsse."
    };
  }
  if (percent <= 79) {
    return {
      title: "Gute Basis, aber wichtige Hebel offen",
      text: "Viele Grundlagen stimmen. Mit gezielten Maßnahmen können Sie Conversion Rate und Nutzerführung weiter verbessern."
    };
  }
  return {
    title: "Starke Grundlage mit Feinschliff-Potenzial",
    text: "Ihre Website wirkt bereits gut aufgestellt. Sinnvoll sind Feinschliff, Tracking, Tests und Priorisierung nach Wirkung."
  };
}

function renderResults() {
  const result = state.result;
  const activeQuestions = getActiveQuestions();
  const answered = activeQuestions.filter((question) => state.answers[question.id]).length;
  const dashboard = document.getElementById("resultsDashboard");
  const score = result.total.percent;
  const mode = modes.find((item) => item.id === state.mode);
  const modeNote = getModeNote();

  dashboard.innerHTML = `
    <div class="results-top">
      <article class="score-card">
        <span class="small-label">Conversion-Score</span>
        <div class="score-ring" style="--score: ${score};"><strong>${score}</strong></div>
        <h3>${result.scoreBand.title}</h3>
        <p>${result.scoreBand.text}</p>
        <p>${answered} von ${activeQuestions.length} Fragen beantwortet, ${result.total.excluded} Antworten ausgeschlossen.</p>
      </article>
      <article class="report-card">
        <span class="small-label">Zusammenfassung</span>
        <h3>${mode.title}</h3>
        <p>${modeNote}</p>
        <div class="category-bars">
          ${result.categoryScores.map((category) => `
            <div class="category-row">
              <strong>${category.label}: ${category.title}</strong>
              <div class="bar" aria-hidden="true"><span style="width: ${category.percent}%"></span></div>
              <span>${category.possible > 0 ? `${category.percent}%` : "offen"}</span>
            </div>
          `).join("")}
        </div>
      </article>
    </div>

    <div class="dashboard-grid">
      <article class="report-card">
        <span class="small-label">Erkannte Hauptprobleme</span>
        <div class="problem-grid">
          ${result.detectedProblems.length ? result.detectedProblems.map(renderProblem).join("") : `<div class="empty-state">Noch keine klaren Hauptprobleme erkannt. Beantworten Sie weitere Fragen, um die Auswertung zu präzisieren.</div>`}
        </div>
      </article>
      <article class="report-card">
        <span class="small-label">Empfohlene Sofortmaßnahmen</span>
        <div class="recommendation-grid">
          ${result.recommendations.slice(0, 6).map(renderRecommendation).join("") || `<div class="empty-state">Sobald Antworten vorliegen, erscheinen hier priorisierte Empfehlungen.</div>`}
        </div>
      </article>
    </div>

    <article class="report-card">
      <span class="small-label">Prioritäten-Matrix</span>
      <div class="priority-grid dashboard-grid">
        ${renderPriorityGroup("Quick Wins", result.priorityMatrix.quick)}
        ${renderPriorityGroup("Wichtige strategische Maßnahmen", result.priorityMatrix.strategic)}
        ${renderPriorityGroup("Technische Optimierungen", result.priorityMatrix.technical)}
        ${renderPriorityGroup("Spätere Feinschliff-Maßnahmen", result.priorityMatrix.later)}
      </div>
    </article>

    <article class="report-card">
      <span class="small-label">Mittelfristige Maßnahmen und Hinweise</span>
      <div class="recommendation-grid">
        ${result.recommendations.slice(6, 12).map(renderRecommendation).join("") || `<div class="empty-state">Für mittelfristige Maßnahmen werden weitere Antworten ausgewertet.</div>`}
      </div>
    </article>
  `;
}

function renderProblem(problemItem) {
  return `
    <div class="problem-card">
      <h4>${problemItem.name}</h4>
      <p>${problemItem.explanation}</p>
      <p><strong>Auswirkung:</strong> ${problemItem.impact}</p>
      <p><strong>Empfehlung:</strong> ${problemItem.recommendation}</p>
      <div class="tag-row">
        <span class="tag ${priorityClass(problemItem.priority)}">Priorität: ${problemItem.priority}</span>
        <span class="tag">Aufwand: ${problemItem.effort}</span>
      </div>
    </div>
  `;
}

function renderRecommendation(item) {
  return `
    <div class="recommendation-card">
      <h4>${item.title}</h4>
      <p>${item.text}</p>
      <div class="tag-row">
        <span class="tag ${priorityClass(item.impact)}">Wirkung: ${item.impact}</span>
        <span class="tag">Aufwand: ${item.effort}</span>
      </div>
    </div>
  `;
}

function renderPriorityGroup(title, items) {
  return `
    <div class="priority-card">
      <h4>${title}</h4>
      ${items.length ? items.map((item) => `<p><strong>${item.title}:</strong> ${item.text}</p>`).join("") : `<p>Noch keine passende Maßnahme in dieser Gruppe.</p>`}
    </div>
  `;
}

function priorityClass(value) {
  if (value === "Hoch") return "high";
  if (value === "Mittel") return "medium";
  return "low";
}

function getModeNote() {
  const calcText = state.calculation.ready
    ? `Die aktuelle Beispiel-Conversion-Rate liegt bei ${formatPercent(state.calculation.rate)} für ${state.calculation.conversionType}.`
    : "Der Conversion-Rate-Rechner wartet noch auf Besucher und Conversions.";

  if (state.mode === "shop") {
    return `${calcText} Im Shop-Modus werden zusätzlich Produktseite, Versandkommunikation, Zahlungsarten, Warenkorb, Gast-Checkout und Kaufabbrüche bewertet.`;
  }
  if (state.mode === "landingpage") {
    return `${calcText} Im Landingpage-Modus liegt der Schwerpunkt auf klarer Botschaft, fokussierter Nutzerführung und starkem CTA.`;
  }
  if (state.mode === "website") {
    return `${calcText} Für Websites und Dienstleisterseiten zählen besonders Positionierung, Vertrauen, Kontaktwege und Formularqualität.`;
  }
  return `${calcText} Die neutrale Analyse bewertet die wichtigsten universellen CRO-Hebel.`;
}

function saveState() {
  state.savedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    mode: state.mode,
    basics: state.basics,
    answers: state.answers,
    calculation: state.calculation,
    result: state.result,
    savedAt: state.savedAt
  }));
  setStatus("storageStatus", "Analyse wurde lokal zwischengespeichert.");
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    setStatus("storageStatus", "Es wurde keine gespeicherte Analyse gefunden.");
    return;
  }

  try {
    const saved = JSON.parse(raw);
    state.mode = saved.mode || "website";
    state.basics = { ...state.basics, ...(saved.basics || {}) };
    state.answers = saved.answers || {};
    state.savedAt = saved.savedAt || null;
    hydrateBasicsForm();
    renderAll();
    setStatus("storageStatus", "Gespeicherte Analyse wurde geladen.");
  } catch (error) {
    setStatus("storageStatus", "Die gespeicherte Analyse konnte nicht geladen werden.");
  }
}

function resetState() {
  if (!window.confirm("Möchten Sie die aktuelle Analyse wirklich zurücksetzen?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state.mode = "website";
  state.basics = {
    url: "",
    industry: "",
    visitors: "",
    inquiries: "",
    sales: "",
    aov: "",
    goal: "Mehr Anfragen"
  };
  state.answers = {};
  state.savedAt = null;
  activeCategoryId = "a";
  hydrateBasicsForm();
  renderAll();
  setStatus("storageStatus", "Analyse wurde zurückgesetzt.");
}

function getReportData() {
  return {
    generatedAt: new Date().toISOString(),
    mode: state.mode,
    modeTitle: modes.find((item) => item.id === state.mode)?.title,
    basics: state.basics,
    calculation: state.calculation,
    score: state.result.total.percent,
    scoreBand: state.result.scoreBand,
    categoryScores: state.result.categoryScores,
    detectedProblems: state.result.detectedProblems,
    recommendations: state.result.recommendations,
    priorityMatrix: state.result.priorityMatrix,
    answers: state.answers,
    disclaimer: "Dieses Tool ersetzt keine individuelle Beratung, sondern liefert eine erste Orientierung."
  };
}

function buildMarkdownReport() {
  const data = getReportData();
  const calc = data.calculation.ready
    ? `Aktuelle Conversion Rate: ${formatPercent(data.calculation.rate)} (${formatNumber(data.calculation.conversions)} ${data.calculation.conversionType} bei ${formatNumber(data.calculation.visitors)} Besuchern)`
    : "Keine Conversion-Rate-Berechnung, weil Besucher und Conversions fehlen.";

  return `# Conversion-Rate-Check Bericht

Erstellt am: ${new Date(data.generatedAt).toLocaleString("de-DE")}

## Zusammenfassung

- Modus: ${data.modeTitle}
- Hauptziel: ${data.basics.goal || "Nicht angegeben"}
- Branche: ${data.basics.industry || "Nicht angegeben"}
- Website: ${data.basics.url || "Nicht angegeben"}
- Conversion-Rechner: ${calc}
- Conversion-Score: ${data.score} Prozent
- Bewertung: ${data.scoreBand.title}

${data.scoreBand.text}

## Kategorie-Auswertung

${data.categoryScores.map((category) => `- ${category.label}: ${category.title}: ${category.possible > 0 ? `${category.percent} Prozent` : "noch offen"}`).join("\n")}

## Erkannte Hauptprobleme

${data.detectedProblems.length ? data.detectedProblems.map((item) => `### ${item.name}

${item.explanation}

Auswirkung: ${item.impact}

Empfehlung: ${item.recommendation}

Priorität: ${item.priority}, Aufwand: ${item.effort}`).join("\n\n") : "Noch keine klaren Hauptprobleme erkannt."}

## Empfohlene Sofortmaßnahmen

${data.recommendations.slice(0, 8).map((item) => `- ${item.title}: ${item.text} (Wirkung: ${item.impact}, Aufwand: ${item.effort})`).join("\n")}

## Mittelfristige Maßnahmen

${data.recommendations.slice(8, 16).map((item) => `- ${item.title}: ${item.text} (Wirkung: ${item.impact}, Aufwand: ${item.effort})`).join("\n") || "- Weitere Maßnahmen ergeben sich aus einer detaillierten Analyse."}

## Professionelle Unterstützung

Mehr Informationen zur Conversion-Rate-Optimierung von Mediencenter Essen:
${CRO_URL}

Kontakt für ein CRO-Audit:
${CRO_CONTACT_URL}

Hinweis: ${data.disclaimer}
`;
}

function buildTextReport() {
  return buildMarkdownReport()
    .replace(/^#+\s/gm, "")
    .replace(/\*\*/g, "");
}

async function copyReport() {
  const text = buildTextReport();
  try {
    await navigator.clipboard.writeText(text);
    setStatus("exportStatus", "Bericht wurde in die Zwischenablage kopiert.");
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    setStatus("exportStatus", "Bericht wurde per Fallback in die Zwischenablage kopiert.");
  }
}

function downloadMarkdown() {
  downloadFile("conversion-rate-check-bericht.md", buildMarkdownReport(), "text/markdown;charset=utf-8");
  setStatus("exportStatus", "Markdown-Bericht wurde erstellt.");
}

function downloadJson() {
  downloadFile("conversion-rate-check-bericht.json", JSON.stringify(getReportData(), null, 2), "application/json;charset=utf-8");
  setStatus("exportStatus", "JSON-Bericht wurde erstellt.");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setStatus(id, message) {
  const element = document.getElementById(id);
  element.textContent = message;
  window.setTimeout(() => {
    if (element.textContent === message) {
      element.textContent = "";
    }
  }, 4200);
}

function toNumber(value) {
  const normalized = String(value || "").replace(",", ".");
  const number = Number.parseFloat(normalized);
  return Number.isFinite(number) ? number : 0;
}

function formatNumber(value) {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: value % 1 ? 1 : 0 }).format(value);
}

function formatPercent(value) {
  return `${new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)} %`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
