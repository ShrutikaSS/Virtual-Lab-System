<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description"
    content="ZealVirtual Science Lab — A multi-subject virtual lab portal for Chemistry, Physics, and Electrical engineering students. Run experiments anytime, anywhere.">
  <meta name="theme-color" content="#152A50">
  <title>ZealVirtual Science Lab — Chemistry · Physics · Electrical</title>

  <!-- Fonts & Stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="assets/css/landing/landing.css">
</head>

<body>

  <!-- Scroll progress indicator -->
  <div id="scroll-progress" aria-hidden="true"></div>

  <!-- ============================================================
       1. STICKY HEADER
       ============================================================ -->
  <header id="main-header" role="banner">
    <div class="container header-container">

      <!-- Logo mark: flask/circuit hybrid SVG inside a ring -->
      <a href="#" class="logo-block" id="header-logo" aria-label="ZealVirtual Science Lab — Home">
        <div class="logo-ring" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer ring: dashed -->
            <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3.5" opacity="0.6"/>
            <!-- Inner solid ring -->
            <circle cx="24" cy="24" r="17.5" stroke="currentColor" stroke-width="1" opacity="0.35"/>

            <!-- Flask body -->
            <path d="M20.5 12.5 H27.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M22.5 12.5 V19 L16 30.5 a2.5 2.5 0 0 0 2.2 3.7 H29.8 a2.5 2.5 0 0 0 2.2 -3.7 L26 19 V12.5"
              stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>

            <!-- Circuit trace inside flask (amber) -->
            <path d="M24 19 V24 H20" stroke="#F0B33E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="20" cy="24" r="2.2" fill="#F0B33E"/>

            <!-- Chemistry dot (teal) -->
            <path d="M24 24 V27.5 H28" stroke="#37B7A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="28" cy="27.5" r="2" fill="#37B7A0"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">Zeal Institute</span>
          <span class="logo-sub">Virtual Science Lab Portal</span>
        </div>
      </a>

      <!-- Right-side nav -->
      <nav class="header-nav" id="main-nav" aria-label="Primary navigation">
        <a href="#help" class="help-link" id="nav-help-link">Help</a>
        <a href="#" class="btn btn-primary" id="header-login-btn" data-action="login">Login</a>
      </nav>

    </div>
  </header>

  <main>

    <!-- ============================================================
         2. HERO SECTION
         ============================================================ -->
    <section class="hero bg-blueprint" id="hero-section" aria-labelledby="hero-title">
      <div class="container hero-container">

        <!-- Left: copy -->
        <div class="hero-content">
          <span class="hero-eyebrow" id="hero-eyebrow">Chemistry &middot; Physics &middot; Electrical</span>

          <h1 class="hero-headline" id="hero-title">
            Measure, simulate,<br>
            and verify from<br>
            <span class="emphasis">your own screen.</span>
          </h1>

          <p class="hero-subcopy" id="hero-desc">
            Execute acid-base titrations to the equivalence point, trace Wheatstone bridge
            balance conditions, and plot pendulum decay curves — all without waiting for a
            physical bench.
          </p>

          <div class="hero-ctas">
            <a href="#" class="btn btn-primary" id="hero-launch-btn" data-action="login">Launch Workspace</a>
            <a href="#experiments" class="btn btn-ghost" id="hero-view-btn">View Simulations</a>
          </div>
        </div>

        <!-- Right: animated schematic illustration -->
        <div class="hero-illustration" id="hero-graphic"
          aria-label="Blueprint schematic combining a chemistry flask, atomic orbits, and circuit trace">
          <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
            aria-hidden="true">

            <!-- Background grid lines -->
            <line x1="50"  y1="0" x2="50"  y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="100" y1="0" x2="100" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="150" y1="0" x2="150" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="200" y1="0" x2="200" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="250" y1="0" x2="250" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="300" y1="0" x2="300" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="350" y1="0" x2="350" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="400" y1="0" x2="400" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="450" y1="0" x2="450" y2="420" class="schematic-grid-line" stroke-dasharray="4 5"/>

            <line x1="0" y1="50"  x2="500" y2="50"  class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="0" y1="100" x2="500" y2="100" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="0" y1="150" x2="500" y2="150" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="0" y1="200" x2="500" y2="200" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="0" y1="250" x2="500" y2="250" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="0" y1="300" x2="500" y2="300" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="0" y1="350" x2="500" y2="350" class="schematic-grid-line" stroke-dasharray="4 5"/>
            <line x1="0" y1="400" x2="500" y2="400" class="schematic-grid-line" stroke-dasharray="4 5"/>

            <!-- Connector dashes between elements -->
            <path d="M 155 280 L 250 195" stroke="rgba(251,250,245,0.12)" stroke-width="1.5" stroke-dasharray="3 4"/>
            <path d="M 250 195 L 320 245" stroke="rgba(251,250,245,0.12)" stroke-width="1.5" stroke-dasharray="3 4"/>

            <!-- ── FLASK (Chemistry · teal) ── -->
            <g id="schematic-chem">
              <!-- Neck bar -->
              <path class="draw-path stagger-1"
                d="M 118 128 H 148"
                stroke="#37B7A0" stroke-width="2.5" stroke-linecap="round"/>
              <!-- Flask body -->
              <path class="draw-path stagger-1"
                d="M 120 128 V 162 L 94 248 a7 7 0 0 0 6.3 10.5 H 160.7 a7 7 0 0 0 6.3 -10.5 L 144 162 V 128"
                stroke="#37B7A0" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
              <!-- Liquid surface line -->
              <path class="draw-path stagger-1"
                d="M 101 224 c 10 -5, 22 5, 34 -2 c 10 -4, 16 3, 22 0"
                stroke="#37B7A0" stroke-width="1.8" stroke-dasharray="5 3"/>
              <!-- Bubble 1 -->
              <circle class="draw-path stagger-1" cx="118" cy="200" r="4" stroke="#37B7A0" stroke-width="1.8"/>
              <!-- Bubble 2 -->
              <circle class="draw-path stagger-1" cx="132" cy="180" r="3" stroke="#37B7A0" stroke-width="1.5"/>
              <!-- Droplet -->
              <path class="draw-path stagger-1"
                d="M 133 122 V 112 M 130 115 L 133 108 L 136 115"
                stroke="#37B7A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

              <!-- Leader line + caption -->
              <path d="M 72 108 H 112" stroke="#37B7A0" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.5"/>
              <path d="M 72 108 V 122" stroke="#37B7A0" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.5"/>
              <text x="30" y="105" class="svg-caption" fill="#37B7A0" font-size="9">FLASK·CH</text>
            </g>

            <!-- ── ATOM ORBITS (Physics · violet) ── -->
            <g id="schematic-phys">
              <!-- 3 elliptical orbits at different angles -->
              <ellipse class="draw-path stagger-2"
                cx="250" cy="192" rx="28" ry="86"
                transform="rotate(35 250 192)"
                stroke="#9C8CF0" stroke-width="1.8"/>
              <ellipse class="draw-path stagger-2"
                cx="250" cy="192" rx="28" ry="86"
                transform="rotate(-35 250 192)"
                stroke="#9C8CF0" stroke-width="1.8"/>
              <ellipse class="draw-path stagger-2"
                cx="250" cy="192" rx="18" ry="86"
                transform="rotate(90 250 192)"
                stroke="#9C8CF0" stroke-width="1.4"/>

              <!-- Nucleus cluster -->
              <circle class="draw-path stagger-2" cx="250" cy="192" r="9" fill="#9C8CF0"/>
              <circle class="draw-path stagger-2" cx="244" cy="196" r="6" fill="#9C8CF0" opacity="0.75"/>
              <circle class="draw-path stagger-2" cx="257" cy="195" r="6.5" fill="#9C8CF0" opacity="0.85"/>

              <!-- Electron dots on orbit paths -->
              <circle cx="250" cy="108" r="4" fill="#9C8CF0" opacity="0.9"/>
              <circle cx="318" cy="175" r="3.5" fill="#9C8CF0" opacity="0.75"/>
              <circle cx="185" cy="213" r="3.5" fill="#9C8CF0" opacity="0.75"/>

              <!-- Leader + caption -->
              <path d="M 250 82 V 100" stroke="#9C8CF0" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.5"/>
              <text x="216" y="78" class="svg-caption svg-caption-2" fill="#9C8CF0" font-size="9">ORBIT·PH</text>
            </g>

            <!-- ── CIRCUIT TRACE (Electrical · amber) ── -->
            <g id="schematic-elec">
              <!-- Main trace path -->
              <path class="draw-path stagger-3"
                d="M 318 245 H 358 V 272 H 405"
                stroke="#F0B33E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path class="draw-path stagger-3"
                d="M 453 272 H 472 V 232 H 490"
                stroke="#F0B33E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

              <!-- Resistor chip 1 -->
              <rect class="draw-path stagger-3" x="405" y="258" width="48" height="28" rx="2"
                stroke="#F0B33E" stroke-width="2" fill="#152A50"/>
              <line class="draw-path stagger-3" x1="414" y1="265" x2="436" y2="265"
                stroke="#F0B33E" stroke-width="1.5"/>
              <line class="draw-path stagger-3" x1="414" y1="272" x2="430" y2="272"
                stroke="#F0B33E" stroke-width="1.5"/>
              <line class="draw-path stagger-3" x1="414" y1="279" x2="436" y2="279"
                stroke="#F0B33E" stroke-width="1.5"/>

              <!-- Chip 2: circular cap symbol -->
              <path class="draw-path stagger-3"
                d="M 472 210 H 445 V 254 H 472"
                stroke="#F0B33E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <line class="draw-path stagger-3" x1="472" y1="218" x2="490" y2="218"
                stroke="#F0B33E" stroke-width="2" stroke-linecap="round"/>
              <line class="draw-path stagger-3" x1="472" y1="246" x2="490" y2="246"
                stroke="#F0B33E" stroke-width="2" stroke-linecap="round"/>
              <line class="draw-path stagger-3" x1="490" y1="218" x2="490" y2="246"
                stroke="#F0B33E" stroke-width="1.5" stroke-dasharray="4 3"/>

              <!-- Terminal dots -->
              <circle cx="318" cy="245" r="4" fill="#F0B33E"/>
              <circle cx="490" cy="232" r="4" fill="#F0B33E"/>

              <!-- Leader + caption -->
              <path d="M 426 295 V 318" stroke="#F0B33E" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.5"/>
              <text x="380" y="334" class="svg-caption svg-caption-3" fill="#F0B33E" font-size="9">CIRCUIT·EL</text>
            </g>

          </svg>
        </div><!-- /hero-illustration -->

      </div>
    </section>

    <!-- ============================================================
         3. ABOUT SECTION
         ============================================================ -->
    <section class="about bg-paper" id="about-section" aria-labelledby="about-title">
      <div class="container about-grid">

        <!-- Left column: copy + stat rail -->
        <div class="about-copy reveal">
          <span class="about-eyebrow">About the Platform</span>
          <h2 class="about-title" id="about-title">Designed for rigor.<br>Built for validation.</h2>
          <p class="about-body">
            The ZealVirtual Science Lab gives Engineering students a direct interface to
            standard laboratory protocols. Bypass hardware bottlenecks and queue delays —
            set parameters, run the simulation, read exact outputs, and download a formatted
            lab report in minutes.
          </p>

          <!-- Stat rail: 3 Disciplines / 40+ Experiments / 24/7 Access -->
          <div class="stat-rail" id="about-stats" role="region" aria-label="Platform statistics">
            <div class="stat-item">
              <div class="stat-num" data-target="3" data-suffix="">3</div>
              <div class="stat-label">Disciplines</div>
            </div>
            <div class="stat-item">
              <div class="stat-num" data-target="40" data-suffix="+">40+</div>
              <div class="stat-label">Experiments</div>
            </div>
            <div class="stat-item">
              <div class="stat-num">24/7</div>
              <div class="stat-label">Access</div>
            </div>
          </div>
        </div>

        <!-- Right column: dark blueprint spec card -->
        <div class="spec-card reveal">
          <div class="spec-card-heading">ZEAL.SYSTEM.SPECIFICATION</div>
          <ul>
            <li>Add titrant drop by drop and watch the pH curve update in real time to find the equivalence point.</li>
            <li>Modify circuit resistance, voltage, and frequency; read output waveforms on a virtual oscilloscope.</li>
            <li>Adjust pendulum length and release angle; the simulation calculates local gravitational acceleration.</li>
            <li>Download auto-formatted lab reports as PDFs after each completed simulation run.</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- ============================================================
         4. FEATURED EXPERIMENTS
         ============================================================ -->
    <section class="experiments bg-paper-dim" id="experiments" aria-labelledby="exp-section-title">
      <div class="container">

        <div class="section-header">
          <div class="section-label">
            <span class="section-eyebrow">Module Catalog</span>
            <h2 class="section-title" id="exp-section-title">Featured Experiments</h2>
          </div>
        </div>

        <div class="experiments-grid">

          <!-- CH·01 — Acid-Base Equivalence -->
          <article class="exp-card chem reveal" id="exp-ch-01">
            <div class="exp-meta">
              <span class="exp-tag">CH&middot;01</span>
              <div class="exp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M9 3h6v4l4 9a2 2 0 0 1-1.8 2.9H6.8A2 2 0 0 1 5 16l4-9V3z" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="8.5" y1="10" x2="15.5" y2="10" stroke-dasharray="2 2"/>
                  <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </div>
            </div>
            <h3>Acid-Base Equivalence</h3>
            <p class="exp-desc">Add titrant drop by drop into the flask to identify the pH neutralization equivalence point on the curve.</p>
            <a href="#" class="exp-link" id="exp-link-ch-01">Open experiment &rarr;</a>
          </article>

          <!-- CH·02 — Chemical Kinetics -->
          <article class="exp-card chem reveal" id="exp-ch-02">
            <div class="exp-meta">
              <span class="exp-tag">CH&middot;02</span>
              <div class="exp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M6 3h12v2l-2 3h-8L6 5V3z" stroke-linejoin="round"/>
                  <path d="M10 8v8M14 8v8" stroke-linecap="round"/>
                  <ellipse cx="12" cy="18" rx="4" ry="2"/>
                  <path d="M8 12 c1-2 6-2 8 0" stroke-dasharray="2 1"/>
                </svg>
              </div>
            </div>
            <h3>Chemical Kinetics</h3>
            <p class="exp-desc">Track total gas volume changes over time to determine the rate law of a decomposition reaction.</p>
            <a href="#" class="exp-link" id="exp-link-ch-02">Open experiment &rarr;</a>
          </article>

          <!-- PH·01 — Gravitational Constant -->
          <article class="exp-card phys reveal" id="exp-ph-01">
            <div class="exp-meta">
              <span class="exp-tag">PH&middot;01</span>
              <div class="exp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <line x1="12" y1="2" x2="12" y2="4" stroke-linecap="round"/>
                  <line x1="12" y1="6" x2="12" y2="14" stroke-linecap="round" stroke-dasharray="2 1.5"/>
                  <circle cx="12" cy="18" r="3.5"/>
                  <path d="M7 5 c1 1 3 2 5 2 s4-1 5-2" stroke-dasharray="2 2" opacity="0.5"/>
                </svg>
              </div>
            </div>
            <h3>Gravitational Constant</h3>
            <p class="exp-desc">Measure the swing period of a simple pendulum at adjustable lengths to calculate local gravitational acceleration.</p>
            <a href="#" class="exp-link" id="exp-link-ph-01">Open experiment &rarr;</a>
          </article>

          <!-- PH·02 — Prism Light Refraction -->
          <article class="exp-card phys reveal" id="exp-ph-02">
            <div class="exp-meta">
              <span class="exp-tag">PH&middot;02</span>
              <div class="exp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M12 3 L2.5 20 H21.5 Z" stroke-linejoin="round"/>
                  <line x1="3" y1="16" x2="11" y2="14"/>
                  <line x1="13" y1="13.5" x2="21.5" y2="10.5" stroke-dasharray="2 1.5"/>
                  <line x1="13" y1="13.5" x2="21.5" y2="16.5" stroke-dasharray="2 1.5"/>
                  <line x1="13" y1="13.5" x2="21.5" y2="13.5" stroke-dasharray="1.5 2" opacity="0.5"/>
                </svg>
              </div>
            </div>
            <h3>Prism Light Refraction</h3>
            <p class="exp-desc">Refract a monochromatic laser through a glass prism and measure the angle of minimum deviation directly.</p>
            <a href="#" class="exp-link" id="exp-link-ph-02">Open experiment &rarr;</a>
          </article>

          <!-- EL·01 — Wheatstone Bridge -->
          <article class="exp-card elec reveal" id="exp-el-01">
            <div class="exp-meta">
              <span class="exp-tag">EL&middot;01</span>
              <div class="exp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M12 2 L22 12 L12 22 L2 12 Z" stroke-linejoin="round"/>
                  <line x1="2"  y1="12" x2="22" y2="12"/>
                  <line x1="12" y1="2"  x2="12" y2="22"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
                </svg>
              </div>
            </div>
            <h3>Wheatstone Bridge</h3>
            <p class="exp-desc">Assemble a balanced bridge network and tune the known resistors to determine an unknown resistance precisely.</p>
            <a href="#" class="exp-link" id="exp-link-el-01">Open experiment &rarr;</a>
          </article>

          <!-- EL·02 — RC Circuit Discharging -->
          <article class="exp-card elec reveal" id="exp-el-02">
            <div class="exp-meta">
              <span class="exp-tag">EL&middot;02</span>
              <div class="exp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <line x1="2"  y1="12" x2="8"  y2="12"/>
                  <line x1="16" y1="12" x2="22" y2="12"/>
                  <line x1="8"  y1="7"  x2="8"  y2="17" stroke-linecap="round"/>
                  <line x1="16" y1="7"  x2="16" y2="17" stroke-linecap="round"/>
                  <!-- decay curve suggestion -->
                  <path d="M4 6 C 6 6, 9 10, 12 13 S 18 18, 22 18" stroke-dasharray="2 1.5" opacity="0.6"/>
                </svg>
              </div>
            </div>
            <h3>RC Circuit Discharging</h3>
            <p class="exp-desc">Plot capacitor voltage decay curves in real time by varying resistance values across a discharge circuit.</p>
            <a href="#" class="exp-link" id="exp-link-el-02">Open experiment &rarr;</a>
          </article>

        </div><!-- /experiments-grid -->
      </div>
    </section>

    <!-- ============================================================
         5. ANNOUNCEMENTS LOG
         ============================================================ -->
    <section class="announcements bg-paper" id="announcements-section" aria-labelledby="ann-title">
      <div class="container">
        <div class="section-header" style="margin-bottom:2rem">
          <div class="section-label">
            <span class="section-eyebrow">System Log</span>
            <h2 class="section-title" id="ann-title">Latest Announcements</h2>
          </div>
        </div>

        <div class="log-list" role="log" aria-label="System announcements">

          <div class="log-row reveal" id="log-01">
            <span class="log-date">2026-07-16</span>
            <span class="log-dot dot-chem" aria-hidden="true"></span>
            <div class="log-content">
              <h3 class="log-headline">Acid-Base Simulator updated</h3>
              <p class="log-desc">Added phenolphthalein and methyl orange indicator options to the color profile selector.</p>
            </div>
            <span class="log-badge badge-chem">Chemistry</span>
          </div>

          <div class="log-row reveal" id="log-02">
            <span class="log-date">2026-07-14</span>
            <span class="log-dot dot-elec" aria-hidden="true"></span>
            <div class="log-content">
              <h3 class="log-headline">AC circuit simulation metrics calibrated</h3>
              <p class="log-desc">Wave calculation curves corrected and RMS current display values updated for accuracy.</p>
            </div>
            <span class="log-badge badge-elec">Electrical</span>
          </div>

          <div class="log-row reveal" id="log-03">
            <span class="log-date">2026-07-10</span>
            <span class="log-dot dot-phys" aria-hidden="true"></span>
            <div class="log-content">
              <h3 class="log-headline">Friction Coefficient module now active</h3>
              <p class="log-desc">Vary surface texture and normal force online to calculate static and kinetic friction thresholds.</p>
            </div>
            <span class="log-badge badge-phys">Physics</span>
          </div>

          <div class="log-row reveal" id="log-04">
            <span class="log-date">2026-07-05</span>
            <span class="log-dot dot-portal" aria-hidden="true"></span>
            <div class="log-content">
              <h3 class="log-headline">Dashboard version 2.4 released</h3>
              <p class="log-desc">Export completed simulation logs to signed, formatted PDF documents from the results panel.</p>
            </div>
            <span class="log-badge badge-portal">Portal</span>
          </div>

        </div><!-- /log-list -->
      </div>
    </section>

    <!-- ============================================================
         6. CONTACT + HELP
         ============================================================ -->
    <section class="support bg-blueprint-deep" id="help" aria-labelledby="contact-title">
      <div class="container support-grid">

        <!-- Contact column -->
        <div class="contact-column reveal">
          <h2 class="support-col-title" id="contact-title">Contact</h2>
          <div class="contact-list" role="region" aria-label="Contact information">
            <div class="contact-item">
              <span class="contact-key">Email</span>
              <span class="contact-val">support@zealvirtualscience.edu</span>
            </div>
            <div class="contact-item">
              <span class="contact-key">Phone</span>
              <span class="contact-val">+91 20 1234 5678</span>
            </div>
            <div class="contact-item">
              <span class="contact-key">Address</span>
              <span class="contact-val">Building 4, Engineering Block,<br>Zeal Institute of Engineering &amp; Research</span>
            </div>
            <div class="contact-item">
              <span class="contact-key">Admin</span>
              <span class="contact-val">admin-portal.zeal.edu</span>
            </div>
          </div>
        </div>

        <!-- Help column -->
        <div class="help-column reveal">
          <h2 class="support-col-title" id="help-title">Help &amp; Resources</h2>
          <nav class="help-links" aria-label="Help topics">
            <a href="#" class="help-row" id="help-link-01">
              <span class="help-row-text">Troubleshooting WebGL simulation rendering issues</span>
              <span class="help-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a href="#" class="help-row" id="help-link-02">
              <span class="help-row-text">Downloading and signing laboratory report PDFs</span>
              <span class="help-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a href="#" class="help-row" id="help-link-03">
              <span class="help-row-text">Requesting faculty evaluation for completed assignments</span>
              <span class="help-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a href="#" class="help-row" id="help-link-04">
              <span class="help-row-text">Accessing offline simulation packages for desktop</span>
              <span class="help-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </nav>
        </div>

      </div>
    </section>

  </main>

  <!-- ============================================================
       7. FOOTER
       ============================================================ -->
  <footer id="main-footer" class="bg-blueprint" role="contentinfo">
    <div class="container footer-inner">
      <p class="footer-copy" id="footer-copyright">
        &copy; 2026 Zeal Virtual Science Lab &mdash; Department of First Year Engineering
      </p>
      <nav class="footer-nav" aria-label="Footer navigation">
        <a href="#about-section" id="footer-about-link">About</a>
        <a href="#experiments"   id="footer-exp-link">Simulations</a>
        <a href="#help"          id="footer-help-link">Help Desk</a>
        <a href="#" class="btn btn-primary" id="footer-login-btn" data-action="login">Login</a>
      </nav>
    </div>
  </footer>

  <!-- Toast notification container (injected by JS) -->

  <!-- JS: landing page logic -->
  <script src="assets/js/landing/landing.js"></script>

  <!-- Inline scroll-reveal CSS (keeps zero-JS fallback clean) -->
  <style>
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
    }
    .reveal.revealed { opacity: 1; transform: translateY(0); }

    /* Stagger for grid children */
    .experiments-grid .reveal:nth-child(2) { transition-delay: 0.08s; }
    .experiments-grid .reveal:nth-child(3) { transition-delay: 0.16s; }
    .experiments-grid .reveal:nth-child(4) { transition-delay: 0.24s; }
    .experiments-grid .reveal:nth-child(5) { transition-delay: 0.32s; }
    .experiments-grid .reveal:nth-child(6) { transition-delay: 0.40s; }

    .log-list .reveal:nth-child(2) { transition-delay: 0.1s; }
    .log-list .reveal:nth-child(3) { transition-delay: 0.2s; }
    .log-list .reveal:nth-child(4) { transition-delay: 0.3s; }

    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    }
  </style>

</body>
</html>
