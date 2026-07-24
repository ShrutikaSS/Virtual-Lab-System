

/* ============================================================
   ZealVirtual Science Lab — Student Dashboard Script
   Architecture: assets/js/dashboard/dashboard.js
   ============================================================ */

(function () {
  'use strict';

  // Complete Sample Data Model for Student & Subjects
  const appData = {
    student: {
      name: window.loggedInStudent.full_name,
      firstName: window.loggedInStudent.full_name.split(' ')[0],
      initials: window.loggedInStudent.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase(),

      roll: window.loggedInStudent.roll_no,
      program: window.loggedInStudent.academic_program,
      semester: window.loggedInStudent.semester,
      batch: window.loggedInStudent.batch,
      email: window.loggedInStudent.email,
      phone: window.loggedInStudent.phone,
      mentor: window.loggedInStudent.faculty_mentor,

      stats: {
        completedCount: 0,
        quizzesAttempted: 0,
        avgScore: 0,
        hoursLogged: 0
      },

      badges: []
    },
    subjects: {
      chem: {
        id: 'chem',
        name: 'Chemistry Lab',
        tag: 'CHEMISTRY',
        color: '#37B7A0',
        desc: 'Acid-base titrations, chemical kinetics, buffer solutions, and volumetric measurement.',
        total: 7,
        completed: 5,
        experiments: [
          {
            id: 'ch-01',
            tag: 'CH·01',
            title: 'Acid-Base Titration & Equivalence Point',
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
            title: 'Flame Test for Metal Ion Identification',
            desc: 'Observe characteristic atomic emission spectrum flame colors to identify unknown metal cations.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Flame tests detect metal ions based on their characteristic flame colors when electrons transition back to ground state.',
              objectives: [
                'Observe Li, Na, K, Ca, Cu, Ba flame colors.',
                'Identify unknown metal salt samples.'
              ],
              keyFormula: 'E = \\frac{h c}{\\lambda}'
            },
            apparatus: [
              { name: 'Bunsen Burner Rig', qty: '1 unit' },
              { name: 'Platinum Wire Loop', qty: '1 unit' },
              { name: 'Salt Samples A-F', qty: '1 set' }
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
            id: 'ch-03',
            tag: 'CH·03',
            title: 'pH Scale and Indicator Testing',
            desc: 'Measure the pH of common household acids and bases using universal indicator strips and digital meters.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'The pH scale measures the hydrogen ion concentration in solutions, classifying them as acidic, neutral, or basic.',
              objectives: [
                'Observe indicator color changes across pH 0-14.',
                'Classify solutions as strong/weak acids or bases.'
              ],
              keyFormula: 'pH = -\\log[H^+]'
            },
            apparatus: [
              { name: 'Digital pH Meter', qty: '1 unit' },
              { name: 'Universal Indicator Strips', qty: '1 pack' },
              { name: 'Household Solutions Shelf', qty: '1 set' }
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
            id: 'ch-04',
            tag: 'CH·04',
            title: 'Rate of Reaction – Effect of Concentration/Temperature',
            desc: 'Measure reaction rate changes between Sodium Thiosulfate and Hydrochloric Acid under different temperatures.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Reaction rates increase with concentration and temperature due to higher collision frequencies between molecules.',
              objectives: [
                'Measure reaction speed via cloudiness times.',
                'Verify collision theory relationships.'
              ],
              keyFormula: 'Rate = \\frac{1}{\\text{Time}}'
            },
            apparatus: [
              { name: 'Glass Beakers', qty: '3 units' },
              { name: 'Water Bath Heater', qty: '1 unit' },
              { name: 'X-Marked Paper', qty: '1 sheet' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'In acid-catalyzed hydrolysis of methyl acetate, what is the order of reaction with respect to ester?',
                options: ['Zero order', 'Pseudo first-order', 'Second order', 'Third order'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ch-05',
            tag: 'CH·05',
            title: 'Electrolysis of Water & Mole Ratios',
            desc: 'Decompose water into hydrogen and oxygen gases using electrical current to verify Faraday\'s laws.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Electrolysis uses electric current to drive a non-spontaneous chemical decomposition reaction in water.',
              objectives: [
                'Verify 2:1 mole ratio of Hydrogen to Oxygen.',
                'Analyze redox reactions at cathode and anode.'
              ],
              keyFormula: '2H_2O \\rightarrow 2H_2 + O_2'
            },
            apparatus: [
              { name: 'Hoffman Voltameter', qty: '1 set' },
              { name: 'DC Power Source (12V)', qty: '1 unit' },
              { name: 'Acidified Water Electrolyte', qty: '200 mL' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'During the electrolysis of water, at which electrode is hydrogen gas released?',
                options: ['Cathode', 'Anode', 'Both electrodes', 'Neither electrode'],
                correctIndex: 0
              }
            ]
          },
          {
            id: 'ch-06',
            tag: 'CH·06',
            title: 'Qualitative Salt Analysis',
            desc: 'Perform cation and anion wet tests using laboratory reagents to identify unknown inorganic compounds.',
            status: 'in-progress',
            progress: 40,
            theory: {
              intro: 'Qualitative analysis involves testing a salt systematically with inorganic reagents to identify its constituent ions.',
              objectives: [
                'Narrows down ions using systematic tests.',
                'Perform confirmatory cation and anion tests.'
              ],
              keyFormula: '\\text{Salt} \\rightarrow \\text{Cation} + \\text{Anion}'
            },
            apparatus: [
              { name: 'Test Tube Rack & Tubes', qty: '1 set' },
              { name: 'Reagent Bottles Shelf', qty: '1 set' },
              { name: 'Unknown Salt Samples', qty: '1 set' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'Which of the following precipitates is formed when sodium hydroxide is added to a copper sulfate solution?',
                options: ['White precipitate', 'Light blue precipitate', 'Reddish-brown precipitate', 'Dirty green precipitate'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ch-07',
            tag: 'CH·07',
            title: 'Standard Solution Preparation',
            desc: 'Weigh solute, prepare standard molar solutions, and perform serial dilutions using volumetric flasks.',
            status: 'not-started',
            progress: 0,
            theory: {
              intro: 'A standard solution has a precisely known concentration, prepared by dissolving a known mass of solute in a fixed volume.',
              objectives: [
                'Weigh compounds on digital balance precisely.',
                'Perform serial dilution calculations using C1V1 = C2V2.'
              ],
              keyFormula: 'C_1 V_1 = C_2 V_2'
            },
            apparatus: [
              { name: 'Digital Balance', qty: '1 unit' },
              { name: 'Volumetric Flasks', qty: '3 units' },
              { name: 'Solute Compound Salts', qty: '1 set' }
            ],
            sim: { type: 'titration' },
            quiz: [
              {
                question: 'What volume of 12 M HCl is required to prepare 500 mL of 1.0 M HCl?',
                options: ['41.7 mL', '50.0 mL', '83.3 mL', '120.0 mL'],
                correctIndex: 0
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
        total: 7,
        completed: 5,
        experiments: [
          {
            id: 'phy-01',
            tag: 'PH·01',
            title: 'Simple Pendulum – Time Period vs Length',
            desc: 'Investigate the period of a simple pendulum as a function of string length L to calculate local acceleration due to gravity g.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'A simple pendulum consists of a point mass suspended from a fixed support by an inextensible string. Under small angular displacement, it undergoes simple harmonic motion with period T depending on L and g.',
              objectives: [
                'Verify the relationship between pendulum period T and string length L.',
                'Calculate local gravitational acceleration g from T² vs L.'
              ],
              keyFormula: 'T = 2 \\pi \\sqrt{\\frac{L}{g}}'
            },
            apparatus: [
              { name: 'Brass Pendulum Bob (50g)', qty: '1 unit' },
              { name: 'Inextensible Thread', qty: '1.5 meters' },
              { name: 'Precision Digital Stopwatch', qty: '1 unit' }
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
            title: 'Ohm\'s Law Verification',
            desc: 'Verify the linear relationship between voltage and current across a fixed resistor.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Ohm\'s Law states that the current through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to resistance.',
              objectives: [
                'Verify linear V-I relationship across fixed resistors.',
                'Calculate resistance R = V/I.'
              ],
              keyFormula: 'I = \\frac{V}{R}'
            },
            apparatus: [
              { name: 'Regulated DC Power Supply (0-30V)', qty: '1 unit' },
              { name: 'Digital Multimeter', qty: '2 units' },
              { name: 'Fixed Resistors', qty: '1 set' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'If voltage across a 20 Ω resistor is increased from 10 V to 20 V, what happens to the current?',
                options: ['Current doubles from 0.5 A to 1.0 A', 'Current halves to 0.25 A', 'Current quadruples', 'Current remains unchanged'],
                correctIndex: 0
              }
            ]
          },
          {
            id: 'phy-03',
            tag: 'PH·03',
            title: 'Projectile Motion Kinematics',
            desc: 'Analyze launch velocity and angle relationships to measure total horizontal range and maximum flight height.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Projectile motion is a form of motion experienced by an object projected into the air, moving under the constant acceleration of gravity.',
              objectives: [
                'Analyze launch velocity and launch angle relationships.',
                'Calculate Range, Max Height, and Flight Time.'
              ],
              keyFormula: 'Range = \\frac{v^2 \\sin(2\\theta)}{g}'
            },
            apparatus: [
              { name: 'Ballistic Spring Launcher', qty: '1 unit' },
              { name: 'Photogate Speed Sensor', qty: '2 units' },
              { name: 'Digital Angle Protractor', qty: '1 unit' }
            ],
            sim: { type: 'projectile' },
            quiz: [
              {
                question: 'At what launch angle θ does a projectile achieve maximum horizontal range R in vacuum?',
                options: ['30°', '45°', '60°', '90°'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'phy-04',
            tag: 'PH·04',
            title: 'Young\'s Double Slit interference',
            desc: 'Study wave interference of light through double slits to measure fringe width.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Young\'s Double Slit experiment demonstrates the wave nature of light via constructive and destructive interference patterns formed on a screen.',
              objectives: [
                'Observe bright and dark interference bands.',
                'Calculate fringe width β as a function of wavelength, slit distance, and screen distance.'
              ],
              keyFormula: '\\beta = \\frac{\\lambda D}{d}'
            },
            apparatus: [
              { name: 'Monochromatic Laser Source', qty: '1 unit' },
              { name: 'Double Slit Slide', qty: '1 unit' },
              { name: 'Viewing Screen & Draggable Ruler', qty: '1 unit' }
            ],
            sim: { type: 'pendulum' },
            quiz: [
              {
                question: 'Why is the central spot of Newton’s rings or double slit pattern dark in reflected light?',
                options: ['Zero path difference', 'Phase shift of π upon reflection at denser medium', 'Complete absorption', 'Refraction loss'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'phy-05',
            tag: 'PH·05',
            title: 'Series and Parallel Combination of Resistors',
            desc: 'Assemble resistors in series and parallel connection to verify equivalent resistance formulas.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'The equivalent resistance of series combinations is the sum of resistances, while for parallel it is the reciprocal sum.',
              objectives: [
                'Verify series and parallel equivalent resistance formulas.',
                'Analyze current and voltage division rules.'
              ],
              keyFormula: 'R_{series} = R_1 + R_2, \\quad R_{parallel} = \\frac{R_1 R_2}{R_1 + R_2}'
            },
            apparatus: [
              { name: 'DC Supply', qty: '1 unit' },
              { name: 'Multimeters', qty: '2 units' },
              { name: 'Resistor kit', qty: '1 set' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'What is the equivalent resistance of two 100 Ω resistors connected in parallel?',
                options: ['200 Ω', '100 Ω', '50 Ω', '25 Ω'],
                correctIndex: 2
              }
            ]
          },
          {
            id: 'phy-06',
            tag: 'PH·06',
            title: 'Inclined Plane – Newton\'s Second Law',
            desc: 'Analyze the forces acting on a block sliding down an inclined plane with adjustable angle and friction.',
            status: 'in-progress',
            progress: 50,
            theory: {
              intro: 'Newton\'s second law describes the motion of an object down an incline under the influence of gravity and friction forces.',
              objectives: [
                'Measure block acceleration down an inclined plane.',
                'Verify friction coefficient relationships.'
              ],
              keyFormula: 'a = g(\\sin\\theta - \\mu\\cos\\theta)'
            },
            apparatus: [
              { name: 'Adjustable Incline Bench', qty: '1 unit' },
              { name: 'Sliding Wooden Blocks', qty: '1 set' },
              { name: 'Mass Weights', qty: '1 set' }
            ],
            sim: { type: 'projectile' },
            quiz: [
              {
                question: 'A block slides down an incline. If the slope angle increases, the normal force:',
                options: ['Increases', 'Decreases', 'Remains the same', 'Becomes zero'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'phy-07',
            tag: 'PH·07',
            title: 'Melde\'s Experiment — Standing Waves',
            desc: 'Verify standing wave resonance conditions on a stretched string using adjustable frequency and tension.',
            status: 'not-started',
            progress: 0,
            theory: {
              intro: 'Standing waves are formed by the interference of two traveling waves of the same frequency and amplitude moving in opposite directions.',
              objectives: [
                'Observe resonance loops on a stretched string.',
                'Calculate wave speed and verify frequency relations.'
              ],
              keyFormula: 'v = \\sqrt{\\frac{T}{\\mu}}, \\quad f = \\frac{n v}{2L}'
            },
            apparatus: [
              { name: 'Electromagnetic Tuning Fork', qty: '1 unit' },
              { name: 'Step Pulley & Hanging Weights', qty: '1 set' },
              { name: 'Inextensible Fine Thread', qty: '1 unit' }
            ],
            sim: { type: 'pendulum' },
            quiz: [
              {
                question: 'In standing waves, the points of zero amplitude are called:',
                options: ['Nodes', 'Antinodes', 'Harmonics', 'Resonances'],
                correctIndex: 0
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
        total: 7,
        completed: 5,
        experiments: [
          {
            id: 'ee-01',
            tag: 'EE·01',
            title: 'Kirchhoff\'s Circuit Laws (KVL & KCL)',
            desc: 'Verify that node current sums and loop voltage drops equal zero in a multi-loop DC network.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Kirchhoff\'s laws govern conservation of charge (KCL) and energy (KVL) inside electrical circuit networks.',
              objectives: [
                'Verify loop voltage drops sum to zero.',
                'Verify node currents sum to zero.'
              ],
              keyFormula: '\\sum V = 0, \\quad \\sum I = 0'
            },
            apparatus: [
              { name: 'DC Volt Sources', qty: '2 units' },
              { name: 'Ammeters & Voltmeters', qty: '3 units' },
              { name: 'Resistor Network Panel', qty: '1 unit' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'According to Kirchhoff\'s Current Law (KCL), the algebraic sum of currents entering a node is:',
                options: ['Infinity', 'Dependent on resistance', 'Zero', 'Equal to loop voltage'],
                correctIndex: 2
              }
            ]
          },
          {
            id: 'ee-02',
            tag: 'EE·02',
            title: 'Series RLC Circuit Resonance',
            desc: 'Sweep AC source frequency to find the resonant peak where inductive and capacitive reactances cancel.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'In RLC circuits, resonance occurs when inductive reactance equals capacitive reactance, minimizing impedance.',
              objectives: [
                'Measure resonant frequency peak.',
                'Calculate circuit Q-factor and bandwidth.'
              ],
              keyFormula: 'f_0 = \\frac{1}{2 \\pi \\sqrt{L C}}'
            },
            apparatus: [
              { name: 'AC Signal Generator', qty: '1 unit' },
              { name: 'Resistor, Inductor, Capacitor', qty: '1 set' },
              { name: 'Dual Trace Oscilloscope', qty: '1 unit' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'At resonant frequency of a series RLC circuit, the circuit impedance is:',
                options: ['Maximum and purely reactive', 'Minimum and purely resistive', 'Zero', 'Infinite'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ee-03',
            tag: 'EE·03',
            title: 'Transformer OC & SC Core Tests',
            desc: 'Perform open-circuit and short-circuit tests to measure core iron losses and winding copper losses.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Open circuit tests measure core loss parameters, while short circuit tests measure equivalent winding resistance.',
              objectives: [
                'Determine transformer core losses (iron loss).',
                'Determine equivalent winding copper resistance.'
              ],
              keyFormula: 'P_{core} = V_{oc} I_{oc} \\cos\\phi, \\quad P_{cu} = I_{sc}^2 R_{eq}'
            },
            apparatus: [
              { name: 'Single-Phase Transformer', qty: '1 unit' },
              { name: 'Wattmeter & Variac AC Supply', qty: '1 set' },
              { name: 'Voltmeters & Ammeters', qty: '2 units' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'The open circuit test on a single-phase transformer is primarily performed to find:',
                options: ['Copper losses', 'Core / Iron losses', 'Friction losses', 'Total efficiency'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ee-04',
            tag: 'EE·04',
            title: 'DC Motor Torque-Speed Curves',
            desc: 'Apply mechanical load torque to DC shunt and series motors to plot speed-torque and speed-current profiles.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'DC motors develop torque proportional to armature current, causing speed drops under loading.',
              objectives: [
                'Plot torque vs speed curves for shunt and series motors.',
                'Verify speed regulation properties.'
              ],
              keyFormula: 'N = \\frac{V - I_a R_a}{K \\Phi}'
            },
            apparatus: [
              { name: 'DC Shunt & Series Motor Rig', qty: '1 unit' },
              { name: 'Mechanical Brake Dynamometer', qty: '1 unit' },
              { name: 'Armature DC Supply', qty: '1 unit' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'Weakening the main magnetic field flux Φ in a DC shunt motor causes the motor speed N to:',
                options: ['Decrease', 'Increase above rated speed', 'Drop to zero', 'Reverse rotation direction'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ee-05',
            tag: 'EE·05',
            title: 'AC Circuits & Power Factor',
            desc: 'Measure active, reactive, and apparent power in AC loads to analyze power factor and correction capacitor banks.',
            status: 'completed',
            progress: 100,
            theory: {
              intro: 'Power factor represents the ratio of real power to apparent power, indicating phase lag between voltage and current.',
              objectives: [
                'Measure phase shift between voltage and current waves.',
                'Perform power factor correction using parallel capacitors.'
              ],
              keyFormula: '\\text{PF} = \\cos\\theta = \\frac{P}{S}'
            },
            apparatus: [
              { name: 'AC Wattmeter', qty: '1 unit' },
              { name: 'Inductive Load & Capacitor Bank', qty: '1 set' },
              { name: 'Phasor Volt/Amp Meters', qty: '1 set' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'What component is commonly connected in parallel to an inductive load to improve its power factor?',
                options: ['Resistor', 'Inductor', 'Capacitor', 'Diode'],
                correctIndex: 2
              }
            ]
          },
          {
            id: 'ee-06',
            tag: 'EE·06',
            title: 'Three-Phase Star-Delta connections',
            desc: 'Verify line and phase voltage/current relations under balanced three-phase star and delta connections.',
            status: 'in-progress',
            progress: 60,
            theory: {
              intro: 'Balanced three-phase networks distribute power using line and phase values shifted by 120 degrees.',
              objectives: [
                'Verify star voltage relation VL = √3 Vph.',
                'Verify delta current relation IL = √3 Iph.'
              ],
              keyFormula: 'P = \\sqrt{3} V_L I_L \\cos\\phi'
            },
            apparatus: [
              { name: '3-Phase AC Supply Panel', qty: '1 unit' },
              { name: 'Balanced Resistive Load Bank', qty: '1 unit' },
              { name: 'Multi-Phase Meters', qty: '1 set' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'In a balanced Star (Y) connection, what is the mathematical relation between line voltage VL and phase voltage Vph?',
                options: ['VL = Vph', 'VL = √3 * Vph', 'VL = Vph / √3', 'VL = 3 * Vph'],
                correctIndex: 1
              }
            ]
          },
          {
            id: 'ee-07',
            tag: 'EE·07',
            title: 'Insulation & Earth Resistance Tests',
            desc: 'Use a high-voltage Megger to check cable insulation health and perform ground potential measurements.',
            status: 'not-started',
            progress: 0,
            theory: {
              intro: 'Earth resistance testing ensures low-resistance grounding paths for system safety, while Meggers test insulation leaks.',
              objectives: [
                'Verify insulation resistance using virtual Megger.',
                'Measure earth ground resistance using fall-of-potential test.'
              ],
              keyFormula: 'R = \\frac{V_{test}}{I_{leak}}'
            },
            apparatus: [
              { name: 'Virtual High-Voltage Megger', qty: '1 unit' },
              { name: 'Ground Spikes & Earth Rod', qty: '1 set' },
              { name: 'Soil Resistivity Tester', qty: '1 unit' }
            ],
            sim: { type: 'ohms' },
            quiz: [
              {
                question: 'What instrument is primarily used to measure high insulation resistance?',
                options: ['Multimeter', 'Megger', 'Voltmeter', 'Galvanometer'],
                correctIndex: 1
              }
            ]
          }
        ]
      }
    }
  };
  // Dynamic Stats & Achievements Pre-Calculation
  let compCount = 0;
  let quizCount = 0;
  let totalScore = 0;
  let totalCompletedWithQuiz = 0;

  Object.values(appData.subjects).forEach(sub => {
    sub.experiments.forEach(exp => {
      if (exp.status === 'completed') {
        compCount++;
        quizCount++;
        totalScore += 90; // mock quiz score for completed experiments
        totalCompletedWithQuiz++;
      }
    });
  });

  appData.student.stats.completedCount = compCount;
  appData.student.stats.quizzesAttempted = quizCount;
  appData.student.stats.avgScore = totalCompletedWithQuiz > 0 ? Math.round(totalScore / totalCompletedWithQuiz) : 85;
  appData.student.stats.hoursLogged = compCount * 2 + 3;
  appData.student.badges = ["Lab Pioneer", "Precision Expert", "Circuit Master"];

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
    // Bind profile values
    const headerInitials = document.getElementById('headerInitials');
    const headerName = document.getElementById('headerName');
    if (headerInitials) headerInitials.textContent = appData.student.initials;
    if (headerName) headerName.textContent = appData.student.name;

    bindEvents();
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    // Mouse Spotlight Cursor Effect
    document.addEventListener('mousemove', e => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    });

    // Close Dropdowns on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.btn-notif-bell') && !e.target.closest('.notif-dropdown-panel')) {
        document.getElementById('notifDropdownPanel')?.classList.remove('active');
      }
      if (!e.target.closest('.header-user-chip') && !e.target.closest('.profile-dropdown-panel')) {
        document.getElementById('profileDropdownPanel')?.classList.remove('active');
      }
      if (!e.target.closest('.btn-mobile-overflow') && !e.target.closest('.mobile-overflow-panel')) {
        document.getElementById('mobileOverflowPanel')?.classList.remove('active');
      }
      if (!e.target.closest('.global-search-wrap')) {
        document.getElementById('globalSearchResults')?.classList.remove('active');
      }
    });

    // Populate notifications
    renderStudentNotifications();
  }

  function renderStudentNotifications() {
    const list = window.serverBroadcasts || [];
    const notifListEl = document.getElementById('notifList');
    const badgeEl = document.getElementById('notifBadge');
    const tagEl = document.getElementById('notifCountTag');
    const mobileListEl = document.getElementById('mobileNotifsList');

    if (badgeEl) {
      if (list.length > 0) {
        badgeEl.textContent = list.length;
        badgeEl.style.display = 'flex';
      } else {
        badgeEl.style.display = 'none';
      }
    }

    if (tagEl) {
      tagEl.textContent = `${list.length} Msg`;
    }

    const html = list.length > 0 ? list.map(n => `
      <div class="notif-item">
        <strong>${n.sender}</strong>
        <div>${n.message}</div>
        <div class="notif-meta">
          <span class="mono" style="font-size: 0.65rem;">To: ${n.audience}</span>
          <span style="font-size: 0.65rem;">${n.created_at}</span>
        </div>
      </div>
    `).join('') : '<div style="padding: 14px; text-align: center; color: var(--ink-soft); font-size: 0.8rem;">No announcements yet.</div>';

    if (notifListEl) {
      notifListEl.innerHTML = html;
    }

    if (mobileListEl) {
      if (list.length > 0) {
        mobileListEl.innerHTML = list.slice(0, 3).map(n => `
          <div style="padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <strong>${n.sender}:</strong> ${n.message}
          </div>
        `).join('');
      } else {
        mobileListEl.innerHTML = '<div style="padding:4px 0; color:rgba(255,255,255,0.4);">No announcements.</div>';
      }
    }
  }

  // Dropdown Panels Toggle Helpers
  window.toggleNotifDropdown = function () {
    const panel = document.getElementById('notifDropdownPanel');
    if (panel) {
      panel.classList.toggle('active');
      document.getElementById('profileDropdownPanel')?.classList.remove('active');
      document.getElementById('mobileOverflowPanel')?.classList.remove('active');
    }
  };

  window.toggleProfileDropdown = function () {
    const panel = document.getElementById('profileDropdownPanel');
    if (panel) {
      panel.classList.toggle('active');
      document.getElementById('notifDropdownPanel')?.classList.remove('active');
      document.getElementById('mobileOverflowPanel')?.classList.remove('active');
    }
  };

  window.toggleMobileOverflow = function () {
    const panel = document.getElementById('mobileOverflowPanel');
    if (panel) {
      panel.classList.toggle('active');
      document.getElementById('notifDropdownPanel')?.classList.remove('active');
      document.getElementById('profileDropdownPanel')?.classList.remove('active');
    }
  };

  // Language & Session Handlers
  window.handleLanguageChange = function (lang) {
    alert(`Language switched to: ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Marathi'}`);
  };

  window.handleLogout = function () {
    if (confirm('Are you sure you want to log out of the Student Portal?')) {
      window.location.href = '../login.php';
    }
  };

  // Global Interactive Search Indexing
  window.handleGlobalSearch = function (query) {
    const resultsDiv = document.getElementById('globalSearchResults');
    if (!resultsDiv) return;

    if (!query.trim()) {
      resultsDiv.classList.remove('active');
      resultsDiv.innerHTML = '';
      return;
    }

    const q = query.toLowerCase();
    const matches = [];

    // Search Experiments
    Object.keys(appData.subjects).forEach(subKey => {
      const sub = appData.subjects[subKey];
      sub.experiments.forEach(exp => {
        if (exp.title.toLowerCase().includes(q) || exp.tag.toLowerCase().includes(q) || exp.desc.toLowerCase().includes(q)) {
          matches.push({
            type: 'Experiment',
            name: `${exp.tag} — ${exp.title}`,
            hash: `#exp/${subKey}/${exp.id}`
          });
        }
      });
    });

    // Search Subjects
    Object.keys(appData.subjects).forEach(subKey => {
      const sub = appData.subjects[subKey];
      if (sub.name.toLowerCase().includes(q) || sub.desc.toLowerCase().includes(q)) {
        matches.push({
          type: 'Subject Lab Bench',
          name: sub.name,
          hash: `#subject/${subKey}`
        });
      }
    });

    if (matches.length === 0) {
      resultsDiv.innerHTML = `<div style="padding:12px; font-size:0.85rem; color:var(--ink-soft); text-align:center;">No results found for "${query}"</div>`;
    } else {
      resultsDiv.innerHTML = `
        <div class="search-group-header">Matches (${matches.length})</div>
        ${matches.map(m => `
          <div class="search-result-item" onclick="handleSearchSelection('${m.hash}')">
            <div>
              <div style="font-weight:700; font-size:0.9rem; color:var(--ink);">${m.name}</div>
              <div style="font-size:0.7rem; color:var(--ink-soft); text-transform:uppercase;">${m.type}</div>
            </div>
            <span style="font-size:0.9rem; color:var(--chem); font-weight:700;">&rarr;</span>
          </div>
        `).join('')}
      `;
    }

    resultsDiv.classList.add('active');
  };

  window.handleSearchSelection = function (hash) {
    const resultsDiv = document.getElementById('globalSearchResults');
    if (resultsDiv) resultsDiv.classList.remove('active');
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) searchInput.value = '';
    window.location.hash = hash;
  };

  window.toggleMobileSearch = function () {
    const wrap = document.getElementById('headerSearchWrap');
    if (wrap) wrap.classList.toggle('expanded');
  };

  // Footer Policy Modals Handlers
  window.openFooterModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  };

  window.closeFooterModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

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

      <!-- Announcements & Broadcasts -->
      <h2 class="section-title">Announcements & Broadcasts</h2>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        ${(window.serverBroadcasts && window.serverBroadcasts.length > 0) ? 
          window.serverBroadcasts.map(b => `
            <div class="continue-card" style="border-left: 4px solid var(--chem); padding: 16px; background: var(--paper-dim); border-radius: var(--r-md); display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div>
                <div class="continue-tag-row" style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                  <span class="tag-pill mono" style="background: rgba(240, 179, 62, 0.15); color: var(--electrical); font-size: 0.72rem; padding: 2px 6px; border-radius: 4px;">${b.sender}</span>
                  <span class="status-pill completed mono" style="font-size: 0.72rem; padding: 2px 6px; border-radius: 4px;">${b.created_at}</span>
                </div>
                <h4 style="margin: 0; font-family: var(--font-body); font-weight: normal; font-size: 0.95rem; color: var(--ink);">${b.message}</h4>
              </div>
            </div>
          `).join('') : `
            <div class="continue-card" style="padding: 16px; background: var(--paper-dim); border-radius: var(--r-md);">
              <p style="color: var(--ink-soft); font-size: 0.9rem; margin: 0;">No active announcements from faculty or admin.</p>
            </div>
          `
        }
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

    let exp = null;
    for (const subKey in appData.subjects) {
      const found = appData.subjects[subKey].experiments.find(e => e.id === expId);
      if (found) {
        exp = found;
        break;
      }
    }

    const simType = exp ? exp.sim.type : '';

    if (simType === 'titration') {
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
    } else if (simType === 'pendulum') {
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
    } else if (simType === 'projectile') {
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
    } else if (simType === 'ohms') {
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

      <div class="logout-section">
        <div class="logout-divider"></div>
        <div class="logout-info">
          <p class="logout-label mono">Session</p>
          <p class="logout-desc">You are currently signed in as <strong>${s.name}</strong>. Logging out will end your session.</p>
        </div>
        <button class="logout-btn" id="logoutBtn" onclick="confirmLogout()" aria-label="Log out of Virtual Lab">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Log Out
        </button>
      </div>
    `;
  }

  /**
   * Confirms and executes logout
   */
  function confirmLogout() {
    const btn = document.getElementById('logoutBtn');
    if (btn) {
      btn.textContent = 'Signing out…';
      btn.disabled = true;
    }
    window.location.href = '../ajax/auth/logout.php';
  }

  // Bind global functions & initialize app on DOM load
  window.selectExpTab = selectExpTab;
  window.confirmLogout = confirmLogout;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
