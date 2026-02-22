# Requirements - ARTCORE HUB

## Overview
ARTCORE HUB è un sito web per un'APS (Associazione di Promozione Sociale) che promuove coworking, live music, festival e scambio culturale internazionale. Il sito è sviluppato con Nuxt 4, utilizza Tailwind CSS ed è configurato per la generazione statica (SSG).

## Requisiti Funzionali

### 1. Pagina Coming Soon / Maintenance
- **REQ-001**: Il sito deve avere una pagina "Coming Soon" che può essere attivata/disattivata tramite una variabile booleana
- **REQ-002**: La variabile di controllo deve essere configurabile tramite variabile d'ambiente (`MAINTENANCE_MODE`)
- **REQ-003**: La pagina deve mostrare:
  - Brand "ARTCORE HUB"
  - Messaggio "Coming Soon" / "In Arrivo"
  - Tagline: "Coworking • Live Music • Festivals • Cultural Exchange"
  - 4 feature cards con icone minimal: Live Music, International, Coworking, Festivals
  - Messaggio informativo

### 2. Design e Stile
- **REQ-004**: Il sito deve utilizzare Tailwind CSS per tutto lo styling
- **REQ-005**: Il design deve essere minimal e pulito
- **REQ-006**: Le icone devono essere SVG minimaliste (non emoji)
- **REQ-007**: Il design deve essere responsive (mobile-first)
- **REQ-008**: Il taglio comunicativo deve essere giovane, fresco e innovativo, ispirato ai festival musicali europei

### 3. Multilingua
- **REQ-009**: Il sito deve supportare almeno 2 lingue: Italiano (default) e Inglese
- **REQ-010**: La lingua italiana non deve avere prefisso URL (es: `/`)
- **REQ-011**: La lingua inglese deve avere prefisso URL (es: `/en`)
- **REQ-012**: Deve essere presente un selettore di lingua funzionante
- **REQ-013**: Il rilevamento automatico della lingua del browser deve essere supportato
- **REQ-014**: Le traduzioni devono essere gestite tramite file JSON separati per lingua
- **REQ-015**: Tutti i testi del sito devono essere tradotti (banner, pagine, meta tag)

### 4. SEO (Search Engine Optimization)
- **REQ-016**: Il sito deve essere SEO-friendly
- **REQ-017**: Ogni lingua deve avere il suo percorso URL per essere indicizzata correttamente
- **REQ-018**: Deve essere generata automaticamente una sitemap XML multilingua
- **REQ-019**: La sitemap deve includere tutte le varianti linguistiche delle pagine
- **REQ-020**: Deve essere presente un file `robots.txt` con riferimento alla sitemap
- **REQ-021**: Ogni pagina deve avere meta tag SEO dinamici:
  - Title
  - Description
  - Keywords
  - Open Graph tags (og:title, og:description, og:type)
  - Twitter Card tags
- **REQ-022**: Deve essere presente il tag `hreflang` per ogni variante linguistica
- **REQ-023**: Deve essere presente il tag `canonical` per evitare contenuti duplicati
- **REQ-024**: L'attributo `lang` dell'HTML deve essere dinamico in base alla lingua corrente

### 5. GDPR e Cookie Policy
- **REQ-025**: Deve essere presente un banner cookie conforme al GDPR
- **REQ-026**: Il banner deve apparire solo se l'utente non ha ancora dato il consenso
- **REQ-027**: Il banner deve offrire 3 opzioni:
  - Accetta tutti i cookie
  - Rifiuta tutti i cookie
  - Gestisci preferenze
- **REQ-028**: Deve essere presente un popup/modal avanzato per gestire le preferenze dei cookie
- **REQ-029**: Le categorie di cookie devono essere:
  - Cookie necessari (sempre attivi, non disattivabili)
  - Cookie analitici (opzionale)
  - Cookie di marketing (opzionale)
  - Cookie funzionali (opzionale)
- **REQ-030**: Le preferenze dei cookie devono essere salvate in localStorage
- **REQ-031**: Deve essere presente una pagina Cookie Policy completa (`/cookie-policy`)
- **REQ-032**: Deve essere presente una pagina GDPR/Privacy Policy completa (`/gdpr`)
- **REQ-033**: Le pagine Cookie Policy e GDPR devono essere multilingua
- **REQ-034**: Il banner e il popup devono essere tradotti in tutte le lingue supportate

### 6. Generazione Statica (SSG)
- **REQ-035**: Il sito deve essere generato come Static Site (SSG)
- **REQ-036**: Il build deve generare file HTML statici per tutte le route
- **REQ-037**: Tutte le varianti linguistiche devono essere pre-renderizzate

### 7. Configurazione Server (Apache)
- **REQ-038**: Deve essere presente un file `.htaccess` per server Apache
- **REQ-039**: Il `.htaccess` deve includere:
  - Redirect HTTP → HTTPS
  - Rimozione trailing slash
  - Security headers (XSS Protection, Content-Type-Options, Frame-Options, etc.)
  - Compressione Gzip
  - Browser caching ottimizzato
  - Prevenzione accesso a file nascosti
  - Disabilitazione directory listing

### 8. Variabili d'Ambiente
- **REQ-040**: Deve essere presente un file `.example.env` come template
- **REQ-041**: Le variabili d'ambiente devono includere:
  - `MAINTENANCE_MODE`: per attivare/disattivare la modalità manutenzione
  - `NUXT_PUBLIC_SITE_URL`: URL del sito per sitemap e SEO

## Requisiti Tecnici

### Stack Tecnologico
- **REQ-TECH-001**: Framework: Nuxt 4
- **REQ-TECH-002**: CSS Framework: Tailwind CSS
- **REQ-TECH-003**: Linguaggio: TypeScript
- **REQ-TECH-004**: Moduli Nuxt:
  - `@nuxtjs/tailwindcss`: per Tailwind CSS
  - `@nuxtjs/i18n`: per la gestione multilingua
  - `@nuxtjs/sitemap`: per la generazione della sitemap

### Struttura File
- **REQ-TECH-005**: Componenti Vue nella cartella `components/`
- **REQ-TECH-006**: Composables nella cartella `composables/`
- **REQ-TECH-007**: Pagine nella cartella `pages/`
- **REQ-TECH-008**: File di traduzione nella cartella `i18n/locales/`
- **REQ-TECH-009**: File statici nella cartella `public/`

### Performance
- **REQ-PERF-001**: Il sito deve essere ottimizzato per performance
- **REQ-PERF-002**: Le immagini devono essere ottimizzate
- **REQ-PERF-003**: Il CSS deve essere minimizzato in produzione
- **REQ-PERF-004**: Il JavaScript deve essere minimizzato in produzione

### Accessibilità
- **REQ-ACC-001**: Il sito deve essere accessibile (WCAG 2.1 livello AA)
- **REQ-ACC-002**: Le icone devono avere alternative testuali appropriate
- **REQ-ACC-003**: I colori devono avere sufficiente contrasto

### Browser Support
- **REQ-BROWSER-001**: Supporto per browser moderni (Chrome, Firefox, Safari, Edge)
- **REQ-BROWSER-002**: Supporto per dispositivi mobili (iOS, Android)

## Requisiti di Contenuto

### Brand Identity
- **REQ-CONT-001**: Brand name: "ARTCORE HUB"
- **REQ-CONT-002**: Il brand deve essere presentato in modo prominente
- **REQ-CONT-003**: Il messaggio deve comunicare: coworking, live music, festival, scambio culturale

### Contenuti Multilingua
- **REQ-CONT-004**: Tutti i contenuti devono essere disponibili in italiano e inglese
- **REQ-CONT-005**: Le traduzioni devono essere accurate e culturalmente appropriate

## Requisiti di Deployment

### Build
- **REQ-DEPLOY-001**: Il comando `npm run build` deve generare il sito statico
- **REQ-DEPLOY-002**: L'output deve essere nella cartella `.output/public`
- **REQ-DEPLOY-003**: Il build deve includere tutte le varianti linguistiche

### Hosting
- **REQ-DEPLOY-004**: Il sito deve essere deployabile su hosting statico
- **REQ-DEPLOY-005**: Supporto per server Apache (via `.htaccess`)
- **REQ-DEPLOY-006**: Il sito deve funzionare con HTTPS

## 9. Pagine del Sito

### 9.1 Homepage (`/` e `/en`)
- **REQ-PAGE-001**: La homepage deve includere:
  - Hero section con titolo, sottotitolo e 2 CTA buttons (Coworking, Events)
  - Features section con 4 feature cards: Coworking, Live Music, Festivals, Cultural Exchange
  - About section con descrizione breve e link alla pagina About completa
- **REQ-PAGE-002**: Tutti i contenuti devono essere tradotti (chiavi i18n: `home.hero.*`, `home.features.*`, `home.about.*`)
- **REQ-PAGE-003**: La pagina deve essere responsive e ottimizzata per SEO

### 9.2 Pagina About (`/about` e `/en/about`)
- **REQ-PAGE-004**: La pagina About deve includere:
  - Hero section con titolo e sottotitolo
  - Mission section con descrizione della missione
  - Values section con lista di valori dell'associazione
- **REQ-PAGE-005**: Tutti i contenuti devono essere tradotti (chiavi i18n: `about.hero.*`, `about.mission.*`, `about.values.*`)
- **REQ-PAGE-006**: La pagina deve essere responsive e ottimizzata per SEO

### 9.3 Pagina Coworking (`/coworking` e `/en/coworking`)
- **REQ-PAGE-007**: La pagina Coworking deve includere:
  - Hero section con titolo e sottotitolo
  - Services section con lista dei servizi offerti
  - Features section con caratteristiche del coworking
- **REQ-PAGE-008**: Tutti i contenuti devono essere tradotti (chiavi i18n: `coworking.hero.*`, `coworking.services.*`, `coworking.features.*`)
- **REQ-PAGE-009**: La pagina deve essere responsive e ottimizzata per SEO

### 9.4 Pagina Events (`/events` e `/en/events`)
- **REQ-PAGE-010**: La pagina Events deve includere:
  - Hero section con titolo e sottotitolo
  - Event Types section con descrizione dei tipi di eventi (Live Music, Festivals, Cultural Exchange)
  - Upcoming Events section (placeholder per eventi futuri)
- **REQ-PAGE-011**: Tutti i contenuti devono essere tradotti (chiavi i18n: `events.hero.*`, `events.types.*`, `events.upcoming.*`)
- **REQ-PAGE-012**: La pagina deve essere responsive e ottimizzata per SEO

### 9.5 Pagina Contact (`/contact` e `/en/contact`)
- **REQ-PAGE-013**: La pagina Contact deve includere:
  - Hero section con titolo e sottotitolo
  - Contact Form con campi: Nome, Email, Messaggio
  - Contact Info section con informazioni di contatto
- **REQ-PAGE-014**: Tutti i contenuti devono essere tradotti (chiavi i18n: `contact.hero.*`, `contact.form.*`, `contact.info.*`)
- **REQ-PAGE-015**: La pagina deve essere responsive e ottimizzata per SEO
- **REQ-PAGE-016**: Il form deve essere funzionale (placeholder per integrazione backend futura)

### 9.6 Pagina Cookie Policy (`/cookie-policy` e `/en/cookie-policy`)
- **REQ-PAGE-017**: La pagina Cookie Policy deve includere contenuto completo e dettagliato sui cookie
- **REQ-PAGE-018**: Tutti i contenuti devono essere tradotti (chiavi i18n: `cookiePolicy.*`)
- **REQ-PAGE-019**: La pagina deve essere linkata dal banner cookie e dal popup preferenze

### 9.7 Pagina GDPR (`/gdpr` e `/en/gdpr`)
- **REQ-PAGE-020**: La pagina GDPR deve includere contenuto completo sulla privacy policy
- **REQ-PAGE-021**: Tutti i contenuti devono essere tradotti (chiavi i18n: `gdpr.*`)
- **REQ-PAGE-022**: La pagina deve essere linkata nel footer

## 10. Layout e Componenti

### 10.1 Layout Default
- **REQ-LAYOUT-001**: Deve esistere un layout `layouts/default.vue` che include:
  - `AppHeader` component (header con navigazione)
  - `<slot />` per il contenuto delle pagine
  - `AppFooter` component (footer con link e informazioni)
- **REQ-LAYOUT-002**: Il layout deve essere responsive e utilizzare Tailwind CSS

### 10.2 Componente AppHeader
- **REQ-COMP-001**: L'header deve includere:
  - Logo "ARTCORE HUB" linkato alla homepage
  - Navigazione desktop con link: Home, About, Coworking, Events, Contact
  - Selettore lingua (IT/EN)
  - Menu mobile responsive con hamburger menu
- **REQ-COMP-002**: La navigazione deve evidenziare la pagina corrente
- **REQ-COMP-003**: Tutti i link devono usare `localePath()` per supporto multilingua
- **REQ-COMP-004**: Il selettore lingua deve funzionare correttamente

### 10.3 Componente AppFooter
- **REQ-COMP-005**: Il footer deve includere:
  - Brand "ARTCORE HUB" con descrizione
  - Quick Links (Home, About, Coworking, Events, Contact)
  - Legal Links (GDPR, Cookie Policy)
  - Copyright e informazioni legali
- **REQ-COMP-006**: Tutti i contenuti devono essere tradotti (chiavi i18n: `footer.*`)
- **REQ-COMP-007**: Il footer deve essere responsive
