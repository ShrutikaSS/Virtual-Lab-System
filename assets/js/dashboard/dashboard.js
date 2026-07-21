/* ============================================================
   ZealVirtual Science Lab — Student Dashboard Script
   Architecture: assets/js/dashboard/dashboard.js
   ============================================================ */

(function () {
  'use strict';

  // Complete Sample Data Model for Student & Subjects
  const appData = {
    student: {
      name: 'Aarav Rao',
      firstName: 'Aarav',
      initials: 'AR',
      roll: '21AI045',
      program: 'B.Tech Computer Science & Artificial Intelligence',
      semester: 'Semester 4',
      batch: '2021–2025',
      email: 'aarav.rao@institute.edu',
      phone: '+91 98765 43210',
      mentor: 'Dr. S. K. Raman',
      stats: {
        completedCount: 12,
        quizzesAttempted: 15,
        avgScore: 88,
        hoursLogged: 14.5
      },
      badges: ['Titration Master', 'Circuit Wizard', 'Precision Analyst', 'Top Scorer']
    },
    subjects: {
      chem: {
        id: 'chem',
        name: 'Chemistry Lab',
        tag: 'CHEMISTRY',
        color: '#37B7A0',
        desc: 'Acid-base titrations, chemical kinetics, buffer solutions, and volumetric measurement.',
        total: 5,
        completed: 4,
        experiments: [
          {
            id: 'ch-01',
            tag: 'CH·01',
            title: 'Acid–Base Titration & Equivalence Point',
            desc: 'Determine the molar concentration of an unknown hydrochloric acid solution using standardized sodium hydroxide.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Acid–base titration is a quantitative chemical analysis technique used to determine the concentration of an identified analyte. A titrant of known concentration is added from a burette until the neutralization reaction reaches its equivalence point.',
              objectives: [
                'Understand the stoichiometry of strong acid-strong base neutralization reactions.',
                'Identify the equivalence point using phenolphthalein indicator color transitions.',
                'Calculate analyte molarity using M1V1 / n1 = M2V2 / n2.'
              ],
              keyFormula: 'M_{acid} \\times V_{acid} = M_{base} \\times V_{base}'
            },
            apparatus: [
              { name: '50mL Glass Burette', qty: '1 unit' },
              { name: '250mL Erlenmeyer Flask', qty: '2 units' },
              { name: '0.10 M NaOH Standard Solution', qty: '100 mL' },
              { name: 'Phenolphthalein Indicator', qty: '1 dropper' },
              { name: 'Volumetric Pipette & Bulb', qty: '1 unit' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'At the equivalence point of a strong acid–strong base titration, what is the theoretical pH?',
                options: ['pH = 4.0', 'pH = 7.0', 'pH = 9.0', 'pH = 12.0'],
                correctIndex: 1
              },
              {
                question: 'What color change does phenolphthalein undergo when transitioning from acidic to alkaline medium?',
                options: ['Yellow to Blue', 'Colorless to Pink', 'Red to Green', 'Blue to Red'],
                correctIndex: 1
              },
              {
                question: 'If 25.0 mL of unknown HCl requires 20.0 mL of 0.10 M NaOH to neutralize, what is the HCl concentration?',
                options: ['0.08 M', '0.10 M', '0.12 M', '0.15 M'],
                correctIndex: 0
              }
            ]
          },
          {
            id: 'ch-02',
            tag: 'CH·02',
            title: 'pH Metric Kinetics & Buffer Solutions',
            desc: 'Measure pH changes upon incremental addition of acid/base to phosphate buffer systems.',
            status: 'in-progress',
            progress: 60,
            theory: {
              intro: 'Buffer solutions resist drastic changes in pH upon the addition of small amounts of strong acid or base. The Henderson-Hasselbalch equation governs buffer behavior.',
              objectives: [
                'Analyze buffer capacity of weak acid and conjugate base pairs.',
                'Plot pH vs volume of added titrant curves.'
              ],
              keyFormula: 'pH = pK_a + \\log\\left(\\frac{[A^-]}{[HA]}\\right)'
            },
            apparatus: [
              { name: 'Digital pH Meter with Glass Electrode', qty: '1 unit' },
              { name: 'Phosphate Buffer Solution (pH 7.0)', qty: '150 mL' },
              { name: '0.1 M HCl Solution', qty: '50 mL' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'Which equation expresses the relationship between pH, pKa, and buffer component concentrations?',
                options: ['Nernst Equation', 'Henderson-Hasselbalch Equation', 'Arrhenius Equation', 'Beer-Lambert Law'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ch-03',
            tag: 'CH·03',
            title: 'Flame Photometry & Alkali Metal Analysis',
            desc: 'Identify sodium and potassium emission spectra wavelengths using atomic flame spectrophotometry.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Flame photometry measures light emission intensity from excited alkali metal atoms when introduced into a high-temperature flame.',
              objectives: ['Observe Na and K flame emission colors.', 'Determine concentration via linear calibration.'],
              keyFormula: 'I = K \\times C^b'
            },
            apparatus: [
              { name: 'Digital Flame Photometer', qty: '1 unit' },
              { name: 'Air Compressor & Propane Supply', qty: '1 set' },
              { name: 'NaCl & KCl Standard Solutions', qty: '1 set' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'What characteristic flame color is produced by sodium (Na) ions?',
                options: ['Lilac / Violet', 'Persistent Yellow-Orange', 'Brick Red', 'Emerald Green'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ch-04',
            tag: 'CH·04',
            title: 'Viscosity & Surface Tension of Pure Liquids',
            desc: 'Measure efflux time using Ostwald viscometer and stalagmometer to determine relative viscosity and surface tension.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Viscosity measures a fluid’s resistance to gradual deformation by shear stress, governed by Poiseuille’s law.',
              objectives: ['Measure flow time using Ostwald viscometer.', 'Calculate relative viscosity using fluid density ratios.'],
              keyFormula: '\\frac{\\eta_1}{\\eta_2} = \\frac{\\rho_1 t_1}{\\rho_2 t_2}'
            },
            apparatus: [
              { name: 'Ostwald Viscometer', qty: '1 unit' },
              { name: 'Stalagmometer', qty: '1 unit' },
              { name: 'Constant Temperature Water Bath', qty: '1 unit' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'How does the viscosity of a liquid typically change as temperature increases?',
                options: ['Viscosity increases', 'Viscosity decreases', 'Viscosity remains constant', 'Viscosity drops to zero'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ch-05',
            tag: 'CH·05',
            title: 'Chemical Kinetics & Reaction Order',
            desc: 'Determine reaction rate constant k and reaction order for acid-catalyzed ester hydrolysis.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Chemical kinetics studies reaction rates and mechanisms under varying concentration and temperature conditions.',
              objectives: ['Determine rate constant k for pseudo first-order hydrolysis.', 'Calculate activation energy Ea.'],
              keyFormula: 'k = \\frac{2.303}{t} \\log\\left(\\frac{V_\\infty - V_0}{V_\\infty - V_t}\\right)'
            },
            apparatus: [
              { name: 'Methyl Acetate Solution', qty: '50 mL' },
              { name: '0.5 M HCl Catalyst Solution', qty: '100 mL' },
              { name: 'Ice Water Bath', qty: '1 unit' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'In acid-catalyzed hydrolysis of methyl acetate, what is the order of reaction with respect to ester?',
                options: ['Zero order', 'Pseudo first-order', 'Second order', 'Third order'],
                correctIndex: 1
              }
            ]
          }
        ]
      },
      phy: {
        id: 'phy',
        name: 'Physics Lab',
        tag: 'PHYSICS',
        color: '#9C8CF0',
        desc: 'Simple harmonic pendulum motion, projectile kinematics, optical diffraction, and wave mechanics.',
        total: 5,
        completed: 4,
        experiments: [
          {
            id: 'phy-01',
            tag: 'PH·01',
            title: 'Simple Pendulum & Gravitational Acceleration',
            desc: 'Investigate the period of a simple pendulum as a function of string length L to calculate local acceleration due to gravity g.',
            status: 'in-progress',
            progress: 75,
            theory: {
              intro: 'A simple pendulum consists of a point mass suspended from a frictionless pivot by an inextensible string. Under small angular displacement, the bob undergoes simple harmonic motion.',
              objectives: [
                'Verify the relationship between pendulum period T and string length L.',
                'Calculate local gravitational acceleration g from T² vs L linear slope.'
              ],
              keyFormula: 'T = 2 \\pi \\sqrt{\\frac{L}{g}}'
            },
            apparatus: [
              { name: 'Brass Pendulum Bob (50g)', qty: '1 unit' },
              { name: 'Inextensible Thread', qty: '1.5 meters' },
              { name: 'Precision Digital Stopwatch', qty: '1 unit' },
              { name: 'Vertical Meter Scale', qty: '1 unit' }
            ],
            sim: { type: 'pendulum' },
            quiz: [
              {
                question: 'How does doubling the string length L affect the period T of a simple pendulum?',
                options: ['Period doubles', 'Period increases by factor of √2', 'Period halves', 'Period remains unchanged'],
                correctIndex: 1
              },
              {
                question: 'Does changing the mass of the pendulum bob alter the period of small oscillation?',
                options: ['Yes, heavier bobs swing slower', 'No, period is independent of bob mass', 'Yes, heavier bobs swing faster', 'Only at high temperatures'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'phy-02',
            tag: 'PH·02',
            title: 'Projectile Motion Kinematics',
            desc: 'Analyze launch velocity and launch angle relationships to measure total horizontal range R and maximum height H.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Projectile motion is two-dimensional motion under constant gravitational acceleration g. The horizontal motion has constant velocity, while vertical motion undergoes free fall.',
              objectives: [
                'Measure range R and peak height H for launch angles between 15° and 75°.',
                'Verify maximum horizontal range occurs at 45° launch angle.'
              ],
              keyFormula: 'Range = \\frac{v^2 \\sin(2\\theta)}{g}, \\quad H_{max} = \\frac{(v \\sin\\theta)^2}{2g}'
            },
            apparatus: [
              { name: 'Ballistic Spring Launcher', qty: '1 unit' },
              { name: 'Photogate Speed Sensor', qty: '2 units' },
              { name: 'Carbon Impact Paper Target', qty: '1 sheet' },
              { name: 'Digital Angle Protractor', qty: '1 unit' }
            ],
            sim: { type: 'projectile' },
            quiz: [
              {
                question: 'At what launch angle θ does a projectile achieve maximum horizontal range R in vacuum?',
                options: ['30°', '45°', '60°', '90°'],
                correctIndex: 1
              },
              {
                question: 'Complementary launch angles (e.g. 30° and 60°) with identical initial velocity yield:',
                options: ['Equal maximum height', 'Equal horizontal range', 'Equal time of flight', 'Zero velocity at impact'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'phy-03',
            tag: 'PH·03',
            title: 'Newton’s Rings & Light Wavelength',
            desc: 'Observe interference fringe patterns between a plano-convex lens and glass plate to measure sodium light wavelength λ.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Newton’s rings are concentric circular interference fringes formed by thin air film thickness variations between a spherical and flat optical surface.',
              objectives: ['Measure ring diameters using travelling microscope.', 'Calculate sodium light wavelength λ.'],
              keyFormula: '\\lambda = \\frac{D_{n+m}^2 - D_n^2}{4m R}'
            },
            apparatus: [
              { name: 'Plano-Convex Lens (R=100cm)', qty: '1 unit' },
              { name: 'Sodium Vapor Lamp (589 nm)', qty: '1 unit' },
              { name: 'Travelling Microscope (0.01mm resolution)', qty: '1 unit' }
            ],
            sim: { type: 'pendulum' },
            quiz: [
              {
                question: 'Why is the central spot of Newton’s rings pattern dark in reflected light?',
                options: ['Zero path difference', 'Phase shift of π upon reflection at denser medium', 'Complete absorption', 'Refraction loss'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'phy-04',
            tag: 'PH·04',
            title: 'Semiconductor Energy Band Gap',
            desc: 'Measure reverse saturation current across a PN junction diode as a function of temperature to determine band gap Eg.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'The energy band gap Eg is the energy difference between top of valence band and bottom of conduction band in semiconductors.',
              objectives: ['Record diode reverse current vs temperature.', 'Calculate Eg from ln(I0) vs 1000/T slope.'],
              keyFormula: 'I_0 = B \\cdot T^3 \\exp\\left(-\\frac{E_g}{k T}\\right)'
            },
            apparatus: [
              { name: 'Germanium / Silicon Diode Kit', qty: '1 unit' },
              { name: 'Micro-Oven with Temperature Control', qty: '1 unit' },
              { name: 'Micro-Ammeter & Thermocouple', qty: '1 unit' }
            ],
            sim: { type: 'pendulum' },
            quiz: [
              {
                question: 'What is the typical energy band gap value Eg for Germanium (Ge) at room temperature?',
                options: ['0.72 eV', '1.12 eV', '1.43 eV', '3.00 eV'],
                correctIndex: 0
              }
            ]
          },
          {
            id: 'phy-05',
            tag: 'PH·05',
            title: 'Torsional Pendulum & Modulus of Rigidity',
            desc: 'Measure torsional oscillation periods for metallic wires to calculate rigidity modulus η.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'A torsional pendulum consists of a rigid body suspended by a wire which executes rotational simple harmonic motion when twisted.',
              objectives: ['Measure period of torsional oscillation.', 'Calculate wire rigidity modulus η.'],
              keyFormula: '\\eta = \\frac{8 \\pi I L}{T^2 r^4}'
            },
            apparatus: [
              { name: 'Torsional Pendulum Rig', qty: '1 unit' },
              { name: 'Steel Wire Samples', qty: '1 set' },
              { name: 'Screw Gauge & Vernier Callipers', qty: '1 set' }
            ],
            sim: { type: 'pendulum' },
            quiz: [
              {
                question: 'Modulus of rigidity η represents a material’s resistance to:',
                options: ['Volume compression', 'Shearing / Torsional deformation', 'Linear stretching', 'Thermal expansion'],
                correctIndex: 1
              }
            ]
          }
        ]
      },
      elec: {
        id: 'elec',
        name: 'Electrical Lab (BEEE)',
        tag: 'ELECTRICAL',
        color: '#F0B33E',
        desc: 'Ohm’s law, Kirchhoff’s circuit laws, series/parallel resistor networks, and AC frequency response.',
        total: 5,
        completed: 4,
        experiments: [
          {
            id: 'ee-01',
            tag: 'EE·01',
            title: 'Ohm’s Law & Series–Parallel Resistor Networks',
            desc: 'Verify voltage-current proportionality and measure equivalent resistance in series and parallel circuit configurations.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Ohm’s law states that current I through a conductor between two points is directly proportional to voltage V across the two points and inversely proportional to resistance R.',
              objectives: [
                'Verify linear V-I relationship across fixed resistors.',
                'Calculate equivalent resistance R_eq for series and parallel networks.'
              ],
              keyFormula: 'I = \\frac{V}{R}, \\quad R_{series} = R_1 + R_2, \\quad R_{parallel} = \\frac{R_1 R_2}{R_1 + R_2}'
            },
            apparatus: [
              { name: 'Regulated DC Power Supply (0-30V)', qty: '1 unit' },
              { name: 'Digital Multimeter (Voltage/Current)', qty: '2 units' },
              { name: 'Precision Resistors (100Ω, 220Ω, 470Ω)', qty: '1 set' },
              { name: 'Breadboard & Jumper Wires', qty: '1 set' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'What is the equivalent resistance of two 100 Ω resistors connected in parallel?',
                options: ['200 Ω', '100 Ω', '50 Ω', '25 Ω'],
                correctIndex: 2
              },
              {
                question: 'If voltage across a 20 Ω resistor is increased from 10 V to 20 V, what happens to the current?',
                options: ['Current doubles from 0.5 A to 1.0 A', 'Current halves to 0.25 A', 'Current quadruples', 'Current remains unchanged'],
                correctIndex: 0
              }
            ]
          },
          {
            id: 'ee-02',
            tag: 'EE·02',
            title: 'Kirchhoff’s Voltage & Current Laws (KVL/KCL)',
            desc: 'Verify algebraic sum of voltages around closed loops and currents at node junctions in multi-loop circuits.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Kirchhoff’s Current Law (KCL) states total current entering a node equals total current leaving. Kirchhoff’s Voltage Law (KVL) states directed sum of potential differences around any closed loop is zero.',
              objectives: ['Verify KCL node current balance.', 'Verify KVL loop voltage conservation.'],
              keyFormula: '\\sum I_{node} = 0, \\quad \\sum V_{loop} = 0'
            },
            apparatus: [
              { name: 'Dual Tracking DC Power Supply', qty: '1 unit' },
              { name: 'Resistor Network Board', qty: '1 unit' },
              { name: 'Digital Ammeters', qty: '3 units' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'Kirchhoff’s Current Law (KCL) is a direct consequence of the conservation of:',
                options: ['Energy', 'Electric Charge', 'Linear Momentum', 'Magnetic Flux'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ee-03',
            tag: 'EE·03',
            title: 'RLC Series Resonance & Quality Factor',
            desc: 'Investigate frequency response of RLC circuits to measure resonant frequency fr and circuit quality factor Q.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'In an RLC series circuit, resonance occurs when inductive reactance XL equals capacitive reactance XC, causing circuit impedance to reach minimum R.',
              objectives: ['Determine resonant frequency fr.', 'Plot current vs frequency response curve and calculate Q factor.'],
              keyFormula: 'f_r = \\frac{1}{2 \\pi \\sqrt{L C}}, \\quad Q = \\frac{1}{R} \\sqrt{\\frac{L}{C}}'
            },
            apparatus: [
              { name: 'Function Generator (1Hz - 1MHz)', qty: '1 unit' },
              { name: 'Inductor (10mH), Capacitor (0.1µF), Resistor (100Ω)', qty: '1 set' },
              { name: 'Dual Channel Oscilloscope', qty: '1 unit' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'At series resonance in an RLC circuit, the net impedance Z of the circuit is equal to:',
                options: ['Zero', 'Purely resistance R', 'Purely inductive XL', 'Infinite'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ee-04',
            tag: 'EE·04',
            title: 'Single-Phase Transformer OC & SC Tests',
            desc: 'Perform open-circuit and short-circuit tests to determine core losses, copper losses, and equivalent circuit parameters.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Open-circuit test yields core losses (hysteresis and eddy current), while short-circuit test yields full-load copper losses and winding impedances.',
              objectives: ['Calculate core loss resistance Rc and magnetizing reactance Xm.', 'Determine transformer efficiency at full load.'],
              keyFormula: '\\eta = \\frac{V_2 I_2 \\cos\\phi}{V_2 I_2 \\cos\\phi + P_{core} + P_{cu}} \\times 100\\%'
            },
            apparatus: [
              { name: '1 kVA 230V/115V Single-Phase Transformer', qty: '1 unit' },
              { name: 'Single-Phase Auto-Transformer (Variac)', qty: '1 unit' },
              { name: 'Low Power Factor Wattmeters', qty: '2 units' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'Why is the Open-Circuit (OC) test conducted at rated voltage on the low-voltage side?',
                options: ['To measure copper losses', 'To measure core losses safely at low voltage', 'To test insulation breakdown', 'To check mechanical vibration'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ee-05',
            tag: 'EE·05',
            title: 'DC Shunt Motor Speed Control & Torque',
            desc: 'Control DC motor speed via armature voltage control and field flux weakening, plotting torque-speed curves.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'DC motor speed N is directly proportional to back EMF Eb and inversely proportional to main field flux Φ.',
              objectives: ['Plot N vs armature voltage V.', 'Plot N vs field current If for flux weakening control.'],
              keyFormula: 'N = k \\cdot \\frac{V - I_a R_a}{\\Phi}'
            },
            apparatus: [
              { name: '220V DC Shunt Motor Rig', qty: '1 unit' },
              { name: 'Field & Armature Rheostats', qty: '2 units' },
              { name: 'Optical Non-Contact Tachometer', qty: '1 unit' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'Weakening the main magnetic field flux Φ in a DC shunt motor causes the motor speed N to:',
                options: ['Decrease', 'Increase above rated speed', 'Drop to zero', 'Reverse rotation direction'],
                correctIndex: 1
              }
            ]
          }
        ]
      }
    }
  };

  // State Engine
  const state = {
    currentView: 'dashboard',
    currentSubject: null,
    currentExp: null,
    activeTab: 'theory',
    trials: {},
    quizAnswers: {}
  };

  /**
   * Main App Initializer
   */
  function init() {
    bindEvents();
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
  }

  /**
   * Binds UI interactions & navigation listeners
   */
  function bindEvents() {
    // Sidebar Navigation Click
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view === 'dashboard' || view === 'profile') {
          navigateTo(view);
        } else if (appData.subjects[view]) {
          navigateToSubject(view);
        }
      });
    });

    // Profile Chip Click in Top Bar
    const profileChip = document.getElementById('profileChip');
    if (profileChip) {
      profileChip.addEventListener('click', () => navigateTo('profile'));
    }
  }

  /**
   * Router to switch between main views
   * @param {string} viewName 
   */
  function navigateTo(viewName) {
    state.currentView = viewName;
    state.currentSubject = null;
    state.currentExp = null;

    // Toggle active classes on view containers
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) targetView.classList.add('active');

    // Update sidebar nav items
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === viewName);
    });

    // Update Breadcrumb
    updateBreadcrumb([
      { name: 'Dashboard', hash: '#dashboard' },
      { name: viewName === 'profile' ? 'My Profile' : 'Overview', hash: `#${viewName}` }
    ]);

    if (viewName === 'dashboard') renderDashboardView();
    if (viewName === 'profile') renderProfileView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Router to view a specific Subject page
   * @param {string} subjectKey 
   */
  function navigateToSubject(subjectKey) {
    const subject = appData.subjects[subjectKey];
    if (!subject) return;

    state.currentView = 'subject';
    state.currentSubject = subjectKey;
    state.currentExp = null;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById('view-subject');
    if (targetView) targetView.classList.add('active');

    // Update nav active item
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === subjectKey);
    });

    updateBreadcrumb([
      { name: 'Dashboard', hash: '#dashboard' },
      { name: subject.name, hash: `#subject/${subjectKey}` }
    ]);

    renderSubjectView(subject);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Router to view an Experiment Detail Workbench
   * @param {string} subjectKey 
   * @param {string} expId 
   */
  function navigateToExperiment(subjectKey, expId) {
    const subject = appData.subjects[subjectKey];
    if (!subject) return;
    const exp = subject.experiments.find(e => e.id === expId);
    if (!exp) return;

    state.currentView = 'experiment';
    state.currentSubject = subjectKey;
    state.currentExp = expId;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById('view-experiment');
    if (targetView) targetView.classList.add('active');

    // Update nav active item
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === subjectKey);
    });

    updateBreadcrumb([
      { name: 'Dashboard', hash: '#dashboard' },
      { name: subject.name, hash: `#subject/${subjectKey}` },
      { name: exp.tag, hash: `#exp/${subjectKey}/${expId}` }
    ]);

    renderExperimentWorkbench(subject, exp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Handles Hash-based client-side routing
   */
  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '');
    if (!hash || hash === 'dashboard') {
      navigateTo('dashboard');
    } else if (hash === 'profile') {
      navigateTo('profile');
    } else if (hash.startsWith('subject/')) {
      const parts = hash.split('/');
      navigateToSubject(parts[1]);
    } else if (hash.startsWith('exp/')) {
      const parts = hash.split('/');
      navigateToExperiment(parts[1], parts[2]);
    } else if (appData.subjects[hash]) {
      navigateToSubject(hash);
    }
  }

  /**
   * Updates Top Bar Breadcrumb
   */
  function updateBreadcrumb(crumbs) {
    const container = document.getElementById('breadcrumbContainer');
    if (!container) return;

    container.innerHTML = crumbs.map((crumb, idx) => {
      const isLast = idx === crumbs.length - 1;
      return `<span class="breadcrumb-crumb ${isLast ? 'active' : ''}">${crumb.name}</span>` +
        (!isLast ? `<span class="breadcrumb-separator">/</span>` : '');
    }).join('');
  }

  /**
   * Renders Dashboard Home View
   */
  function renderDashboardView() {
    const container = document.getElementById('view-dashboard');
    if (!container) return;

    const s = appData.student;
    container.innerHTML = `
      <div class="welcome-header">
        <h1 class="welcome-title">Welcome back, ${s.firstName} 👋</h1>
        <p class="welcome-subtitle">Select a subject bench to perform interactive simulations and verify lab calculations.</p>
      </div>

      <!-- Key Stat Row -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label mono">Completed Experiments</div>
          <div class="stat-value">${s.stats.completedCount}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label mono">Quizzes Attempted</div>
          <div class="stat-value">${s.stats.quizzesAttempted}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label mono">Average Score</div>
          <div class="stat-value">${s.stats.avgScore}%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label mono">Hours in Lab</div>
          <div class="stat-value">${s.stats.hoursLogged}h</div>
        </div>
      </div>

      <!-- Subject Selection (3 Large Cards) -->
      <h2 class="section-title">Select Lab Bench</h2>
      <div class="subject-grid">
        ${Object.values(appData.subjects).map(sub => `
          <div class="subject-card" data-subject="${sub.id}">
            <div>
              <div class="subject-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${sub.id === 'chem' ? '<path d="M9 2v6l-5 8a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-8V2"/><path d="M7 2h10"/>' :
                    sub.id === 'phy' ? '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>' :
                    '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'}
                </svg>
              </div>
              <h3 class="subject-name">${sub.name}</h3>
              <p class="subject-desc">${sub.desc}</p>
            </div>
            <div>
              <div class="subject-progress-row">
                <div class="progress-info mono">
                  <span>Progress</span>
                  <span>${sub.completed} of ${sub.total} completed</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" style="width: ${(sub.completed / sub.total) * 100}%"></div>
                </div>
              </div>
              <button class="btn-open-subject" onclick="window.location.hash='#subject/${sub.id}'">Open Bench &rarr;</button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Continue Where You Left Off -->
      <h2 class="section-title">Continue Where You Left Off</h2>
      <div class="continue-list">
        ${getInProgressExperiments().map(exp => `
          <div class="continue-card">
            <div class="continue-info">
              <div class="continue-tag-row">
                <span class="tag-pill mono" data-subject="${exp.subjectKey}">${exp.tag}</span>
                <span class="status-pill in-progress mono">In Progress (${exp.progress}%)</span>
              </div>
              <h4 class="continue-title">${exp.title}</h4>
            </div>
            <button class="btn-resume" onclick="window.location.hash='#exp/${exp.subjectKey}/${exp.id}'">Resume &rarr;</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Helper to retrieve in-progress experiments
   */
  function getInProgressExperiments() {
    const list = [];
    Object.values(appData.subjects).forEach(sub => {
      sub.experiments.forEach(exp => {
        if (exp.status === 'in-progress') {
          list.push({ ...exp, subjectKey: sub.id });
        }
      });
    });
    return list;
  }

  /**
   * Renders Subject Grid View
   */
  function renderSubjectView(subject) {
    const container = document.getElementById('view-subject');
    if (!container) return;

    container.innerHTML = `
      <div class="subject-header-banner">
        <div class="subject-banner-content">
          <p class="subject-banner-tag mono">${subject.tag} DIVISION</p>
          <h1 class="subject-banner-title">${subject.name}</h1>
          <p class="subject-banner-desc">${subject.desc}</p>
        </div>
      </div>

      <div class="exp-grid">
        ${subject.experiments.map(exp => `
          <div class="exp-card">
            <div>
              <div class="exp-card-header">
                <span class="tag-pill mono" data-subject="${subject.id}">${exp.tag}</span>
                <span class="status-pill ${exp.status} mono">${exp.status.replace('-', ' ')}</span>
              </div>
              <h3 class="exp-card-title">${exp.title}</h3>
              <p class="exp-card-desc">${exp.desc}</p>
            </div>
            <div>
              <button class="btn-start-exp" onclick="window.location.hash='#exp/${subject.id}/${exp.id}'">
                ${exp.status === 'completed' ? 'Review Bench &rarr;' : exp.status === 'in-progress' ? 'Resume Lab &rarr;' : 'Start Experiment &rarr;'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Renders Experiment Detail Workbench
   */
  function renderExperimentWorkbench(subject, exp) {
    const container = document.getElementById('view-experiment');
    if (!container) return;

    state.activeTab = 'theory';

    container.innerHTML = `
      <div class="exp-header">
        <div class="exp-nav-back mono" onclick="window.location.hash='#subject/${subject.id}'">&larr; Back to ${subject.name}</div>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
          <span class="tag-pill mono" data-subject="${subject.id}">${exp.tag}</span>
          <span class="status-pill ${exp.status} mono">${exp.status.replace('-', ' ')}</span>
        </div>
        <h1 class="exp-headline">${exp.title}</h1>
      </div>

      <!-- Tab Bar -->
      <div class="tab-bar">
        <button class="tab-btn active" data-tab="theory" onclick="selectExpTab('theory')">Theory</button>
        <button class="tab-btn" data-tab="apparatus" onclick="selectExpTab('apparatus')">Apparatus</button>
        <button class="tab-btn" data-tab="perform" onclick="selectExpTab('perform')">Perform Experiment</button>
        <button class="tab-btn" data-tab="quiz" onclick="selectExpTab('quiz')">Quiz</button>
      </div>

      <!-- Tab Content Containers -->
      <div id="tab-theory" class="tab-content active">
        <div class="theory-wrap">
          <p class="theory-intro">${exp.theory.intro}</p>
          <h3 class="section-subhead">Learning Objectives</h3>
          <ul class="objectives-list">
            ${exp.theory.objectives.map(obj => `<li>${obj}</li>`).join('')}
          </ul>
          <div class="key-relation-box">
            <div class="key-relation-title mono">KEY RELATION / GOVERNING EQUATION</div>
            <div class="key-relation-formula mono">${exp.theory.keyFormula}</div>
          </div>
        </div>
      </div>

      <div id="tab-apparatus" class="tab-content">
        <div class="apparatus-grid">
          ${exp.apparatus.map(app => `
            <div class="apparatus-card">
              <div class="apparatus-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M2 12h20"/>
                </svg>
              </div>
              <div>
                <h4 class="apparatus-name">${app.name}</h4>
                <p class="apparatus-qty mono">Required: ${app.qty}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div id="tab-perform" class="tab-content">
        ${renderSimulationEngine(subject, exp)}
      </div>

      <div id="tab-quiz" class="tab-content">
        ${renderQuizEngine(subject, exp)}
      </div>
    `;

    // Initialize Simulation controls & canvas
    initSimulationEngine(exp);
  }

  /**
   * Switches Workbench Tabs
   */
  function selectExpTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.toggle('active', c.id === `tab-${tabName}`);
    });
  }

  /**
   * Renders Interactive Simulation HTML Template
   */
  function renderSimulationEngine(subject, exp) {
    const simType = exp.sim.type;

    if (simType === 'titration') {
      return `
        <div class="sim-workbench">
          <div class="sim-controls-panel">
            <h3 class="section-subhead">Burette & Solution Parameters</h3>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">NaOH Titrant Added:</span>
                <span class="sim-value" id="titrantVal">0.0 mL</span>
              </div>
              <input type="range" class="sim-slider" id="titrantSlider" min="0" max="40" step="0.5" value="0" oninput="updateTitrationSim()">
            </div>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Analyte HCl Volume:</span>
                <span class="sim-value">25.0 mL</span>
              </div>
            </div>
            <div class="sim-control-group">
              <label class="sim-label" style="display:block; margin-bottom: 8px;">Indicator:</label>
              <select class="sim-select" id="indicatorSelect" onchange="updateTitrationSim()">
                <option value="phenolphthalein">Phenolphthalein (pH 8.2 - 10.0)</option>
              </select>
            </div>
            <button class="btn-record-reading" onclick="recordTrialReading('${exp.id}')">Record Reading</button>
          </div>

          <div class="sim-visualizer">
            <div class="sim-canvas-area">
              <!-- Animated Flask & Solution -->
              <div id="flaskVisual" style="width: 140px; height: 160px; border: 3px solid rgba(251,250,245,0.4); border-radius: 10px 10px 40px 40px; position: relative; background: rgba(255,255,255,0.05); display: flex; align-items: flex-end; padding: 6px;">
                <div id="liquidFill" style="width: 100%; height: 50%; background: rgba(251,250,245,0.15); border-radius: 0 0 34px 34px; transition: background 0.3s ease;"></div>
              </div>
            </div>
            <div class="readout-panel">
              <div class="readout-item">
                <div class="readout-label mono">SOLUTION pH</div>
                <div class="readout-val" id="phVal">1.00</div>
              </div>
              <div class="readout-item">
                <div class="readout-label mono">EQUIVALENCE STATE</div>
                <div class="readout-val" id="equivState">Acidic</div>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <h3 class="section-subhead">Recorded Trials Log</h3>
          <table class="trials-table">
            <thead>
              <tr>
                <th>Trial #</th>
                <th>NaOH Volume (mL)</th>
                <th>Calculated pH</th>
                <th>Indicator Color</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="trialLogBody">
              <tr><td colspan="5" style="text-align: center; color: var(--ink-soft);">No readings recorded yet. Use "Record Reading" to log trials.</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }

    if (simType === 'pendulum') {
      return `
        <div class="sim-workbench">
          <div class="sim-controls-panel">
            <h3 class="section-subhead">Pendulum Parameters</h3>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">String Length (L):</span>
                <span class="sim-value" id="lengthVal">1.00 m</span>
              </div>
              <input type="range" class="sim-slider" id="lengthSlider" min="0.2" max="2.0" step="0.05" value="1.0" oninput="updatePendulumSim()">
            </div>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Gravity (g):</span>
                <span class="sim-value">9.81 m/s²</span>
              </div>
            </div>
            <button class="btn-record-reading" onclick="recordTrialReading('${exp.id}')">Record Reading</button>
          </div>

          <div class="sim-visualizer">
            <div class="sim-canvas-area" style="flex-direction: column;">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <line x1="100" y1="20" x2="100" y2="150" stroke="#9C8CF0" stroke-width="2" id="pendulumLine"/>
                <circle cx="100" cy="150" r="14" fill="#9C8CF0" id="pendulumBob"/>
              </svg>
            </div>
            <div class="readout-panel">
              <div class="readout-item">
                <div class="readout-label mono">PERIOD (T)</div>
                <div class="readout-val" id="periodVal">2.01 s</div>
              </div>
              <div class="readout-item">
                <div class="readout-label mono">FREQUENCY (f)</div>
                <div class="readout-val" id="freqVal">0.50 Hz</div>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <h3 class="section-subhead">Recorded Trials Log</h3>
          <table class="trials-table">
            <thead>
              <tr>
                <th>Trial #</th>
                <th>Length L (m)</th>
                <th>Period T (s)</th>
                <th>Frequency (Hz)</th>
                <th>Calculated g (m/s²)</th>
              </tr>
            </thead>
            <tbody id="trialLogBody">
              <tr><td colspan="5" style="text-align: center; color: var(--ink-soft);">No readings recorded yet. Use "Record Reading" to log trials.</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }

    if (simType === 'projectile') {
      return `
        <div class="sim-workbench">
          <div class="sim-controls-panel">
            <h3 class="section-subhead">Kinematic Launch Parameters</h3>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Launch Velocity (v):</span>
                <span class="sim-value" id="velVal">25.0 m/s</span>
              </div>
              <input type="range" class="sim-slider" id="velSlider" min="5" max="50" step="1" value="25" oninput="updateProjectileSim()">
            </div>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Launch Angle (θ):</span>
                <span class="sim-value" id="angleVal">45°</span>
              </div>
              <input type="range" class="sim-slider" id="angleSlider" min="15" max="75" step="1" value="45" oninput="updateProjectileSim()">
            </div>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Gravity (g):</span>
                <span class="sim-value">9.81 m/s²</span>
              </div>
            </div>
            <button class="btn-record-reading" onclick="recordTrialReading('${exp.id}')">Record Reading</button>
          </div>

          <div class="sim-visualizer">
            <div class="sim-canvas-area">
              <svg width="240" height="180" viewBox="0 0 240 180">
                <path d="M 20 160 Q 120 20 220 160" fill="none" stroke="#9C8CF0" stroke-width="2.5" stroke-dasharray="4 3" id="trajPath"/>
                <line x1="15" y1="160" x2="225" y2="160" stroke="rgba(251,250,245,0.4)" stroke-width="1.5"/>
                <circle cx="220" cy="160" r="6" fill="#F0B33E" id="impactPoint"/>
              </svg>
            </div>
            <div class="readout-panel">
              <div class="readout-item">
                <div class="readout-label mono">HORIZONTAL RANGE (R)</div>
                <div class="readout-val" id="rangeVal">63.7 m</div>
              </div>
              <div class="readout-item">
                <div class="readout-label mono">MAX HEIGHT (H)</div>
                <div class="readout-val" id="hMaxVal">15.9 m</div>
              </div>
              <div class="readout-item">
                <div class="readout-label mono">FLIGHT TIME (t)</div>
                <div class="readout-val" id="flightTimeVal">3.60 s</div>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <h3 class="section-subhead">Recorded Trials Log</h3>
          <table class="trials-table">
            <thead>
              <tr>
                <th>Trial #</th>
                <th>Velocity (m/s)</th>
                <th>Angle (°)</th>
                <th>Range R (m)</th>
                <th>Max Height H (m)</th>
                <th>Flight Time (s)</th>
              </tr>
            </thead>
            <tbody id="trialLogBody">
              <tr><td colspan="6" style="text-align: center; color: var(--ink-soft);">No readings recorded yet. Use "Record Reading" to log trials.</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }

    if (simType === 'ohms') {
      return `
        <div class="sim-workbench">
          <div class="sim-controls-panel">
            <h3 class="section-subhead">Circuit Parameters</h3>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Supply Voltage (V):</span>
                <span class="sim-value" id="voltVal">12.0 V</span>
              </div>
              <input type="range" class="sim-slider" id="voltSlider" min="1" max="30" step="0.5" value="12" oninput="updateOhmsSim()">
            </div>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Resistor R1:</span>
                <span class="sim-value" id="r1Val">100 Ω</span>
              </div>
              <input type="range" class="sim-slider" id="r1Slider" min="10" max="500" step="10" value="100" oninput="updateOhmsSim()">
            </div>
            <div class="sim-control-group">
              <div class="sim-label-row">
                <span class="sim-label">Resistor R2:</span>
                <span class="sim-value" id="r2Val">200 Ω</span>
              </div>
              <input type="range" class="sim-slider" id="r2Slider" min="10" max="500" step="10" value="200" oninput="updateOhmsSim()">
            </div>
            <div class="sim-control-group">
              <label class="sim-label" style="display:block; margin-bottom: 8px;">Network Connection:</label>
              <select class="sim-select" id="configSelect" onchange="updateOhmsSim()">
                <option value="series">Series (R_eq = R1 + R2)</option>
                <option value="parallel">Parallel (R_eq = R1×R2 / R1+R2)</option>
              </select>
            </div>
            <button class="btn-record-reading" onclick="recordTrialReading('${exp.id}')">Record Reading</button>
          </div>

          <div class="sim-visualizer">
            <div class="sim-canvas-area">
              <div style="font-family: var(--font-mono); text-align: center; color: var(--electrical);">
                <div style="font-size: 2.2rem; font-weight: 700;" id="reqVal">300 Ω</div>
                <div style="font-size: 0.8rem; color: rgba(251,250,245,0.6);">EQUIVALENT RESISTANCE</div>
              </div>
            </div>
            <div class="readout-panel">
              <div class="readout-item">
                <div class="readout-label mono">TOTAL CURRENT (I)</div>
                <div class="readout-val" id="currentVal">0.040 A</div>
              </div>
              <div class="readout-item">
                <div class="readout-label mono">POWER DISSIPATION</div>
                <div class="readout-val" id="powerVal">0.48 W</div>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <h3 class="section-subhead">Recorded Trials Log</h3>
          <table class="trials-table">
            <thead>
              <tr>
                <th>Trial #</th>
                <th>Voltage V (V)</th>
                <th>Config</th>
                <th>Equiv R (Ω)</th>
                <th>Current I (A)</th>
              </tr>
            </thead>
            <tbody id="trialLogBody">
              <tr><td colspan="5" style="text-align: center; color: var(--ink-soft);">No readings recorded yet. Use "Record Reading" to log trials.</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }

    return `<p>Simulation engine loading...</p>`;
  }

  /**
   * Initializes dynamic simulation calculations
   */
  function initSimulationEngine(exp) {
    if (exp.sim.type === 'titration') window.updateTitrationSim();
    if (exp.sim.type === 'pendulum') window.updatePendulumSim();
    if (exp.sim.type === 'projectile') window.updateProjectileSim();
    if (exp.sim.type === 'ohms') window.updateOhmsSim();
  }

  /**
   * Titration Simulation Calculation
   */
  window.updateTitrationSim = function () {
    const slider = document.getElementById('titrantSlider');
    const valDisplay = document.getElementById('titrantVal');
    const phVal = document.getElementById('phVal');
    const equivState = document.getElementById('equivState');
    const liquidFill = document.getElementById('liquidFill');
    if (!slider) return;

    const vNaOH = parseFloat(slider.value);
    valDisplay.textContent = `${vNaOH.toFixed(1)} mL`;

    let ph = 1.0;
    if (vNaOH < 25) {
      ph = 1.0 + (vNaOH / 25) * 1.5;
      equivState.textContent = 'Acidic';
      if (liquidFill) liquidFill.style.background = 'rgba(251,250,245,0.15)';
    } else if (vNaOH === 25) {
      ph = 7.0;
      equivState.textContent = 'Equivalence Point!';
      if (liquidFill) liquidFill.style.background = 'rgba(55, 183, 160, 0.4)';
    } else {
      ph = 11.5 + ((vNaOH - 25) / 15) * 1.5;
      equivState.textContent = 'Alkaline';
      if (liquidFill) liquidFill.style.background = 'rgba(55, 183, 160, 0.75)';
    }

    if (phVal) phVal.textContent = ph.toFixed(2);
  };

  /**
   * Pendulum Simulation Calculation
   */
  window.updatePendulumSim = function () {
    const slider = document.getElementById('lengthSlider');
    const display = document.getElementById('lengthVal');
    const periodVal = document.getElementById('periodVal');
    const freqVal = document.getElementById('freqVal');
    if (!slider) return;

    const L = parseFloat(slider.value);
    display.textContent = `${L.toFixed(2)} m`;

    const g = 9.81;
    const T = 2 * Math.PI * Math.sqrt(L / g);
    const f = 1 / T;

    if (periodVal) periodVal.textContent = `${T.toFixed(2)} s`;
    if (freqVal) freqVal.textContent = `${f.toFixed(2)} Hz`;
  };

  /**
   * Projectile Motion Simulation Calculation
   */
  window.updateProjectileSim = function () {
    const velSlider = document.getElementById('velSlider');
    const angleSlider = document.getElementById('angleSlider');
    if (!velSlider || !angleSlider) return;

    const v = parseFloat(velSlider.value);
    const thetaDeg = parseFloat(angleSlider.value);
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const g = 9.81;

    document.getElementById('velVal').textContent = `${v.toFixed(1)} m/s`;
    document.getElementById('angleVal').textContent = `${thetaDeg.toFixed(0)}°`;

    const R = (Math.pow(v, 2) * Math.sin(2 * thetaRad)) / g;
    const H = Math.pow(v * Math.sin(thetaRad), 2) / (2 * g);
    const t = (2 * v * Math.sin(thetaRad)) / g;

    document.getElementById('rangeVal').textContent = `${R.toFixed(1)} m`;
    document.getElementById('hMaxVal').textContent = `${H.toFixed(1)} m`;
    document.getElementById('flightTimeVal').textContent = `${t.toFixed(2)} s`;
  };

  /**
   * Ohm's Law Simulation Calculation
   */
  window.updateOhmsSim = function () {
    const voltSlider = document.getElementById('voltSlider');
    const r1Slider = document.getElementById('r1Slider');
    const r2Slider = document.getElementById('r2Slider');
    const configSelect = document.getElementById('configSelect');

    if (!voltSlider || !r1Slider || !r2Slider) return;

    const V = parseFloat(voltSlider.value);
    const R1 = parseFloat(r1Slider.value);
    const R2 = parseFloat(r2Slider.value);
    const isSeries = configSelect.value === 'series';

    document.getElementById('voltVal').textContent = `${V.toFixed(1)} V`;
    document.getElementById('r1Val').textContent = `${R1} Ω`;
    document.getElementById('r2Val').textContent = `${R2} Ω`;

    const Req = isSeries ? (R1 + R2) : ((R1 * R2) / (R1 + R2));
    const I = V / Req;
    const P = V * I;

    document.getElementById('reqVal').textContent = `${Req.toFixed(1)} Ω`;
    document.getElementById('currentVal').textContent = `${I.toFixed(3)} A`;
    document.getElementById('powerVal').textContent = `${P.toFixed(2)} W`;
  };

  /**
   * Trial Recording Logger
   */
  window.recordTrialReading = function (expId) {
    if (!state.trials[expId]) state.trials[expId] = [];
    const trials = state.trials[expId];
    const tbody = document.getElementById('trialLogBody');

    if (expId.startsWith('ch-')) {
      const v = document.getElementById('titrantSlider').value;
      const ph = document.getElementById('phVal').textContent;
      const color = parseFloat(v) >= 25 ? 'Teal / Pink' : 'Colorless';
      trials.push({ num: trials.length + 1, v, ph, color, status: 'Logged' });

      tbody.innerHTML = trials.map(t => `
        <tr>
          <td>#${t.num}</td>
          <td>${t.v} mL</td>
          <td>${t.ph}</td>
          <td>${t.color}</td>
          <td><span class="status-pill completed mono">Valid</span></td>
        </tr>
      `).join('');
    } else if (expId === 'phy-01' || expId.startsWith('phy-03') || expId.startsWith('phy-04') || expId.startsWith('phy-05')) {
      const L = document.getElementById('lengthSlider').value;
      const T = document.getElementById('periodVal').textContent;
      const f = document.getElementById('freqVal').textContent;
      trials.push({ num: trials.length + 1, L, T, f, g: '9.81' });

      tbody.innerHTML = trials.map(t => `
        <tr>
          <td>#${t.num}</td>
          <td>${t.L} m</td>
          <td>${t.T}</td>
          <td>${t.f}</td>
          <td>9.81 m/s²</td>
        </tr>
      `).join('');
    } else if (expId === 'phy-02') {
      const v = document.getElementById('velSlider').value;
      const angle = document.getElementById('angleSlider').value;
      const R = document.getElementById('rangeVal').textContent;
      const H = document.getElementById('hMaxVal').textContent;
      const t = document.getElementById('flightTimeVal').textContent;
      trials.push({ num: trials.length + 1, v, angle, R, H, t });

      tbody.innerHTML = trials.map(tr => `
        <tr>
          <td>#${tr.num}</td>
          <td>${tr.v} m/s</td>
          <td>${tr.angle}°</td>
          <td>${tr.R}</td>
          <td>${tr.H}</td>
          <td>${tr.t}</td>
        </tr>
      `).join('');
    } else if (expId.startsWith('ee-')) {
      const V = document.getElementById('voltSlider').value;
      const config = document.getElementById('configSelect').value;
      const Req = document.getElementById('reqVal').textContent;
      const I = document.getElementById('currentVal').textContent;
      trials.push({ num: trials.length + 1, V, config, Req, I });

      tbody.innerHTML = trials.map(t => `
        <tr>
          <td>#${t.num}</td>
          <td>${t.V} V</td>
          <td>${t.config.toUpperCase()}</td>
          <td>${t.Req}</td>
          <td>${t.I}</td>
        </tr>
      `).join('');
    }
  };

  /**
   * Renders Quiz Engine
   */
  function renderQuizEngine(subject, exp) {
    if (!exp.quiz || exp.quiz.length === 0) {
      return `<p style="padding: 24px; color: var(--ink-soft);">No quiz available for this experiment yet.</p>`;
    }

    return `
      <div class="quiz-container">
        <form id="quizForm" onsubmit="event.preventDefault(); submitQuiz('${exp.id}');">
          ${exp.quiz.map((q, qIdx) => `
            <div class="quiz-question-block" id="q-block-${qIdx}">
              <p class="question-text">${qIdx + 1}. ${q.question}</p>
              <div class="options-group">
                ${q.options.map((opt, oIdx) => `
                  <label class="option-label" id="opt-lbl-${qIdx}-${oIdx}">
                    <input type="radio" name="q_${qIdx}" value="${oIdx}" required>
                    <span>${opt}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}

          <div class="quiz-score-banner" id="quizScoreBanner">
            <div class="score-text-block">
              <div class="score-title" id="scoreTitle">Experiment Knowledge Check</div>
              <div class="score-subtitle" id="scoreSubtitle">Answer all questions to submit your quiz and score points.</div>
            </div>
            <button class="btn-submit-quiz" type="submit" id="quizSubmitBtn">Submit Quiz</button>
          </div>
        </form>
      </div>
    `;
  }

  /**
   * Evaluates & Scores Quiz
   */
  window.submitQuiz = function (expId) {
    let subjectKey = null;
    let exp = null;

    Object.values(appData.subjects).forEach(sub => {
      const found = sub.experiments.find(e => e.id === expId);
      if (found) { subjectKey = sub.id; exp = found; }
    });

    if (!exp) return;

    let correctCount = 0;
    exp.quiz.forEach((q, qIdx) => {
      const selected = document.querySelector(`input[name="q_${qIdx}"]:checked`);
      const selectedVal = selected ? parseInt(selected.value) : -1;

      q.options.forEach((_, oIdx) => {
        const lbl = document.getElementById(`opt-lbl-${qIdx}-${oIdx}`);
        lbl.classList.remove('correct', 'incorrect');
        if (oIdx === q.correctIndex) {
          lbl.classList.add('correct');
        } else if (oIdx === selectedVal && selectedVal !== q.correctIndex) {
          lbl.classList.add('incorrect');
        }
      });

      if (selectedVal === q.correctIndex) correctCount++;
    });

    const scorePct = Math.round((correctCount / exp.quiz.length) * 100);

    const titleEl = document.getElementById('scoreTitle');
    const subEl = document.getElementById('scoreSubtitle');
    const btnEl = document.getElementById('quizSubmitBtn');

    if (titleEl) titleEl.textContent = `Quiz Completed: ${scorePct}%`;
    if (subEl) subEl.textContent = `You scored ${correctCount} out of ${exp.quiz.length} questions correctly.`;
    if (btnEl) {
      btnEl.textContent = 'Retake Quiz';
      btnEl.onclick = function () { window.location.reload(); };
    }

    // Update student global quiz count & progress state
    appData.student.stats.quizzesAttempted += 1;
    exp.status = 'completed';
    exp.progress = 100;
  };

  /**
   * Renders Student Profile View
   */
  function renderProfileView() {
    const container = document.getElementById('view-profile');
    if (!container) return;

    const s = appData.student;
    container.innerHTML = `
      <div class="profile-banner">
        <div class="profile-avatar-large">${s.initials}</div>
        <div>
          <p class="profile-roll-tag mono">ROLL NO: ${s.roll} &bull; ${s.batch}</p>
          <h1 class="profile-main-name">${s.name}</h1>
          <p class="profile-program-text">${s.program} &bull; ${s.semester}</p>
        </div>
      </div>

      <div class="profile-info-grid">
        <div class="info-card">
          <h3 class="section-subhead">Student Information</h3>
          <div class="info-item">
            <span class="info-key">Email Address</span>
            <span class="info-val">${s.email}</span>
          </div>
          <div class="info-item">
            <span class="info-key">Phone Number</span>
            <span class="info-val">${s.phone}</span>
          </div>
          <div class="info-item">
            <span class="info-key">Academic Program</span>
            <span class="info-val">${s.program}</span>
          </div>
          <div class="info-item">
            <span class="info-key">Faculty Mentor</span>
            <span class="info-val">${s.mentor}</span>
          </div>
        </div>

        <div class="info-card">
          <h3 class="section-subhead">Subject Completion</h3>
          ${Object.values(appData.subjects).map(sub => `
            <div style="margin-bottom: 16px;">
              <div class="progress-info mono" style="color: var(--ink-soft); margin-bottom: 4px;">
                <span>${sub.name}</span>
                <span>${sub.completed} / ${sub.total} (${Math.round((sub.completed / sub.total) * 100)}%)</span>
              </div>
              <div class="progress-bar-bg" style="background: var(--paper-dim);">
                <div class="progress-bar-fill" style="width: ${(sub.completed / sub.total) * 100}%; background: ${sub.color};"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <h3 class="section-subhead">Earned Badges & Achievements</h3>
      <div class="badges-wrap">
        ${s.badges.map(b => `
          <div class="badge-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--electrical)" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>${b}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Bind global functions & initialize app on DOM load
  window.selectExpTab = selectExpTab;
  document.addEventListener('DOMContentLoaded', init);

})();
