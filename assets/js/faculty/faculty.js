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
    wizardActiveTab: 'theory',
    wizardData: {
      title: '', subject: 'chem', tag: 'CH·06', desc: '', difficulty: 'Basic',
      theory: { intro: '', objectives: ['Perform volumetric measurements.', 'Determine equivalence point.'], keyFormula: 'M1V1 = M2V2' },
      procedure: [{ step: 'Fill buret with standard solution.', simType: 'titration' }, { step: 'Add indicator to flask.', simType: 'titration' }],
      apparatus: [{ name: 'Buret', qty: '1 unit' }, { name: 'Erlenmeyer Flask', qty: '1 unit' }],
      media: [],
      quiz: [{ question: 'What color does phenolphthalein turn in base?', options: ['Colorless', 'Pink', 'Blue', 'Yellow'], correctIndex: 1 }]
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

    // Spotlight cursor tracking on dark surfaces
    document.addEventListener('mousemove', e => {
      const header = document.querySelector('.global-header');
      const sidebar = document.querySelector('.sidebar');
      if (header) {
        const rect = header.getBoundingClientRect();
        header.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        header.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
      if (sidebar) {
        const rect = sidebar.getBoundingClientRect();
        sidebar.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        sidebar.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    });

    // Close dropdowns on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.btn-notif-bell') && !e.target.closest('#notifDropdownPanel')) {
        const p = document.getElementById('notifDropdownPanel');
        if (p) p.classList.remove('active');
      }
      if (!e.target.closest('.header-user-chip') && !e.target.closest('#profileDropdownPanel')) {
        const p = document.getElementById('profileDropdownPanel');
        if (p) p.classList.remove('active');
      }
      if (!e.target.closest('.global-search-wrap')) {
        const p = document.getElementById('globalSearchResults');
        if (p) p.classList.remove('active');
      }
    });
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
  }

  // Modal Overlays
  window.openPrivacyModal = function () {
    const m = document.getElementById('privacyModal');
    if (m) m.style.display = 'flex';
  };
  window.openTermsModal = function () {
    const m = document.getElementById('termsModal');
    if (m) m.style.display = 'flex';
  };
  window.openHelpModal = function () {
    const m = document.getElementById('helpModal');
    if (m) m.style.display = 'flex';
  };
  window.closeLegalModal = function (modalId) {
    const m = document.getElementById(modalId);
    if (m) m.style.display = 'none';
  };

  // Header Dropdowns
  window.toggleNotifDropdown = function () {
    const notif = document.getElementById('notifDropdownPanel');
    const profile = document.getElementById('profileDropdownPanel');
    if (profile) profile.classList.remove('active');
    if (notif) notif.classList.toggle('active');
  };

  window.toggleProfileDropdown = function () {
    const notif = document.getElementById('notifDropdownPanel');
    const profile = document.getElementById('profileDropdownPanel');
    if (notif) notif.classList.remove('active');
    if (profile) profile.classList.toggle('active');
  };

  window.handleLanguageChange = function (lang) {
    alert(`Language changed to: ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Marathi'}`);
  };

  window.handleGlobalSearch = function (query) {
    const dropdown = document.getElementById('globalSearchResults');
    if (!dropdown) return;

    if (!query.trim()) {
      dropdown.classList.remove('active');
      return;
    }

    const q = query.toLowerCase();
    
    // Filter subjects
    const matchedSubjects = Object.values(appData.subjects).filter(s => 
      s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q)
    );

    // Filter experiments
    const matchedExperiments = appData.experiments.filter(e => 
      e.title.toLowerCase().includes(q) || e.tag.toLowerCase().includes(q)
    );

    // Filter students
    const matchedStudents = appData.studentsSummary.filter(st => 
      st.name.toLowerCase().includes(q) || st.roll.toLowerCase().includes(q)
    );

    if (matchedSubjects.length === 0 && matchedExperiments.length === 0 && matchedStudents.length === 0) {
      dropdown.innerHTML = `<div style="padding: 12px; font-size: 0.88rem; color: var(--ink-soft); text-align: center;">No matches found</div>`;
      dropdown.classList.add('active');
      return;
    }

    let html = '';
    if (matchedSubjects.length > 0) {
      html += `<div class="search-group-header">Subjects</div>`;
      matchedSubjects.forEach(s => {
        html += `<div class="search-result-item" onclick="window.location.hash='#subjects'; document.getElementById('globalSearchResults').classList.remove('active');">
          <span>${s.name}</span>
          <span class="mono" style="font-size: 0.7rem; padding: 2px 6px; background: rgba(21,42,80,0.05); border-radius: 4px;">${s.tag}</span>
        </div>`;
      });
    }

    if (matchedExperiments.length > 0) {
      html += `<div class="search-group-header">Experiments</div>`;
      matchedExperiments.forEach(e => {
        html += `<div class="search-result-item" onclick="window.location.hash='#experiments'; document.getElementById('globalSearchResults').classList.remove('active');">
          <span>${e.title}</span>
          <span class="mono" style="font-size: 0.7rem; color: ${appData.subjects[e.subject]?.color || 'var(--ink-soft)'};">${e.tag}</span>
        </div>`;
      });
    }

    if (matchedStudents.length > 0) {
      html += `<div class="search-group-header">Students</div>`;
      matchedStudents.forEach(st => {
        html += `<div class="search-result-item" onclick="window.location.hash='#reports'; openStudentDrawer('${st.roll}'); document.getElementById('globalSearchResults').classList.remove('active');">
          <span>${st.name} (${st.roll})</span>
          <span style="font-size: 0.8rem; color: var(--ink-soft);">${st.batch}</span>
        </div>`;
      });
    }

    dropdown.innerHTML = html;
    dropdown.classList.add('active');
  };

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

  window.switchWizardTab = function (tabName) {
    state.wizardActiveTab = tabName;
    renderCreateExperimentWizard();
  };

  window.addObjective = function () {
    state.wizardData.theory.objectives.push('');
    renderCreateExperimentWizard();
  };

  window.removeObjective = function (index) {
    state.wizardData.theory.objectives.splice(index, 1);
    if (state.wizardData.theory.objectives.length === 0) {
      state.wizardData.theory.objectives.push('');
    }
    renderCreateExperimentWizard();
  };

  window.addProcedureStep = function () {
    state.wizardData.procedure.push({ step: '', simType: 'ohms' });
    renderCreateExperimentWizard();
  };

  window.removeProcedureStep = function (index) {
    state.wizardData.procedure.splice(index, 1);
    if (state.wizardData.procedure.length === 0) {
      state.wizardData.procedure.push({ step: '', simType: 'ohms' });
    }
    renderCreateExperimentWizard();
  };

  window.addApparatus = function () {
    state.wizardData.apparatus.push({ name: '', qty: '' });
    renderCreateExperimentWizard();
  };

  window.removeApparatus = function (index) {
    state.wizardData.apparatus.splice(index, 1);
    if (state.wizardData.apparatus.length === 0) {
      state.wizardData.apparatus.push({ name: '', qty: '' });
    }
    renderCreateExperimentWizard();
  };

  window.simulateUpload = function (type) {
    const filename = type === 'pdf' ? 'Lab_Manual_CS3.pdf' : type === 'video' ? 'Pendulum_Decay_Trace.mp4' : 'Schematic_Layout.png';
    state.wizardData.media.push({
      type: type,
      filename: filename,
      progress: 0
    });
    renderCreateExperimentWizard();

    // Animate progress
    const itemIndex = state.wizardData.media.length - 1;
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      if (p > 100) {
        p = 100;
        clearInterval(interval);
      }
      state.wizardData.media[itemIndex].progress = p;
      const progressFill = document.getElementById(`upload-progress-${itemIndex}`);
      const progressText = document.getElementById(`upload-text-${itemIndex}`);
      if (progressFill) progressFill.style.width = `${p}%`;
      if (progressText) progressText.textContent = `${p}%`;
    }, 150);
  };

  window.removeUpload = function (index) {
    state.wizardData.media.splice(index, 1);
    renderCreateExperimentWizard();
  };

  window.addQuestion = function () {
    state.wizardData.quiz.push({
      question: 'New Question',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctIndex: 0
    });
    renderCreateExperimentWizard();
  };

  window.removeQuestion = function (index) {
    state.wizardData.quiz.splice(index, 1);
    if (state.wizardData.quiz.length === 0) {
      state.wizardData.quiz.push({
        question: 'New Question',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: 0
      });
    }
    renderCreateExperimentWizard();
  };

  window.addQuizOption = function (qIndex) {
    state.wizardData.quiz[qIndex].options.push('New Option');
    renderCreateExperimentWizard();
  };

  window.removeQuizOption = function (qIndex, oIndex) {
    state.wizardData.quiz[qIndex].options.splice(oIndex, 1);
    if (state.wizardData.quiz[qIndex].options.length < 2) {
      alert('A question must have at least 2 options.');
      state.wizardData.quiz[qIndex].options.push('Option');
    }
    if (state.wizardData.quiz[qIndex].correctIndex >= state.wizardData.quiz[qIndex].options.length) {
      state.wizardData.quiz[qIndex].correctIndex = 0;
    }
    renderCreateExperimentWizard();
  };

  window.setCorrectOption = function (qIndex, oIndex) {
    state.wizardData.quiz[qIndex].correctIndex = oIndex;
  };

  function renderWizardStepContent(step) {
    if (step === 1) {
      return `
        <h3 class="section-title" style="margin-bottom:16px;">Step 1: Add Experiment Basic Details</h3>
        <div class="form-field">
          <label>Experiment Title</label>
          <input type="text" placeholder="e.g. Acid-Base Titration & Equivalence Point" value="${state.wizardData.title}" oninput="state.wizardData.title=this.value">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
          <div class="form-field">
            <label>Subject Division</label>
            <select onchange="state.wizardData.subject=this.value" style="width: 100%; padding: 8px; border-radius: var(--r-sm); border: 1px solid rgba(21,42,80,0.15);">
              <option value="chem" ${state.wizardData.subject === 'chem' ? 'selected' : ''}>Chemistry Lab</option>
              <option value="phy" ${state.wizardData.subject === 'phy' ? 'selected' : ''}>Physics Lab</option>
              <option value="elec" ${state.wizardData.subject === 'elec' ? 'selected' : ''}>Electrical Lab (BEEE)</option>
            </select>
          </div>
          <div class="form-field">
            <label>Mono Tag</label>
            <input type="text" placeholder="e.g. CH-06" value="${state.wizardData.tag}" oninput="state.wizardData.tag=this.value">
          </div>
          <div class="form-field">
            <label>Difficulty Level</label>
            <select onchange="state.wizardData.difficulty=this.value" style="width: 100%; padding: 8px; border-radius: var(--r-sm); border: 1px solid rgba(21,42,80,0.15);">
              <option value="Basic" ${state.wizardData.difficulty === 'Basic' ? 'selected' : ''}>Basic</option>
              <option value="Intermediate" ${state.wizardData.difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="Advanced" ${state.wizardData.difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
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
      const activeTab = state.wizardActiveTab || 'theory';
      let tabContentHTML = '';

      if (activeTab === 'theory') {
        tabContentHTML = `
          <div class="form-field">
            <label>Theory Overview Paragraph</label>
            <textarea rows="3" placeholder="Explain core concepts and governing principles..." oninput="state.wizardData.theory.intro=this.value">${state.wizardData.theory.intro}</textarea>
          </div>
          <div class="form-field">
            <label>Key Relation / Governing Formula Input</label>
            <input type="text" placeholder="e.g. T = 2 * pi * sqrt(L / g)" value="${state.wizardData.theory.keyFormula}" oninput="state.wizardData.theory.keyFormula=this.value">
          </div>
          <div class="form-field">
            <label>Learning Objectives</label>
            <div id="objectives-list">
              ${state.wizardData.theory.objectives.map((obj, idx) => `
                <div class="builder-row">
                  <input type="text" placeholder="Objective ${idx + 1}" value="${obj}" oninput="state.wizardData.theory.objectives[${idx}]=this.value" style="flex:1; padding: 6px 10px; border-radius:4px; border:1px solid rgba(21,42,80,0.15);">
                  <button class="btn-remove-row" onclick="removeObjective(${idx})">&times; Remove</button>
                </div>
              `).join('')}
            </div>
            <button class="btn-add-row" onclick="addObjective()">+ Add Objective</button>
          </div>
        `;
      } else if (activeTab === 'procedure') {
        tabContentHTML = `
          <div class="form-field">
            <label>Simulation Governing Formula Selection</label>
            <select onchange="state.wizardData.simFormula=this.value" style="width: 100%; padding: 8px; border-radius: var(--r-sm); border: 1px solid rgba(21,42,80,0.15);">
              <option value="pendulum" ${state.wizardData.simFormula === 'pendulum' ? 'selected' : ''}>Pendulum: T = 2π√(L/g)</option>
              <option value="projectile" ${state.wizardData.simFormula === 'projectile' ? 'selected' : ''}>Projectile Motion: Range = (v² × sin 2θ) / g</option>
              <option value="ohms" ${state.wizardData.simFormula === 'ohms' ? 'selected' : ''}>Ohm's Law: I = V / R</option>
              <option value="titration" ${state.wizardData.simFormula === 'titration' ? 'selected' : ''}>Titration: M1V1 = M2V2</option>
            </select>
          </div>
          <div class="form-field">
            <label>Procedure Steps</label>
            <div id="procedure-steps-list">
              ${state.wizardData.procedure.map((p, idx) => `
                <div class="builder-row" style="align-items: flex-start;">
                  <span class="mono" style="margin-top: 10px; font-weight: 700; width: 24px;">${idx + 1}.</span>
                  <textarea rows="2" placeholder="Step ${idx + 1} instruction" oninput="state.wizardData.procedure[${idx}].step=this.value" style="flex:1; border: 1px solid rgba(21,42,80,0.15); border-radius: var(--r-sm); padding: 8px;">${p.step}</textarea>
                  <button class="btn-remove-row" onclick="removeProcedureStep(${idx})" style="margin-top: 6px;">&times; Remove</button>
                </div>
              `).join('')}
            </div>
            <button class="btn-add-row" onclick="addProcedureStep()">+ Add Step</button>
          </div>
        `;
      } else if (activeTab === 'apparatus') {
        tabContentHTML = `
          <div class="form-field">
            <label>Apparatus Checklist Grid</label>
            <div id="apparatus-list">
              ${state.wizardData.apparatus.map((app, idx) => `
                <div class="builder-row">
                  <input type="text" placeholder="Material Name" value="${app.name}" oninput="state.wizardData.apparatus[${idx}].name=this.value" style="flex: 2; padding: 6px 10px; border-radius:4px; border:1px solid rgba(21,42,80,0.15);">
                  <input type="text" placeholder="Quantity (e.g. 1 unit)" value="${app.qty}" oninput="state.wizardData.apparatus[${idx}].qty=this.value" style="flex: 1; padding: 6px 10px; border-radius:4px; border:1px solid rgba(21,42,80,0.15);">
                  <button class="btn-remove-row" onclick="removeApparatus(${idx})">&times; Remove</button>
                </div>
              `).join('')}
            </div>
            <button class="btn-add-row" onclick="addApparatus()">+ Add Material</button>
          </div>
        `;
      }

      return `
        <h3 class="section-title">Step 2: Build Theory, Procedure & Apparatus</h3>
        <div class="wizard-tabs">
          <button class="wizard-tab-btn ${activeTab === 'theory' ? 'active' : ''}" onclick="switchWizardTab('theory')">Theory Overview</button>
          <button class="wizard-tab-btn ${activeTab === 'procedure' ? 'active' : ''}" onclick="switchWizardTab('procedure')">Procedure & Simulation</button>
          <button class="wizard-tab-btn ${activeTab === 'apparatus' ? 'active' : ''}" onclick="switchWizardTab('apparatus')">Apparatus Grid</button>
        </div>
        <div class="wizard-tab-content">
          ${tabContentHTML}
        </div>
      `;
    }

    if (step === 3) {
      return `
        <h3 class="section-title">Step 3: Upload Videos, PDFs & Diagrams</h3>
        <div style="border: 2px dashed rgba(21,42,80,0.25); border-radius: var(--r-md); padding: 40px; text-align: center; background: var(--paper-dim); cursor: pointer;" onclick="simulateUpload('pdf')">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" stroke-width="2" style="margin-bottom: 10px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          <p style="font-weight: 600; color: var(--ink);">Drag and drop lab manuals (PDF), videos (MP4), or schematic diagrams here</p>
          <p style="font-size: 0.78rem; color: var(--ink-soft); margin-top: 4px;">Or click here to simulate file upload</p>
        </div>

        <div style="margin-top: 24px;">
          <h4 class="mono" style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 12px;">Simulate uploads:</h4>
          <div style="display: flex; gap: 8px;">
            <button class="btn-add-row" onclick="simulateUpload('pdf')">📄 Add PDF Manual</button>
            <button class="btn-add-row" onclick="simulateUpload('video')">🎥 Add MP4 Video</button>
            <button class="btn-add-row" onclick="simulateUpload('image')">🖼️ Add Schematic Image</button>
          </div>
        </div>

        ${state.wizardData.media.length > 0 ? `
          <div style="margin-top: 24px;">
            <h4 class="section-subtitle" style="font-size: 0.9rem; margin-bottom: 12px;">Staged Media Files (${state.wizardData.media.length})</h4>
            <div>
              ${state.wizardData.media.map((med, idx) => `
                <div class="media-upload-item">
                  <div style="flex: 1; padding-right: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong>${med.filename}</strong>
                      <span class="mono" id="upload-text-${idx}" style="font-size: 0.75rem;">${med.progress}%</span>
                    </div>
                    <div class="upload-progress-bar">
                      <div class="upload-progress-fill" id="upload-progress-${idx}" style="width: ${med.progress}%;"></div>
                    </div>
                  </div>
                  <button class="btn-remove-row" onclick="removeUpload(${idx})">&times; Remove</button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
    }

    if (step === 4) {
      return `
        <h3 class="section-title">Step 4: Multiple-Choice Quiz Builder</h3>
        <div id="quiz-questions-container">
          ${state.wizardData.quiz.map((q, qIdx) => `
            <div class="drawer-section" style="position: relative;">
              <button class="btn-remove-row" onclick="removeQuestion(${qIdx})" style="position: absolute; top: 12px; right: 16px;">&times; Remove Question</button>
              <h4 class="mono" style="margin-bottom: 12px; color: var(--ink);">Question ${qIdx + 1}</h4>
              <div class="form-field">
                <label>Question Text</label>
                <input type="text" placeholder="Enter question..." value="${q.question}" oninput="state.wizardData.quiz[${qIdx}].question=this.value">
              </div>
              <div class="form-field">
                <label>Options & Correct Answer Choice</label>
                <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                  ${q.options.map((opt, oIdx) => `
                    <div class="builder-row">
                      <input type="radio" name="correct-${qIdx}" ${q.correctIndex === oIdx ? 'checked' : ''} onchange="setCorrectOption(${qIdx}, ${oIdx})">
                      <input type="text" placeholder="Option ${oIdx + 1}" value="${opt}" oninput="state.wizardData.quiz[${qIdx}].options[${oIdx}]=this.value" style="flex:1; padding: 6px 10px; border-radius:4px; border:1px solid rgba(21,42,80,0.15);">
                      <button class="btn-remove-row" onclick="removeQuizOption(${qIdx}, ${oIdx})">&times;</button>
                    </div>
                  `).join('')}
                </div>
                <button class="btn-add-row" onclick="addQuizOption(${qIdx})" style="margin-top: 10px;">+ Add Option</button>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn-add-row" onclick="addQuestion()" style="width: 100%; padding: 12px; margin-top: 12px; background: rgba(55, 183, 160, 0.08); border: 2px dashed var(--chem); border-radius: var(--r-md); font-weight: 700;">+ Add New Question</button>
      `;
    }

    if (step === 5) {
      return `
        <h3 class="section-title">Step 5: Publish & Review Experiment</h3>
        <div style="background: var(--paper-dim); padding: 24px; border-radius: var(--r-md); border: 1px solid rgba(21, 42, 80, 0.12); margin-bottom: 24px; line-height: 1.8;">
          <p><strong>Title:</strong> ${state.wizardData.title || 'Untitled Experiment'}</p>
          <p><strong>Subject:</strong> ${appData.subjects[state.wizardData.subject]?.name || state.wizardData.subject}</p>
          <p><strong>Tag Code:</strong> ${state.wizardData.tag} &bull; <strong>Difficulty:</strong> ${state.wizardData.difficulty}</p>
          <p><strong>Theory:</strong> ${state.wizardData.theory.intro ? state.wizardData.theory.intro.substring(0, 100) + '...' : 'Not specified'}</p>
          <p><strong>Steps:</strong> ${state.wizardData.procedure.length} steps defined</p>
          <p><strong>Materials:</strong> ${state.wizardData.apparatus.length} apparatus items listed</p>
          <p><strong>Media Uploads:</strong> ${state.wizardData.media.length} files staged</p>
          <p><strong>Quiz Questions:</strong> ${state.wizardData.quiz.length} questions built</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="btn-primary-action" style="background: var(--paper-dim); color: var(--ink); border: 1px solid rgba(21, 42, 80, 0.15);" onclick="publishWizardExperiment('draft')">Save as Draft</button>
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
        <button class="btn-btn-add" id="btnGenReport" onclick="generateReportDownload()">Download Performance Report (PDF/CSV)</button>
      </div>

      <!-- Filter Bar -->
      <div class="wizard-panel" style="display: flex; gap: 16px; flex-wrap: wrap; padding: 16px; margin-bottom: 24px; background: var(--paper-dim);">
        <div style="flex: 1; min-width: 150px;">
          <label class="mono" style="font-size: 0.65rem; color: var(--ink-soft); display: block; margin-bottom: 4px;">Subject</label>
          <select id="reportFilterSubject" onchange="filterReports()" style="width:100%; padding: 6px; border-radius:4px; border:1px solid rgba(21,42,80,0.15);">
            <option value="all">All Subjects</option>
            <option value="chemistry">Chemistry Lab</option>
            <option value="physics">Physics Lab</option>
            <option value="electrical">Electrical Lab</option>
          </select>
        </div>
        <div style="flex: 1; min-width: 150px;">
          <label class="mono" style="font-size: 0.65rem; color: var(--ink-soft); display: block; margin-bottom: 4px;">Batch</label>
          <select id="reportFilterBatch" onchange="filterReports()" style="width:100%; padding: 6px; border-radius:4px; border:1px solid rgba(21,42,80,0.15);">
            <option value="all">All Batches</option>
            <option value="CS-3A">CS-3A</option>
            <option value="CS-3B">CS-3B</option>
            <option value="ECE-2A">ECE-2A</option>
            <option value="ME-2B">ME-2B</option>
          </select>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <label class="mono" style="font-size: 0.65rem; color: var(--ink-soft); display: block; margin-bottom: 4px;">Search Student</label>
          <input type="text" id="reportFilterSearch" placeholder="Search by name or roll..." oninput="filterReports()" style="width:100%; padding: 6px 12px; border-radius:4px; border:1px solid rgba(21,42,80,0.15);">
        </div>
      </div>

      <!-- SVG Analytics Charts Section -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 28px;">
        <!-- Chart 1: Average Score by Subject -->
        <div class="stat-card" style="padding: 20px;">
          <h3 class="mono" style="font-size: 0.8rem; margin-bottom: 16px; color: var(--ink);">Class Average Score by Subject</h3>
          <svg viewBox="0 0 300 160" width="100%" height="160">
            <line x1="40" y1="20" x2="280" y2="20" stroke="rgba(21,42,80,0.06)" stroke-width="1" />
            <line x1="40" y1="70" x2="280" y2="70" stroke="rgba(21,42,80,0.06)" stroke-width="1" />
            <line x1="40" y1="120" x2="280" y2="120" stroke="rgba(21,42,80,0.06)" stroke-width="1" />
            <rect x="65" y="42" width="30" height="78" fill="var(--chem)" rx="2" />
            <rect x="145" y="47" width="30" height="73" fill="var(--physics)" rx="2" />
            <rect x="225" y="36" width="30" height="84" fill="var(--electrical)" rx="2" />
            <line x1="40" y1="120" x2="280" y2="120" stroke="var(--ink)" stroke-width="1" />
            <text x="80" y="140" font-size="9" fill="var(--ink-soft)" font-family="var(--font-mono)" text-anchor="middle">CHEM</text>
            <text x="160" y="140" font-size="9" fill="var(--ink-soft)" font-family="var(--font-mono)" text-anchor="middle">PHYS</text>
            <text x="240" y="140" font-size="9" fill="var(--ink-soft)" font-family="var(--font-mono)" text-anchor="middle">ELEC</text>
            <text x="80" y="34" font-size="10" font-weight="700" fill="var(--ink)" text-anchor="middle">88%</text>
            <text x="160" y="39" font-size="10" font-weight="700" fill="var(--ink)" text-anchor="middle">83%</text>
            <text x="240" y="28" font-size="10" font-weight="700" fill="var(--ink)" text-anchor="middle">92%</text>
          </svg>
        </div>

        <!-- Chart 2: Completion Rate by Experiment -->
        <div class="stat-card" style="padding: 20px;">
          <h3 class="mono" style="font-size: 0.8rem; margin-bottom: 16px; color: var(--ink);">Experiment Completion Rate</h3>
          <svg viewBox="0 0 300 160" width="100%" height="160">
            <text x="10" y="30" font-size="10" fill="var(--ink)" font-family="var(--font-mono)">CH·01</text>
            <rect x="60" y="21" width="180" height="12" fill="rgba(21,42,80,0.06)" rx="3" />
            <rect x="60" y="21" width="171" height="12" fill="var(--chem)" rx="3" />
            <text x="250" y="30" font-size="9" font-weight="700" fill="var(--ink)">95%</text>
            
            <text x="10" y="65" font-size="10" fill="var(--ink)" font-family="var(--font-mono)">PH·01</text>
            <rect x="60" y="56" width="180" height="12" fill="rgba(21,42,80,0.06)" rx="3" />
            <rect x="60" y="56" width="173" height="12" fill="var(--physics)" rx="3" />
            <text x="250" y="65" font-size="9" font-weight="700" fill="var(--ink)">96%</text>

            <text x="10" y="100" font-size="10" fill="var(--ink)" font-family="var(--font-mono)">EE·01</text>
            <rect x="60" y="91" width="180" height="12" fill="rgba(21,42,80,0.06)" rx="3" />
            <rect x="60" y="91" width="178" height="12" fill="var(--electrical)" rx="3" />
            <text x="250" y="100" font-size="9" font-weight="700" fill="var(--ink)">99%</text>
          </svg>
        </div>

        <!-- Chart 3: Score Distribution -->
        <div class="stat-card" style="padding: 20px;">
          <h3 class="mono" style="font-size: 0.8rem; margin-bottom: 16px; color: var(--ink);">Score Distribution Curve</h3>
          <svg viewBox="0 0 300 160" width="100%" height="160">
            <path d="M 40 120 Q 90 120 120 80 T 200 40 T 280 120 Z" fill="rgba(55,183,160,0.12)" />
            <path d="M 40 120 Q 90 120 120 80 T 200 40 T 280 120" fill="none" stroke="var(--chem)" stroke-width="2" />
            <line x1="40" y1="120" x2="280" y2="120" stroke="var(--ink)" stroke-width="1" />
            <text x="40" y="135" font-size="9" fill="var(--ink-soft)" font-family="var(--font-mono)" text-anchor="middle">&lt;60%</text>
            <text x="120" y="135" font-size="9" fill="var(--ink-soft)" font-family="var(--font-mono)" text-anchor="middle">70%</text>
            <text x="200" y="135" font-size="9" fill="var(--ink-soft)" font-family="var(--font-mono)" text-anchor="middle">80%</text>
            <text x="280" y="135" font-size="9" fill="var(--ink-soft)" font-family="var(--font-mono)" text-anchor="middle">90%+</text>
          </svg>
        </div>
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
          <tbody id="reportsTableBody">
            ${renderReportsTableRows(appData.studentsSummary)}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderReportsTableRows(students) {
    return students.map(st => `
      <tr class="student-row">
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
    `).join('');
  }

  window.filterReports = function () {
    const sub = document.getElementById('reportFilterSubject').value;
    const batch = document.getElementById('reportFilterBatch').value;
    const query = document.getElementById('reportFilterSearch').value.toLowerCase();

    let filtered = appData.studentsSummary;

    if (sub !== 'all') {
      const subName = sub === 'chemistry' ? 'chemistry lab' : sub === 'physics' ? 'physics lab' : 'electrical lab';
      filtered = filtered.filter(st => st.subject.toLowerCase() === subName);
    }
    if (batch !== 'all') {
      filtered = filtered.filter(st => st.batch === batch);
    }
    if (query) {
      filtered = filtered.filter(st => 
        st.name.toLowerCase().includes(query) || st.roll.toLowerCase().includes(query)
      );
    }

    const tbody = document.getElementById('reportsTableBody');
    if (tbody) tbody.innerHTML = renderReportsTableRows(filtered);
  };

  window.generateReportDownload = function () {
    const btn = document.getElementById('btnGenReport');
    if (!btn) return;

    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Generating PDF/CSV Report...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      alert('Report generated and downloaded successfully!');
      btn.disabled = false;
      btn.textContent = originalText;
      btn.style.opacity = '1';
    }, 1500);
  };

  window.openStudentDrawer = function (roll) {
    const st = appData.studentsSummary.find(s => s.roll === roll);
    if (!st) return;

    const drawer = document.getElementById('studentDrawer');
    const content = document.getElementById('studentDrawerContent');
    if (!drawer || !content) return;

    content.innerHTML = `
      <span class="drawer-close-btn" onclick="closeStudentDrawer()">&times;</span>
      <h2 class="drawer-title" style="margin-top:16px;">${st.name}</h2>
      <p class="drawer-subtitle">ROLL NUMBER: ${st.roll} &bull; BATCH: ${st.batch}</p>

      <div class="drawer-section">
        <h3 class="drawer-section-title">Telemetry Summary</h3>
        <p><strong>Subject Bench:</strong> ${st.subject}</p>
        <p><strong>Experiments Completed:</strong> ${st.expCompleted} / 5</p>
        <p><strong>Average Performance Score:</strong> ${st.avgScore}%</p>
        <p><strong>Total Hours Logged:</strong> ${st.hoursLogged} hours</p>
        <p><strong>Last Active Timestamp:</strong> ${st.lastActive}</p>
      </div>

      <div class="drawer-section">
        <h3 class="drawer-section-title">Completed Trial Log Details</h3>
        <div style="font-size: 0.85rem; line-height: 1.8;">
          <p><strong>Trial 1:</strong> Completed successfully (Score: ${st.avgScore + 2}%, Time: 45 min)</p>
          <p><strong>Trial 2:</strong> Completed successfully (Score: ${st.avgScore - 4}%, Time: 52 min)</p>
          <p><strong>Trial 3:</strong> Completed successfully (Score: ${st.avgScore}%, Time: 38 min)</p>
        </div>
      </div>
    `;

    drawer.classList.add('active');
    content.classList.add('active');
  };

  window.closeStudentDrawer = function () {
    const drawer = document.getElementById('studentDrawer');
    const content = document.getElementById('studentDrawerContent');
    if (drawer && content) {
      drawer.classList.remove('active');
      content.classList.remove('active');
    }
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
        <p class="welcome-subtitle">Send notifications, broadcast alerts, and lab schedule updates to enrolled student batches.</p>
      </div>

      <div class="wizard-panel" style="margin-bottom: 32px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div class="form-field" style="margin-bottom: 0;">
            <label>Target Audience</label>
            <select id="notifAudience" onchange="toggleIndividualInput(this.value)" style="width: 100%; padding: 8px; border-radius: var(--r-sm); border: 1px solid rgba(21,42,80,0.15);">
              <option value="All Students">All Enrolled Students (240)</option>
              <option value="Chemistry Students">Chemistry Students (80)</option>
              <option value="Physics Students">Physics Students (80)</option>
              <option value="Electrical Students">Electrical Students (80)</option>
              <option value="Batch CS-3A">Batch CS-3A (40)</option>
              <option value="Batch CS-3B">Batch CS-3B (40)</option>
              <option value="Individual">Individual Student</option>
            </select>
          </div>
          <div class="form-field" id="individualStudentWrap" style="display: none; margin-bottom: 0;">
            <label>Student Roll Number</label>
            <input type="text" id="notifStudentRoll" placeholder="e.g. 21AI045" style="width: 100%; padding: 8px; border-radius: var(--r-sm); border: 1px solid rgba(21,42,80,0.15);">
          </div>
        </div>
        <div class="form-field">
          <label>Notification Message</label>
          <textarea id="notifMsg" rows="3" placeholder="Enter broadcast message text..."></textarea>
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

  window.toggleIndividualInput = function (val) {
    const wrap = document.getElementById('individualStudentWrap');
    if (wrap) {
      wrap.style.display = val === 'Individual' ? 'block' : 'none';
    }
  };

  window.sendNotification = function () {
    const msg = document.getElementById('notifMsg').value;
    let audience = document.getElementById('notifAudience').value;

    if (!msg) {
      alert('Please enter a notification message.');
      return;
    }

    if (audience === 'Individual') {
      const roll = document.getElementById('notifStudentRoll').value.trim();
      if (!roll) {
        alert('Please enter the target student roll number.');
        return;
      }
      audience = `Student Roll: ${roll}`;
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
    const editing = state.profileEditing || false;

    let formHTML = '';
    if (editing) {
      formHTML = `
        <div class="form-field"><label>Email Address</label><input type="text" id="profEmail" value="${f.email}"></div>
        <div class="form-field"><label>Phone Contact</label><input type="text" id="profPhone" value="${f.phone}"></div>
        <div class="form-field"><label>Department</label><input type="text" id="profDept" value="${f.department}"></div>
        <div class="form-field"><label>Designation</label><input type="text" id="profDesg" value="${f.designation}"></div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-primary-action" style="max-width: 200px; margin-top: 10px;" onclick="saveProfileChanges()">Save Profile Changes</button>
          <button class="btn-primary-action" style="max-width: 200px; margin-top: 10px; background: var(--paper-dim); color: var(--ink); border: 1px solid rgba(21,42,80,0.15);" onclick="toggleProfileEdit(false)">Cancel</button>
        </div>
      `;
    } else {
      formHTML = `
        <div class="form-field"><label>Email Address</label><div style="padding: 10px 0; font-size: 0.95rem; font-weight: 600;">${f.email}</div></div>
        <div class="form-field"><label>Phone Contact</label><div style="padding: 10px 0; font-size: 0.95rem; font-weight: 600;">${f.phone}</div></div>
        <div class="form-field"><label>Department</label><div style="padding: 10px 0; font-size: 0.95rem; font-weight: 600;">${f.department}</div></div>
        <div class="form-field"><label>Designation</label><div style="padding: 10px 0; font-size: 0.95rem; font-weight: 600;">${f.designation}</div></div>
        <button class="btn-primary-action" style="max-width: 200px; margin-top: 10px;" onclick="toggleProfileEdit(true)">Edit Profile</button>
      `;
    }

    container.innerHTML = `
      <div class="profile-banner" style="background: var(--blueprint); color: var(--white); padding: 24px; border-radius: var(--r-md); display: flex; align-items: center; gap: 20px; position: relative; overflow: hidden; margin-bottom: 24px;">
        <div class="profile-avatar-large" style="width: 72px; height: 72px; background: var(--white); color: var(--blueprint); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 700;">${f.initials}</div>
        <div style="z-index: 2;">
          <p class="profile-roll-tag mono" style="font-size: 0.72rem; color: var(--electrical);">${f.facultyId}</p>
          <h1 class="profile-main-name" style="font-size: 1.5rem; font-weight: 700;">${f.name}</h1>
          <p class="profile-program-text" style="font-size: 0.88rem; opacity: 0.85;">${f.designation} &bull; ${f.department}</p>
        </div>
      </div>

      <div class="stats-grid" style="margin-bottom: 32px;">
        <div class="stat-card"><div class="stat-label mono">Subjects Handled</div><div class="stat-value">${f.stats.subjectsHandled}</div></div>
        <div class="stat-card"><div class="stat-label mono">Experiments Published</div><div class="stat-value">${f.stats.experimentsPublished}</div></div>
        <div class="stat-card"><div class="stat-label mono">Students Mentored</div><div class="stat-value">${f.stats.studentsEnrolled}</div></div>
        <div class="stat-card"><div class="stat-label mono">Average Class Score</div><div class="stat-value">${f.stats.avgClassScore}%</div></div>
      </div>

      <div class="data-table-wrap" style="padding: 24px;">
        <h3 class="section-title" style="margin-bottom: 16px;">Faculty Credentials</h3>
        ${formHTML}
      </div>
    `;
  }

  window.toggleProfileEdit = function (isEditing) {
    state.profileEditing = isEditing;
    renderProfileView();
  };

  window.saveProfileChanges = function () {
    const email = document.getElementById('profEmail').value.trim();
    const phone = document.getElementById('profPhone').value.trim();
    const dept = document.getElementById('profDept').value.trim();
    const desg = document.getElementById('profDesg').value.trim();

    if (!email || !phone || !dept || !desg) {
      alert('Please fill out all credentials.');
      return;
    }

    appData.faculty.email = email;
    appData.faculty.phone = phone;
    appData.faculty.department = dept;
    appData.faculty.designation = desg;

    state.profileEditing = false;
    alert('Faculty profile updated successfully!');
    renderProfileView();
  };

  // Bind global functions & initialize app on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
