/* ============================================================
   ZealVirtual Science Lab — Faculty Dashboard Script
   Architecture: assets/js/faculty/faculty.js
   ============================================================ */

(function () {
  'use strict';

  function getInitials(name) {
    if (!name) return 'F';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return parts.map(p => p[0]).join('').toUpperCase();
  }

  // Sample Data Model for Faculty, Subjects, Experiments, Reports & Notifications
  const appData = {
    faculty: {
      name: 'Faculty',
      initials: 'F',
      facultyId: 'FAC-000',
      department: 'Department of Applied Sciences & Engineering',
      designation: 'Faculty Member & Lab Instructor',
      email: '',
      phone: '',
      stats: {
        subjectsHandled: 3,
        experimentsPublished: 15,
        studentsEnrolled: 240,
        avgClassScore: 84
      }
    },
    subjects: {
      chem: {
        id: 'chem',
        name: 'Chemistry Lab',
        tag: 'CHEMISTRY',
        color: '#37B7A0',
        desc: 'Acid-base titrations, chemical kinetics, buffer solutions, and volumetric measurement.',
        totalExp: 5,
        enrolledCount: 80
      },
      phy: {
        id: 'phy',
        name: 'Physics Lab',
        tag: 'PHYSICS',
        color: '#9C8CF0',
        desc: 'Simple harmonic pendulum motion, projectile kinematics, optical diffraction, and wave mechanics.',
        totalExp: 5,
        enrolledCount: 80
      },
      elec: {
        id: 'elec',
        name: 'Electrical Lab (BEEE)',
        tag: 'ELECTRICAL',
        color: '#F0B33E',
        desc: 'Ohm’s law, Kirchhoff’s circuit laws, series/parallel resistor networks, and AC frequency response.',
        totalExp: 5,
        enrolledCount: 80
      }
    },
    experiments: [
      { id: 'ch-01', tag: 'CH·01', subject: 'chem', title: 'Acid–Base Titration & Equivalence Point', status: 'published', difficulty: 'Intermediate', lastUpdated: '2026-07-18', enrolledStudents: 78, avgScore: 88, completionRate: 95 },
      { id: 'ch-02', tag: 'CH·02', subject: 'chem', title: 'pH Metric Kinetics & Buffer Solutions', status: 'published', difficulty: 'Advanced', lastUpdated: '2026-07-15', enrolledStudents: 75, avgScore: 82, completionRate: 85 },
      { id: 'ch-03', tag: 'CH·03', subject: 'chem', title: 'Flame Photometry & Alkali Metal Analysis', status: 'published', difficulty: 'Basic', lastUpdated: '2026-07-10', enrolledStudents: 80, avgScore: 90, completionRate: 98 },
      { id: 'ch-04', tag: 'CH·04', subject: 'chem', title: 'Viscosity & Surface Tension of Pure Liquids', status: 'published', difficulty: 'Intermediate', lastUpdated: '2026-07-08', enrolledStudents: 76, avgScore: 84, completionRate: 92 },
      { id: 'ch-05', tag: 'CH·05', subject: 'chem', title: 'Chemical Kinetics & Reaction Order', status: 'draft', difficulty: 'Advanced', lastUpdated: '2026-07-20', enrolledStudents: 0, avgScore: 0, completionRate: 0 },

      { id: 'phy-01', tag: 'PH·01', subject: 'phy', title: 'Simple Pendulum & Gravitational Acceleration', status: 'published', difficulty: 'Basic', lastUpdated: '2026-07-19', enrolledStudents: 80, avgScore: 86, completionRate: 96 },
      { id: 'phy-02', tag: 'PH·02', subject: 'phy', title: 'Projectile Motion Kinematics', status: 'published', difficulty: 'Intermediate', lastUpdated: '2026-07-17', enrolledStudents: 79, avgScore: 85, completionRate: 94 },
      { id: 'phy-03', tag: 'PH·03', subject: 'phy', title: 'Newton’s Rings & Light Wavelength', status: 'published', difficulty: 'Advanced', lastUpdated: '2026-07-12', enrolledStudents: 74, avgScore: 79, completionRate: 88 },
      { id: 'phy-04', tag: 'PH·04', subject: 'phy', title: 'Semiconductor Energy Band Gap', status: 'published', difficulty: 'Advanced', lastUpdated: '2026-07-09', enrolledStudents: 76, avgScore: 81, completionRate: 90 },
      { id: 'phy-05', tag: 'PH·05', subject: 'phy', title: 'Torsional Pendulum & Modulus of Rigidity', status: 'draft', difficulty: 'Intermediate', lastUpdated: '2026-07-21', enrolledStudents: 0, avgScore: 0, completionRate: 0 },

      { id: 'ee-01', tag: 'EE·01', subject: 'elec', title: 'Ohm’s Law & Series–Parallel Resistor Networks', status: 'published', difficulty: 'Basic', lastUpdated: '2026-07-20', enrolledStudents: 80, avgScore: 92, completionRate: 99 },
      { id: 'ee-02', tag: 'EE·02', subject: 'elec', title: 'Kirchhoff’s Voltage & Current Laws (KVL/KCL)', status: 'published', difficulty: 'Intermediate', lastUpdated: '2026-07-16', enrolledStudents: 78, avgScore: 87, completionRate: 93 },
      { id: 'ee-03', tag: 'EE·03', subject: 'elec', title: 'RLC Series Resonance & Quality Factor', status: 'published', difficulty: 'Advanced', lastUpdated: '2026-07-14', enrolledStudents: 72, avgScore: 80, completionRate: 86 },
      { id: 'ee-04', tag: 'EE·04', subject: 'elec', title: 'Single-Phase Transformer OC & SC Tests', status: 'published', difficulty: 'Advanced', lastUpdated: '2026-07-11', enrolledStudents: 75, avgScore: 83, completionRate: 89 },
      { id: 'ee-05', tag: 'EE·05', subject: 'elec', title: 'DC Shunt Motor Speed Control & Torque', status: 'draft', difficulty: 'Intermediate', lastUpdated: '2026-07-20', enrolledStudents: 0, avgScore: 0, completionRate: 0 }
    ],
    studentsSummary: [
      { name: 'Aarav Rao', roll: '21AI045', batch: 'CS-3B', subject: 'Chemistry Lab', expCompleted: 4, avgScore: 88, hoursLogged: 14.5, lastActive: 'Today, 09:42 AM' },
      { name: 'Diya Patel', roll: '21AI012', batch: 'CS-3A', subject: 'Physics Lab', expCompleted: 5, avgScore: 94, hoursLogged: 18.2, lastActive: 'Yesterday' },
      { name: 'Rohan Mehta', roll: '21EC088', batch: 'ECE-2A', subject: 'Electrical Lab', expCompleted: 4, avgScore: 82, hoursLogged: 12.0, lastActive: '2026-07-19' },
      { name: 'Ananya Iyer', roll: '21AI009', batch: 'CS-3B', subject: 'Chemistry Lab', expCompleted: 5, avgScore: 96, hoursLogged: 21.0, lastActive: 'Today, 10:15 AM' },
      { name: 'Vikram Singh', roll: '21ME034', batch: 'ME-2B', subject: 'Physics Lab', expCompleted: 3, avgScore: 76, hoursLogged: 9.8, lastActive: '2026-07-18' }
    ],
    notifications: [
      { id: 'n-1', message: 'Chemistry Lab CH·01 Acid-Base Titration report submission deadline extended to Friday.', audience: 'Chemistry Students', sentAt: '2026-07-20 04:30 PM', status: 'Delivered' },
      { id: 'n-2', message: 'New simulation parameters for EE·01 Ohm’s Law network have been updated.', audience: 'All Students', sentAt: '2026-07-18 11:00 AM', status: 'Delivered' }
    ],
    recentActivity: [
      { text: 'Published new experiment EE·01 Ohm’s Law & Series–Parallel Resistors', time: '2 hours ago' },
      { text: 'Updated quiz questions for CH·01 Acid–Base Titration', time: 'Yesterday' },
      { text: 'Generated Monthly Student Performance Report (PDF)', time: '3 days ago' },
      { text: 'Sent notification broadcast to Section CS-3B', time: '4 days ago' }
    ]
  };

  if (window.loggedInFaculty) {
    const fData = window.loggedInFaculty;
    const fullName = fData.full_name || fData.username || 'Faculty Member';
    appData.faculty.name = fullName;
    appData.faculty.initials = getInitials(fullName);
    appData.faculty.facultyId = fData.username ? fData.username.toUpperCase() : `FAC-${fData.id}`;
    appData.faculty.email = fData.email || '';
    appData.faculty.department = fData.department || 'Department of Applied Sciences & Engineering';
    appData.faculty.designation = fData.designation || 'Faculty Member & Lab Instructor';
  }

  // State Engine
  const state = {
    isLoggedIn: true,
    currentView: 'dashboard',
    wizardStep: 1,
    wizardData: {
      title: '', subject: 'chem', tag: 'CH·06', desc: '', difficulty: 'Basic',
      theory: { intro: '', objectives: [''], keyFormula: '' },
      procedure: [{ step: 'Set up apparatus and connect power source.', simType: 'ohms' }],
      apparatus: [{ name: 'Multimeter', qty: '1 unit' }],
      media: [],
      quiz: [{ question: 'What is the SI unit of electric current?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correctIndex: 1 }]
    }
  };

  /**
   * App Initialization
   */
  function init() {
    state.isLoggedIn = true;
    updateHeaderProfile();
    bindEvents();
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
  }

  function updateHeaderProfile() {
    const headerName = document.getElementById('headerName');
    const headerInitials = document.getElementById('headerInitials');
    if (headerName) headerName.textContent = appData.faculty.name;
    if (headerInitials) headerInitials.textContent = appData.faculty.initials;
  }

  function bindEvents() {
    // Sidebar Navigation Click
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        navigateTo(view);
      });
    });

    // Top Bar Actions
    const profileChip = document.getElementById('profileChip');
    if (profileChip) profileChip.addEventListener('click', () => navigateTo('profile'));

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => handleLogout());
  }

  /**
   * Router Engine
   */
  function navigateTo(viewName) {
    if (!state.isLoggedIn && viewName !== 'login') {
      viewName = 'login';
    }

    state.currentView = viewName;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) targetView.classList.add('active');

    // Update Sidebar Navigation
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === viewName);
    });

    // Toggle Shell vs Login Screen visibility
    const shell = document.getElementById('appShell');
    const loginStage = document.getElementById('view-login');
    if (shell && loginStage) {
      if (viewName === 'login') {
        shell.style.display = 'none';
        loginStage.style.display = 'flex';
      } else {
        shell.style.display = 'grid';
        loginStage.style.display = 'none';
      }
    }

    // Update Breadcrumbs
    const crumbMap = {
      dashboard: 'Dashboard / Overview',
      subjects: 'Dashboard / Manage Subjects',
      experiments: 'Dashboard / Manage Experiments',
      'create-exp': 'Dashboard / Manage Experiments / Create Experiment',
      reports: 'Dashboard / Performance Reports',
      notifications: 'Dashboard / Send Notifications',
      profile: 'Dashboard / Faculty Profile'
    };
    updateBreadcrumb(crumbMap[viewName] || 'Dashboard');

    // Render View Specific UI
    if (viewName === 'dashboard') renderDashboardView();
    if (viewName === 'subjects') renderSubjectsView();
    if (viewName === 'experiments') renderExperimentsView();
    if (viewName === 'create-exp') renderCreateExperimentWizard();
    if (viewName === 'reports') renderReportsView();
    if (viewName === 'notifications') renderNotificationsView();
    if (viewName === 'profile') renderProfileView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '');
    if (!hash || hash === 'login') {
      navigateTo('dashboard');
    } else {
      state.isLoggedIn = true; // Auto activate session if deep-linked
      navigateTo(hash);
    }
  }

  function updateBreadcrumb(text) {
    const container = document.getElementById('breadcrumbContainer');
    if (!container) return;
    const parts = text.split(' / ');
    container.innerHTML = parts.map((p, i) => `<span class="breadcrumb-crumb ${i === parts.length - 1 ? 'active' : ''}">${p}</span>`).join(' / ');
  }

  /**
   * Faculty Authentication Handler
   */
  window.handleFacultyLogin = function () {
    state.isLoggedIn = true;
    window.location.hash = '#dashboard';
  };

  function handleLogout() {
    state.isLoggedIn = false;
    window.location.href = '../ajax/auth/logout.php';
  }

  /**
   * Renders Dashboard Home
   */
  function renderDashboardView() {
    const container = document.getElementById('view-dashboard');
    if (!container) return;
    const f = appData.faculty;

    container.innerHTML = `
      <div class="welcome-header">
        <h1 class="welcome-title">Welcome, ${f.name} 👨‍🏫</h1>
        <p class="welcome-subtitle">Overview of your managed lab benches, student enrollments, and recent publishing activities.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label mono">Subjects Handled</div>
          <div class="stat-value">${f.stats.subjectsHandled}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label mono">Experiments Published</div>
          <div class="stat-value">${f.stats.experimentsPublished}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label mono">Students Enrolled</div>
          <div class="stat-value">${f.stats.studentsEnrolled}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label mono">Average Class Score</div>
          <div class="stat-value">${f.stats.avgClassScore}%</div>
        </div>
      </div>

      <h2 class="section-title">Faculty Control Hub</h2>
      <div class="subject-grid">
        <div class="quick-card" data-action="subjects" onclick="window.location.hash='#subjects'">
          <div class="quick-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <h3 class="quick-card-title">Manage Subjects</h3>
          <p class="quick-card-desc">Configure lab subjects, assign accent colors, and manage student enrollments.</p>
          <button class="btn-open-quick">Manage Benches &rarr;</button>
        </div>

        <div class="quick-card" data-action="experiments" onclick="window.location.hash='#experiments'">
          <div class="quick-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <h3 class="quick-card-title">Manage Experiments</h3>
          <p class="quick-card-desc">Create, edit, duplicate, and publish interactive lab experiment modules.</p>
          <button class="btn-open-quick">Experiment Suite &rarr;</button>
        </div>

        <div class="quick-card" data-action="reports" onclick="window.location.hash='#reports'">
          <div class="quick-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          </div>
          <h3 class="quick-card-title">Performance Reports</h3>
          <p class="quick-card-desc">Monitor student trial logs, quiz score distributions, and export downloadable PDF/CSV reports.</p>
          <button class="btn-open-quick">View Analytics &rarr;</button>
        </div>
      </div>

      <h2 class="section-title">Recent Activity Feed</h2>
      <div class="activity-feed">
        ${appData.recentActivity.map(act => `
          <div class="activity-item">
            <span class="activity-text">${act.text}</span>
            <span class="activity-time mono">${act.time}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Renders Manage Subjects View
   */
  function renderSubjectsView() {
    const container = document.getElementById('view-subjects');
    if (!container) return;

    container.innerHTML = `
      <div class="table-header-bar">
        <div>
          <h1 class="welcome-title" style="font-size: 1.6rem;">Manage Lab Subjects</h1>
          <p class="welcome-subtitle">Configure department subjects and monitoring settings.</p>
        </div>
        <button class="btn-btn-add" onclick="openSubjectModal()">+ Add New Subject</button>
      </div>

      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Subject Tag</th>
              <th>Subject Name</th>
              <th>Total Experiments</th>
              <th>Enrolled Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${Object.values(appData.subjects).map(sub => `
              <tr>
                <td><span class="status-pill mono" style="background: rgba(255,255,255,0.1); color: ${sub.color}; border: 1px solid ${sub.color};">${sub.tag}</span></td>
                <td><strong>${sub.name}</strong><br><small style="color: var(--ink-soft);">${sub.desc}</small></td>
                <td>${sub.totalExp} Modules</td>
                <td>${sub.enrolledCount} Students</td>
                <td class="actions-cell">
                  <button class="btn-action-icon" onclick="openSubjectModal('${sub.id}')">Edit</button>
                  <button class="btn-action-icon delete" onclick="confirmDeleteSubject('${sub.id}')">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Subject Modal Handlers
   */
  window.openSubjectModal = function (subId = null) {
    const modal = document.getElementById('subjectModal');
    if (!modal) return;
    modal.classList.add('active');

    const sub = subId ? appData.subjects[subId] : null;
    document.getElementById('subModalTitle').textContent = sub ? 'Edit Subject' : 'Add New Subject';
    document.getElementById('subNameInput').value = sub ? sub.name : '';
    document.getElementById('subTagInput').value = sub ? sub.tag : '';
    document.getElementById('subDescInput').value = sub ? sub.desc : '';
  };

  window.closeSubjectModal = function () {
    const modal = document.getElementById('subjectModal');
    if (modal) modal.classList.remove('active');
  };

  window.saveSubject = function () {
    alert('Subject saved successfully!');
    closeSubjectModal();
    renderSubjectsView();
  };

  window.confirmDeleteSubject = function (subId) {
    if (confirm(`Are you sure you want to delete this subject? This action cannot be undone.`)) {
      delete appData.subjects[subId];
      renderSubjectsView();
    }
  };

  /**
   * Renders Manage Experiments View
   */
  function renderExperimentsView() {
    const container = document.getElementById('view-experiments');
    if (!container) return;

    container.innerHTML = `
      <div class="table-header-bar">
        <div>
          <h1 class="welcome-title" style="font-size: 1.6rem;">Manage Experiment Modules</h1>
          <p class="welcome-subtitle">Create, edit, duplicate, and publish lab modules across all subjects.</p>
        </div>
        <button class="btn-btn-add" onclick="window.location.hash='#create-exp'">+ Create Experiment</button>
      </div>

      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Experiment Title</th>
              <th>Subject</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${appData.experiments.map(exp => `
              <tr>
                <td><span class="mono" style="font-weight: 700;">${exp.tag}</span></td>
                <td><strong>${exp.title}</strong></td>
                <td><span class="mono" style="font-size: 0.72rem; color: ${appData.subjects[exp.subject]?.color || 'var(--ink)'};">${appData.subjects[exp.subject]?.name || exp.subject}</span></td>
                <td>${exp.difficulty}</td>
                <td><span class="status-pill ${exp.status} mono">${exp.status}</span></td>
                <td class="mono" style="font-size: 0.78rem;">${exp.lastUpdated}</td>
                <td class="actions-cell">
                  <button class="btn-action-icon" onclick="window.location.hash='#create-exp'">Edit</button>
                  <button class="btn-action-icon" onclick="duplicateExperiment('${exp.id}')">Duplicate</button>
                  <button class="btn-action-icon delete" onclick="confirmDeleteExp('${exp.id}')">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  window.duplicateExperiment = function (expId) {
    const found = appData.experiments.find(e => e.id === expId);
    if (found) {
      const copy = { ...found, id: `${found.id}-copy`, title: `${found.title} (Copy)`, status: 'draft' };
      appData.experiments.push(copy);
      renderExperimentsView();
    }
  };

  window.confirmDeleteExp = function (expId) {
    if (confirm(`Are you sure you want to delete experiment ${expId}?`)) {
      appData.experiments = appData.experiments.filter(e => e.id !== expId);
      renderExperimentsView();
    }
  };

  /**
   * Renders Multi-Step Create Experiment Wizard
   */
  function renderCreateExperimentWizard() {
    const container = document.getElementById('view-create-exp');
    if (!container) return;

    const step = state.wizardStep;

    container.innerHTML = `
      <div class="welcome-header">
        <h1 class="welcome-title" style="font-size: 1.6rem;">Create Experiment Wizard</h1>
        <p class="welcome-subtitle">Complete all 5 linear steps to build and publish an interactive experiment module.</p>
      </div>

      <!-- Step Progress Bar -->
      <div class="wizard-progress-bar">
        <div class="step-node ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}" onclick="setWizardStep(1)">
          <div class="step-circle">${step > 1 ? '✓' : '1'}</div>
          <span class="step-label">Details</span>
        </div>
        <div class="step-node ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}" onclick="setWizardStep(2)">
          <div class="step-circle">${step > 2 ? '✓' : '2'}</div>
          <span class="step-label">Content</span>
        </div>
        <div class="step-node ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}" onclick="setWizardStep(3)">
          <div class="step-circle">${step > 3 ? '✓' : '3'}</div>
          <span class="step-label">Media Upload</span>
        </div>
        <div class="step-node ${step === 4 ? 'active' : step > 4 ? 'completed' : ''}" onclick="setWizardStep(4)">
          <div class="step-circle">${step > 4 ? '✓' : '4'}</div>
          <span class="step-label">Create Quiz</span>
        </div>
        <div class="step-node ${step === 5 ? 'active' : ''}" onclick="setWizardStep(5)">
          <div class="step-circle">5</div>
          <span class="step-label">Publish</span>
        </div>
      </div>

      <!-- Wizard Step Content Container -->
      <div class="wizard-panel">
        ${renderWizardStepContent(step)}
      </div>

      <div class="wizard-nav-buttons">
        <button class="btn-nav-prev" onclick="setWizardStep(${Math.max(1, step - 1)})" ${step === 1 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>&larr; Previous Step</button>
        <button class="btn-nav-next" onclick="setWizardStep(${Math.min(5, step + 1)})">${step === 5 ? 'Finish & Review' : 'Next Step &rarr;'}</button>
      </div>
    `;
  }

  window.setWizardStep = function (stepNum) {
    state.wizardStep = stepNum;
    renderCreateExperimentWizard();
  };

  function renderWizardStepContent(step) {
    if (step === 1) {
      return `
        <h3 class="section-title">Step 1: Add Experiment Basic Details</h3>
        <div class="form-field">
          <label>Experiment Title</label>
          <input type="text" placeholder="e.g. Acid-Base Titration & Equivalence Point" value="${state.wizardData.title}" oninput="state.wizardData.title=this.value">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
          <div class="form-field">
            <label>Subject Division</label>
            <select onchange="state.wizardData.subject=this.value">
              <option value="chem">Chemistry Lab</option>
              <option value="phy">Physics Lab</option>
              <option value="elec">Electrical Lab (BEEE)</option>
            </select>
          </div>
          <div class="form-field">
            <label>Mono Tag</label>
            <input type="text" placeholder="e.g. CH-06" value="${state.wizardData.tag}" oninput="state.wizardData.tag=this.value">
          </div>
          <div class="form-field">
            <label>Difficulty Level</label>
            <select onchange="state.wizardData.difficulty=this.value">
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <label>Short Description</label>
          <textarea rows="3" placeholder="Brief summary of experiment goals..." oninput="state.wizardData.desc=this.value">${state.wizardData.desc}</textarea>
        </div>
      `;
    }

    if (step === 2) {
      return `
        <h3 class="section-title">Step 2: Build Theory, Procedure & Apparatus</h3>
        <div class="form-field">
          <label>Theory Overview Paragraph</label>
          <textarea rows="3" placeholder="Explain core concepts and governing physics/chemistry principles...">${state.wizardData.theory.intro}</textarea>
        </div>
        <div class="form-field">
          <label>Governing Equation / Key Relation Formula</label>
          <input type="text" placeholder="e.g. T = 2 * pi * sqrt(L / g)" value="${state.wizardData.theory.keyFormula}">
        </div>
        <div class="form-field">
          <label>Simulation Governing Formula Selection</label>
          <select>
            <option value="pendulum">Pendulum: T = 2π√(L/g)</option>
            <option value="projectile">Projectile Motion: Range = (v² × sin 2θ) / g</option>
            <option value="ohms">Ohm's Law: I = V / R</option>
            <option value="titration">Titration: M1V1 = M2V2</option>
          </select>
        </div>
      `;
    }

    if (step === 3) {
      return `
        <h3 class="section-title">Step 3: Upload Videos, PDFs & Diagrams</h3>
        <div style="border: 2px dashed rgba(21,42,80,0.25); border-radius: var(--r-md); padding: 40px; text-align: center; background: var(--paper-dim); cursor: pointer;" onclick="alert('File upload simulated! Document added.')">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" stroke-width="2" style="margin-bottom: 10px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          <p style="font-weight: 600; color: var(--ink);">Drag and drop lab manuals (PDF), videos (MP4), or schematic diagrams here</p>
          <p style="font-size: 0.78rem; color: var(--ink-soft); margin-top: 4px;">Supported formats: PDF, PNG, JPG, MP4 (Max 50MB)</p>
        </div>
      `;
    }

    if (step === 4) {
      return `
        <h3 class="section-title">Step 4: Multiple-Choice Quiz Builder</h3>
        <div class="form-field">
          <label>Question 1 Text</label>
          <input type="text" value="${state.wizardData.quiz[0].question}">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-field"><label>Option A</label><input type="text" value="${state.wizardData.quiz[0].options[0]}"></div>
          <div class="form-field"><label>Option B (Correct)</label><input type="text" value="${state.wizardData.quiz[0].options[1]}"></div>
          <div class="form-field"><label>Option C</label><input type="text" value="${state.wizardData.quiz[0].options[2]}"></div>
          <div class="form-field"><label>Option D</label><input type="text" value="${state.wizardData.quiz[0].options[3]}"></div>
        </div>
      `;
    }

    if (step === 5) {
      return `
        <h3 class="section-title">Step 5: Publish & Review Experiment</h3>
        <div style="background: var(--paper-dim); padding: 20px; border-radius: var(--r-md); margin-bottom: 20px;">
          <p><strong>Title:</strong> ${state.wizardData.title || 'Acid-Base Titration & Kinetics'}</p>
          <p><strong>Tag:</strong> ${state.wizardData.tag} &bull; <strong>Difficulty:</strong> ${state.wizardData.difficulty}</p>
          <p><strong>Status:</strong> Ready for Publishing</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="btn-primary-action" style="background: var(--paper-dim); color: var(--ink);" onclick="publishWizardExperiment('draft')">Save as Draft</button>
          <button class="btn-primary-action" onclick="publishWizardExperiment('published')">Publish Experiment Now</button>
        </div>
      `;
    }
  }

  window.publishWizardExperiment = function (status) {
    const newExp = {
      id: `exp-${Date.now()}`,
      tag: state.wizardData.tag || 'EXP-01',
      subject: state.wizardData.subject,
      title: state.wizardData.title || 'New Virtual Lab Experiment',
      status: status,
      difficulty: state.wizardData.difficulty,
      lastUpdated: new Date().toISOString().split('T')[0],
      enrolledStudents: status === 'published' ? 80 : 0,
      avgScore: status === 'published' ? 85 : 0,
      completionRate: status === 'published' ? 90 : 0
    };
    appData.experiments.push(newExp);
    alert(`Experiment successfully saved as ${status.toUpperCase()}!`);
    window.location.hash = '#experiments';
  };

  /**
   * Renders Reports & Student Performance
   */
  function renderReportsView() {
    const container = document.getElementById('view-reports');
    if (!container) return;

    container.innerHTML = `
      <div class="table-header-bar">
        <div>
          <h1 class="welcome-title" style="font-size: 1.6rem;">Student Performance Analytics</h1>
          <p class="welcome-subtitle">Monitor individual student progress, experiment trial logs, and export performance reports.</p>
        </div>
        <button class="btn-btn-add" onclick="generateReportDownload()">Download Performance Report (PDF/CSV)</button>
      </div>

      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Batch</th>
              <th>Subject Bench</th>
              <th>Completed</th>
              <th>Avg Score</th>
              <th>Hours Logged</th>
              <th>Last Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${appData.studentsSummary.map(st => `
              <tr>
                <td><strong>${st.name}</strong></td>
                <td class="mono">${st.roll}</td>
                <td class="mono">${st.batch}</td>
                <td>${st.subject}</td>
                <td>${st.expCompleted} / 5</td>
                <td><strong style="color: var(--chem);">${st.avgScore}%</strong></td>
                <td>${st.hoursLogged}h</td>
                <td style="font-size: 0.8rem; color: var(--ink-soft);">${st.lastActive}</td>
                <td><button class="btn-action-icon" onclick="openStudentDrawer('${st.roll}')">View Details</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  window.generateReportDownload = function () {
    alert('Generating report PDF/CSV... File download complete.');
  };

  window.openStudentDrawer = function (roll) {
    const st = appData.studentsSummary.find(s => s.roll === roll);
    if (!st) return;
    alert(`Student Drawer for ${st.name} (${st.roll})\nExperiments Completed: ${st.expCompleted}\nAverage Score: ${st.avgScore}%\nHours Logged: ${st.hoursLogged}h`);
  };

  /**
   * Renders Notifications View
   */
  function renderNotificationsView() {
    const container = document.getElementById('view-notifications');
    if (!container) return;

    container.innerHTML = `
      <div class="welcome-header">
        <h1 class="welcome-title" style="font-size: 1.6rem;">Compose Student Announcement</h1>
        <p class="welcome-subtitle">Send notifications and lab schedule updates to enrolled student batches.</p>
      </div>

      <div class="wizard-panel" style="margin-bottom: 32px;">
        <div class="form-field">
          <label>Target Audience</label>
          <select id="notifAudience">
            <option value="All Students">All Enrolled Students (240)</option>
            <option value="Chemistry Students">Chemistry Students (80)</option>
            <option value="Physics Students">Physics Students (80)</option>
            <option value="Electrical Students">Electrical Students (80)</option>
          </select>
        </div>
        <div class="form-field">
          <label>Notification Message</label>
          <textarea id="notifMsg" rows="3" placeholder="Enter announcement text..."></textarea>
        </div>
        <button class="btn-primary-action" onclick="sendNotification()">Send Notification Broadcast</button>
      </div>

      <h2 class="section-title">Sent Notifications History</h2>
      <div class="activity-feed">
        ${appData.notifications.map(n => `
          <div class="activity-item">
            <div>
              <div class="activity-text">${n.message}</div>
              <small class="mono" style="color: var(--ink-soft);">Audience: ${n.audience}</small>
            </div>
            <span class="activity-time mono">${n.sentAt} &bull; <strong style="color: var(--chem);">${n.status}</strong></span>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.sendNotification = function () {
    const msg = document.getElementById('notifMsg').value;
    const audience = document.getElementById('notifAudience').value;

    if (!msg) {
      alert('Please enter a notification message.');
      return;
    }

    appData.notifications.unshift({
      id: `n-${Date.now()}`,
      message: msg,
      audience: audience,
      sentAt: 'Just now',
      status: 'Delivered'
    });

    alert('Notification broadcast successfully delivered!');
    renderNotificationsView();
  };

  /**
   * Renders Faculty Profile View
   */
  function renderProfileView() {
    const container = document.getElementById('view-profile');
    if (!container) return;

    const f = appData.faculty;
    container.innerHTML = `
      <div class="profile-banner">
        <div class="profile-avatar-large">${f.initials}</div>
        <div>
          <p class="profile-roll-tag mono">FACULTY ID: ${f.facultyId}</p>
          <h1 class="profile-main-name">${f.name}</h1>
          <p class="profile-program-text">${f.designation} &bull; ${f.department}</p>
        </div>
      </div>

      <div class="stats-grid" style="margin-bottom: 32px;">
        <div class="stat-card"><div class="stat-label mono">Subjects Handled</div><div class="stat-value">${f.stats.subjectsHandled}</div></div>
        <div class="stat-card"><div class="stat-label mono">Experiments Published</div><div class="stat-value">${f.stats.experimentsPublished}</div></div>
        <div class="stat-card"><div class="stat-label mono">Students Mentored</div><div class="stat-value">${f.stats.studentsEnrolled}</div></div>
        <div class="stat-card"><div class="stat-label mono">Average Class Score</div><div class="stat-value">${f.stats.avgClassScore}%</div></div>
      </div>

      <div class="data-table-wrap">
        <h3 class="section-title" style="margin-bottom: 16px;">Faculty Credentials</h3>
        <div class="form-field"><label>Email Address</label><input type="text" value="${f.email}"></div>
        <div class="form-field"><label>Phone Contact</label><input type="text" value="${f.phone}"></div>
        <div class="form-field"><label>Department</label><input type="text" value="${f.department}"></div>
        <button class="btn-primary-action" style="max-width: 200px; margin-top: 10px;" onclick="alert('Profile updated successfully!')">Save Profile Changes</button>
      </div>
    `;
  }

  // Bind global functions & initialize app on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
