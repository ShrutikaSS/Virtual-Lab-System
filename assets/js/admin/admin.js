/* ============================================================
   ZealVirtual Science Lab — Administrator Dashboard Script
   Architecture: assets/js/admin/admin.js
   ============================================================ */

(function () {
  'use strict';

  // State Management Data Model
  const state = {
    admin: {
      name: (window.SERVER_ADMIN && window.SERVER_ADMIN.name) || 'Dr. Sunita Patil',
      initials: (window.SERVER_ADMIN && window.SERVER_ADMIN.initials) || 'SP',
      adminId: 'ADM-9042',
      email: (window.SERVER_ADMIN && window.SERVER_ADMIN.email) || 'sunita.patil@vidyut.edu',
      role: 'System Administrator'
    },
    users: [
      { id: 'usr-1', name: 'Aarav Rao', roll: '21AI045', program: 'B.Tech AI&DS', batch: '2022-26', status: 'active', lastLogin: '10 mins ago' },
      { id: 'usr-2', name: 'Priya Sharma', roll: '21CS112', program: 'B.Tech CSE', batch: '2022-26', status: 'active', lastLogin: '2 hours ago' },
      { id: 'usr-3', name: 'Rohan Mehta', roll: '22EE018', program: 'B.Tech Electrical', batch: '2023-27', status: 'active', lastLogin: 'Yesterday' },
      { id: 'usr-4', name: 'Ananya Deshmukh', roll: '22ME054', program: 'B.Tech Mechanical', batch: '2023-27', status: 'suspended', lastLogin: '5 days ago' },
      { id: 'usr-5', name: 'Vikram Joshi', roll: '20EC089', program: 'B.Tech E&TC', batch: '2021-25', status: 'active', lastLogin: '3 hours ago' },
      { id: 'usr-6', name: 'Sneha Kulkarni', roll: '21CS145', program: 'B.Tech CSE', batch: '2022-26', status: 'active', lastLogin: '1 day ago' },
      { id: 'usr-7', name: 'Tanmay Shah', roll: '23AI012', program: 'B.Tech AI&DS', batch: '2024-28', status: 'suspended', lastLogin: '2 weeks ago' }
    ],
    faculty: [
      { id: 'fac-1', name: 'Dr. Rajesh Sharma', facultyId: 'FAC-101', department: 'Chemistry', designation: 'Professor & Head', subjects: ['Chemistry Lab'], status: 'active', publishedCount: 12, rating: '4.8/5' },
      { id: 'fac-2', name: 'Prof. Meera Kulkarni', facultyId: 'FAC-102', department: 'Physics', designation: 'Associate Professor', subjects: ['Physics Lab'], status: 'active', publishedCount: 9, rating: '4.7/5' },
      { id: 'fac-3', name: 'Dr. Amitav Roy', facultyId: 'FAC-103', department: 'Electrical Engineering', designation: 'Assistant Professor', subjects: ['Electrical (BEEE)'], status: 'active', publishedCount: 15, rating: '4.9/5' },
      { id: 'fac-4', name: 'Prof. Neha Gupta', facultyId: 'FAC-104', department: 'Chemistry', designation: 'Lecturer', subjects: ['Chemistry Lab'], status: 'suspended', publishedCount: 4, rating: '4.2/5' }
    ],
    subjects: {
      chem: { tag: 'CHEM', name: 'Chemistry Lab Bench', color: '#37B7A0', description: 'Acid-base titrations, pH metrics, and volumetric analysis workbench.', facultyCount: 2, studentCount: 480, experimentsCount: 14 },
      phy: { tag: 'PHYS', name: 'Physics Mechanics & Optics', color: '#9C8CF0', description: 'Simple pendulum decay, diffraction gratings, and harmonic motion.', facultyCount: 1, studentCount: 520, experimentsCount: 12 },
      elec: { tag: 'ELEC', name: 'Electrical Engineering (BEEE)', color: '#F0B33E', description: 'Wheatstone bridge balance, Kirchhoff voltage/current law verification.', facultyCount: 1, studentCount: 610, experimentsCount: 18 }
    },
    experiments: [
      { id: 'exp-101', tag: 'CHEM-01', title: 'Standardization of Hydrochloric Acid', subject: 'Chemistry', facultyName: 'Dr. Rajesh Sharma', status: 'published', lastUpdated: '2026-07-18' },
      { id: 'exp-102', tag: 'CHEM-02', title: 'Determining Equivalence Point via Titration', subject: 'Chemistry', facultyName: 'Dr. Rajesh Sharma', status: 'published', lastUpdated: '2026-07-15' },
      { id: 'exp-201', tag: 'PHYS-01', title: 'Simple Pendulum Acceleration due to Gravity', subject: 'Physics', facultyName: 'Prof. Meera Kulkarni', status: 'published', lastUpdated: '2026-07-20' },
      { id: 'exp-202', tag: 'PHYS-02', title: 'Newton Rings Interference Measurement', subject: 'Physics', facultyName: 'Prof. Meera Kulkarni', status: 'pending', lastUpdated: '2026-07-21' },
      { id: 'exp-301', tag: 'ELEC-01', title: 'Wheatstone Bridge Unknown Resistance', subject: 'Electrical', facultyName: 'Dr. Amitav Roy', status: 'published', lastUpdated: '2026-07-10' },
      { id: 'exp-302', tag: 'ELEC-02', title: 'Verification of Superposition Theorem', subject: 'Electrical', facultyName: 'Dr. Amitav Roy', status: 'flagged', lastUpdated: '2026-07-19' }
    ],
    approvalQueue: [
      { id: 'app-1', expId: 'exp-202', title: 'Newton Rings Interference Measurement', subject: 'Physics', facultyName: 'Prof. Meera Kulkarni', submittedAt: '2026-07-21 09:30 AM', mediaCount: 3 },
      { id: 'app-2', expId: 'exp-103', title: 'Conductometric Titration of Strong Acids', subject: 'Chemistry', facultyName: 'Dr. Rajesh Sharma', submittedAt: '2026-07-20 04:15 PM', mediaCount: 2 }
    ],
    notifications: [
      { id: 'notif-1', message: 'Scheduled Server Maintenance on Sunday 02:00 AM - 04:00 AM IST.', audience: 'All Users', sentAt: '2026-07-19 10:00 AM', sender: 'System Admin', status: 'delivered' },
      { id: 'notif-2', message: 'New BEEE Lab Experiment 03 published for Batch 2023-27.', audience: 'Students Only', sentAt: '2026-07-18 02:30 PM', sender: 'Dr. Amitav Roy', status: 'delivered' }
    ],
    activityLog: [
      { id: 'act-1', userName: 'Aarav Rao', role: 'Student', action: 'Completed Titration Experiment #101 with 98% accuracy', timestamp: '10 mins ago', flagged: false },
      { id: 'act-2', userName: 'Dr. Rajesh Sharma', role: 'Faculty', action: 'Submitted new experiment draft for approval', timestamp: '45 mins ago', flagged: false },
      { id: 'act-3', userName: 'Unknown IP (103.44.12.8)', role: 'Guest', action: '5 consecutive failed admin login attempts', timestamp: '1 hour ago', flagged: true },
      { id: 'act-4', userName: 'Ananya Deshmukh', role: 'Student', action: 'Attempted access to suspended lab session', timestamp: '3 hours ago', flagged: true },
      { id: 'act-5', userName: 'Prof. Meera Kulkarni', role: 'Faculty', action: 'Updated Physics pendulum simulation parameters', timestamp: '5 hours ago', flagged: false }
    ],
    backups: [
      { id: 'bak-101', timestamp: '2026-07-21 04:00 AM', sizeMb: '142.8 MB', status: 'Successful', type: 'Automated Daily' },
      { id: 'bak-100', timestamp: '2026-07-20 04:00 AM', sizeMb: '140.5 MB', status: 'Successful', type: 'Automated Daily' },
      { id: 'bak-099', timestamp: '2026-07-19 04:00 AM', sizeMb: '138.2 MB', status: 'Successful', type: 'Automated Daily' }
    ],
    settings: {
      siteName: 'Vidyut Virtual Science Lab Portal',
      supportEmail: 'support@vidyut-labs.edu',
      maintenanceMode: false,
      passwordPolicy: 'min8_alphanumeric_special'
    },
    selectedUsers: new Set(),
    currentView: 'dashboard'
  };

  // Auth Handling
  window.handleAdminLogin = function () {
    const loginStage = document.getElementById('view-login');
    const appShell = document.getElementById('appShell');
    if (loginStage && appShell) {
      loginStage.style.display = 'none';
      appShell.style.display = 'grid';
      switchView('dashboard');
    }
  };

  window.handleAdminLogout = function () {
    if (confirm('Are you sure you want to log out of the Administrator Portal?')) {
      const loginStage = document.getElementById('view-login');
      const appShell = document.getElementById('appShell');
      if (loginStage && appShell) {
        appShell.style.display = 'none';
        loginStage.style.display = 'flex';
      }
    }
  };

  // View Navigation Router
  window.switchView = function (viewName) {
    state.currentView = viewName;

    // Sidebar active item update
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });

    // Top bar breadcrumbs
    const breadcrumb = document.getElementById('breadcrumbContainer');
    if (breadcrumb) {
      const titles = {
        dashboard: 'Dashboard / Overview',
        users: 'Dashboard / Manage Users',
        subjects: 'Dashboard / Manage Subjects',
        faculty: 'Dashboard / Manage Faculty',
        experiments: 'Dashboard / Manage Experiments',
        approvals: 'Dashboard / Content Approval Queue',
        notifications: 'Dashboard / Manage Notifications',
        reports: 'Dashboard / View System Reports',
        activity: 'Dashboard / Monitor User Activity',
        settings: 'Dashboard / Backup & Platform Settings'
      };
      breadcrumb.innerHTML = `<span class="breadcrumb-crumb active">${titles[viewName] || 'Dashboard'}</span>`;
    }

    // Toggle View Containers
    document.querySelectorAll('.content-area .view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Render logic per view
    switch (viewName) {
      case 'dashboard': renderDashboardView(); break;
      case 'users': renderUsersView(); break;
      case 'subjects': renderSubjectsView(); break;
      case 'faculty': renderFacultyView(); break;
      case 'experiments': renderExperimentsView(); break;
      case 'approvals': renderApprovalsView(); break;
      case 'notifications': renderNotificationsView(); break;
      case 'reports': renderReportsView(); break;
      case 'activity': renderActivityView(); break;
      case 'settings': renderSettingsView(); break;
    }
  };

  // Spotlight Cursor Follower
  document.addEventListener('mousemove', e => {
    const x = e.clientX + 'px';
    const y = e.clientY + 'px';
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  });

  // Global Real-Time Search Handler
  window.handleGlobalSearch = function (query) {
    const dropdown = document.getElementById('globalSearchResults');
    if (!dropdown) return;

    query = (query || '').toLowerCase().trim();
    if (!query) {
      dropdown.classList.remove('active');
      return;
    }

    const matchedUsers = state.users.filter(u => u.name.toLowerCase().includes(query) || u.roll.toLowerCase().includes(query));
    const matchedFaculty = state.faculty.filter(f => f.name.toLowerCase().includes(query) || f.department.toLowerCase().includes(query));
    const matchedExperiments = state.experiments.filter(e => e.title.toLowerCase().includes(query) || e.tag.toLowerCase().includes(query));

    let html = '';

    if (matchedUsers.length > 0) {
      html += `<div class="search-group-header">Students (${matchedUsers.length})</div>`;
      matchedUsers.slice(0, 3).forEach(u => {
        html += `<div class="search-result-item" onclick="switchView('users'); closeGlobalSearch();">
          <div><strong>${u.name}</strong> <span style="font-size:0.75rem; color:var(--ink-soft);">(${u.roll})</span></div>
          <span class="pill pill-${u.status}">${u.status}</span>
        </div>`;
      });
    }

    if (matchedFaculty.length > 0) {
      html += `<div class="search-group-header">Faculty (${matchedFaculty.length})</div>`;
      matchedFaculty.slice(0, 3).forEach(f => {
        html += `<div class="search-result-item" onclick="switchView('faculty'); closeGlobalSearch();">
          <div><strong>${f.name}</strong> <span style="font-size:0.75rem; color:var(--ink-soft);">${f.department}</span></div>
          <span class="mono" style="font-size:0.7rem;">${f.facultyId}</span>
        </div>`;
      });
    }

    if (matchedExperiments.length > 0) {
      html += `<div class="search-group-header">Experiments (${matchedExperiments.length})</div>`;
      matchedExperiments.slice(0, 3).forEach(e => {
        html += `<div class="search-result-item" onclick="switchView('experiments'); closeGlobalSearch();">
          <div><strong>${e.title}</strong> <span style="font-size:0.75rem; color:var(--ink-soft);">${e.subject}</span></div>
          <span class="pill pill-${e.status}">${e.status}</span>
        </div>`;
      });
    }

    if (!html) {
      html = `<div style="padding:12px 16px; font-size:0.85rem; color:var(--ink-soft);">No matching records found.</div>`;
    }

    dropdown.innerHTML = html;
    dropdown.classList.add('active');
  };

  window.closeGlobalSearch = function () {
    const dropdown = document.getElementById('globalSearchResults');
    if (dropdown) dropdown.classList.remove('active');
  };

  // Notification Bell Dropdown Toggle
  window.toggleNotifDropdown = function () {
    const notifPanel = document.getElementById('notifDropdownPanel');
    const profilePanel = document.getElementById('profileDropdownPanel');
    if (profilePanel) profilePanel.classList.remove('active');
    if (notifPanel) notifPanel.classList.toggle('active');
  };

  // Profile Dropdown Menu Toggle
  window.toggleProfileDropdown = function () {
    const profilePanel = document.getElementById('profileDropdownPanel');
    const notifPanel = document.getElementById('notifDropdownPanel');
    if (notifPanel) notifPanel.classList.remove('active');
    if (profilePanel) profilePanel.classList.toggle('active');
  };

  // Close Dropdowns on Outer Click
  document.addEventListener('click', e => {
    if (!e.target.closest('.global-search-wrap')) closeGlobalSearch();
    if (!e.target.closest('.btn-notif-bell') && !e.target.closest('.notif-dropdown-panel')) {
      document.getElementById('notifDropdownPanel')?.classList.remove('active');
    }
    if (!e.target.closest('.header-user-chip') && !e.target.closest('.profile-dropdown-panel')) {
      document.getElementById('profileDropdownPanel')?.classList.remove('active');
    }
  });

  // Language Change Handler
  window.handleLanguageChange = function (lang) {
    const msgs = {
      en: 'Language set to English.',
      hi: 'भाषा हिंदी में बदली गई।',
      mr: 'भाषा मराठीत बदलली.'
    };
    alert(msgs[lang] || 'Language updated.');
  };

  // Legal & Support Modals
  window.openPrivacyModal = function () {
    document.getElementById('privacyModal')?.classList.add('active');
  };

  window.openTermsModal = function () {
    document.getElementById('termsModal')?.classList.add('active');
  };

  window.openHelpModal = function () {
    document.getElementById('helpModal')?.classList.add('active');
  };

  window.closeLegalModal = function (modalId) {
    document.getElementById(modalId)?.classList.remove('active');
  };

  // 1. Render Dashboard Home
  function renderDashboardView() {
    const container = document.getElementById('view-dashboard');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Welcome, ${state.admin.name}</h1>
      <p class="view-subtitle">System status overview, quick management controls, and active telemetry.</p>

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card chem">
          <div class="stat-label">Total Registered Students</div>
          <div class="stat-value">${state.users.length * 178}</div>
        </div>
        <div class="stat-card physics">
          <div class="stat-label">Active Faculty Accounts</div>
          <div class="stat-value">${state.faculty.length}</div>
        </div>
        <div class="stat-card electrical">
          <div class="stat-label">Published Lab Experiments</div>
          <div class="stat-value">${state.experiments.length}</div>
        </div>
        <div class="stat-card warn">
          <div class="stat-label">Pending Content Approvals</div>
          <div class="stat-value">${state.approvalQueue.length}</div>
        </div>
      </div>

      <!-- Quick Access Cards -->
      <div class="quick-cards-grid">
        <div class="quick-card chem-top" onclick="switchView('users')">
          <div>
            <div class="quick-card-icon">👥</div>
            <div class="quick-card-title">Manage Users</div>
            <div class="quick-card-desc">Review student profiles, enrollments, suspensions, and bulk account status.</div>
          </div>
          <div class="quick-card-arrow">Go to Users &rarr;</div>
        </div>

        <div class="quick-card phy-top" onclick="switchView('subjects')">
          <div>
            <div class="quick-card-icon">🔬</div>
            <div class="quick-card-title">Manage Subjects</div>
            <div class="quick-card-desc">Configure Chemistry, Physics, and Electrical lab benches and course parameters.</div>
          </div>
          <div class="quick-card-arrow">Go to Subjects &rarr;</div>
        </div>

        <div class="quick-card elec-top" onclick="switchView('faculty')">
          <div>
            <div class="quick-card-icon">🎓</div>
            <div class="quick-card-title">Manage Faculty</div>
            <div class="quick-card-desc">Assign lab benches, reassign subject leads, and audit published simulations.</div>
          </div>
          <div class="quick-card-arrow">Go to Faculty &rarr;</div>
        </div>
      </div>

      <!-- System Health Strip -->
      <div class="health-strip">
        <div class="health-item">
          <span class="status-dot"></span>
          <span>SERVER: ONLINE (99.98% UPTIME)</span>
        </div>
        <div class="health-item">
          <span>STORAGE: 142.8 GB / 500 GB (28.5%)</span>
        </div>
        <div class="health-item">
          <span>LAST BACKUP: TODAY, 04:00 AM IST</span>
        </div>
      </div>

      <!-- Recent System Activity -->
      <div class="panel-card">
        <div class="panel-header">
          <h2 class="panel-title">Recent System Activity</h2>
          <button class="btn-action-icon" onclick="switchView('activity')">View Full Audit Log</button>
        </div>
        <div class="activity-feed">
          ${state.activityLog.slice(0, 4).map(act => `
            <div class="activity-item">
              <div class="activity-info">
                <span class="activity-badge">${act.role}</span>
                <strong>${act.userName}</strong> &mdash; ${act.action}
              </div>
              <span class="mono" style="font-size:0.75rem; color:var(--ink-soft);">${act.timestamp}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 2. Render Manage Users View
  function renderUsersView() {
    const container = document.getElementById('view-users');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Manage Student Users</h1>
      <p class="view-subtitle">Review, search, filter, edit, suspend, or reactivate student lab accounts.</p>

      <div class="toolbar">
        <div class="toolbar-left">
          <input type="text" id="userSearch" class="search-box" placeholder="Search name or roll no..." oninput="filterUsersTable()">
          <select id="userStatusFilter" class="filter-select" onchange="filterUsersTable()">
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
          </select>
        </div>
        <div class="toolbar-right">
          <button class="btn-btn-add" onclick="openAddUserModal()">+ Add New Student</button>
        </div>
      </div>

      <!-- Bulk Actions Bar -->
      <div class="bulk-bar">
        <span>Selected: <strong id="bulkCount">0</strong> students</span>
        <div class="bulk-actions-group">
          <button class="btn-action-icon" onclick="bulkSuspendUsers()">Suspend Selected</button>
          <button class="btn-action-icon" onclick="bulkReactivateUsers()">Reactivate Selected</button>
          <button class="btn-action-icon" onclick="exportUsersCSV()">Export CSV</button>
        </div>
      </div>

      <div class="panel-card" style="padding:0; overflow:hidden;">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 40px;"><input type="checkbox" onchange="toggleSelectAllUsers(this)"></th>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Program</th>
              <th>Batch</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="usersTableBody">
            ${renderUserRows(state.users)}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderUserRows(userList) {
    return userList.map(u => `
      <tr class="${u.status === 'suspended' ? 'dimmed-row' : ''}">
        <td><input type="checkbox" data-id="${u.id}" ${state.selectedUsers.has(u.id) ? 'checked' : ''} onchange="toggleSelectUser('${u.id}', this.checked)"></td>
        <td><strong>${u.name}</strong></td>
        <td class="mono">${u.roll}</td>
        <td>${u.program}</td>
        <td class="mono">${u.batch}</td>
        <td>
          <span class="pill ${u.status === 'active' ? 'pill-active' : 'pill-suspended'}">${u.status}</span>
        </td>
        <td class="mono" style="font-size:0.8rem;">${u.lastLogin}</td>
        <td>
          <div class="action-btns">
            <button class="btn-action-icon" onclick="toggleUserStatus('${u.id}')">${u.status === 'active' ? 'Suspend' : 'Reactivate'}</button>
            <button class="btn-action-icon danger" onclick="deleteUser('${u.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.filterUsersTable = function () {
    const query = (document.getElementById('userSearch')?.value || '').toLowerCase();
    const status = document.getElementById('userStatusFilter')?.value || 'all';

    const filtered = state.users.filter(u => {
      const matchQuery = u.name.toLowerCase().includes(query) || u.roll.toLowerCase().includes(query);
      const matchStatus = status === 'all' || u.status === status;
      return matchQuery && matchStatus;
    });

    const tbody = document.getElementById('usersTableBody');
    if (tbody) tbody.innerHTML = renderUserRows(filtered);
  };

  window.toggleSelectUser = function (id, checked) {
    if (checked) state.selectedUsers.add(id);
    else state.selectedUsers.delete(id);
    const countEl = document.getElementById('bulkCount');
    if (countEl) countEl.textContent = state.selectedUsers.size;
  };

  window.toggleSelectAllUsers = function (masterCheckbox) {
    state.selectedUsers.clear();
    if (masterCheckbox.checked) {
      state.users.forEach(u => state.selectedUsers.add(u.id));
    }
    const countEl = document.getElementById('bulkCount');
    if (countEl) countEl.textContent = state.selectedUsers.size;
    filterUsersTable();
  };

  window.toggleUserStatus = function (id) {
    const usr = state.users.find(u => u.id === id);
    if (usr) {
      usr.status = usr.status === 'active' ? 'suspended' : 'active';
      renderUsersView();
    }
  };

  window.deleteUser = function (id) {
    const usr = state.users.find(u => u.id === id);
    if (usr && confirm(`Are you sure you want to permanently delete student ${usr.name} (${usr.roll})?`)) {
      state.users = state.users.filter(u => u.id !== id);
      renderUsersView();
    }
  };

  window.bulkSuspendUsers = function () {
    if (state.selectedUsers.size === 0) return alert('Select students first.');
    state.users.forEach(u => { if (state.selectedUsers.has(u.id)) u.status = 'suspended'; });
    renderUsersView();
  };

  window.bulkReactivateUsers = function () {
    if (state.selectedUsers.size === 0) return alert('Select students first.');
    state.users.forEach(u => { if (state.selectedUsers.has(u.id)) u.status = 'active'; });
    renderUsersView();
  };

  window.exportUsersCSV = function () {
    let csv = 'Name,Roll,Program,Batch,Status,LastLogin\n';
    state.users.forEach(u => {
      csv += `"${u.name}","${u.roll}","${u.program}","${u.batch}","${u.status}","${u.lastLogin}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_export.csv';
    a.click();
  };

  // 3. Render Manage Subjects View
  function renderSubjectsView() {
    const container = document.getElementById('view-subjects');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Manage Lab Subjects</h1>
      <p class="view-subtitle">Overview of virtual lab disciplines, assigned faculty leads, and student enrollments.</p>

      <div class="toolbar" style="justify-content: flex-end;">
        <button class="btn-btn-add" onclick="openAddSubjectModal()">+ Add New Subject</button>
      </div>

      <div class="cards-grid-3">
        ${Object.entries(state.subjects).map(([key, s]) => `
          <div class="subject-card" style="border-top-color: ${s.color};">
            <div class="subject-card-header">
              <span class="badge-subject" style="background: ${s.color};">${s.tag}</span>
              <span class="mono" style="font-size:0.75rem; color:var(--ink-soft);">${s.experimentsCount} Experiments</span>
            </div>
            <h2 style="font-family:var(--font-display); font-size:1.2rem; font-weight:700; margin-bottom:8px;">${s.name}</h2>
            <p style="font-size:0.88rem; color:var(--ink-soft); margin-bottom:16px;">${s.description}</p>
            <div style="font-family:var(--font-mono); font-size:0.78rem; display:flex; justify-content:space-between; margin-bottom:16px;">
              <span>Faculty Assigned: <strong>${s.facultyCount}</strong></span>
              <span>Enrolled: <strong>${s.studentCount}</strong></span>
            </div>
            <div class="action-btns">
              <button class="btn-action-icon" onclick="editSubject('${key}')">Edit Details</button>
              <button class="btn-action-icon danger" onclick="deleteSubject('${key}')">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 4. Render Manage Faculty View
  function renderFacultyView() {
    const container = document.getElementById('view-faculty');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Manage Faculty Accounts</h1>
      <p class="view-subtitle">Review faculty clearance levels, assigned subjects, published lab modules, and ratings.</p>

      <div class="toolbar" style="justify-content: flex-end;">
        <button class="btn-btn-add" onclick="openAddFacultyModal()">+ Add Faculty Account</button>
      </div>

      <div class="panel-card" style="padding:0; overflow:hidden;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Faculty Name</th>
              <th>Faculty ID</th>
              <th>Department</th>
              <th>Assigned Subjects</th>
              <th>Status</th>
              <th>Simulations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${state.faculty.map(f => `
              <tr class="${f.status === 'suspended' ? 'dimmed-row' : ''}">
                <td>
                  <strong style="cursor:pointer;" onclick="openFacultyDrawer('${f.id}')">${f.name}</strong>
                  <div style="font-size:0.75rem; color:var(--ink-soft);">${f.designation}</div>
                </td>
                <td class="mono">${f.facultyId}</td>
                <td>${f.department}</td>
                <td>
                  ${f.subjects.map(s => `<span class="badge-subject chem">${s}</span>`).join(' ')}
                </td>
                <td>
                  <span class="pill ${f.status === 'active' ? 'pill-active' : 'pill-suspended'}">${f.status}</span>
                </td>
                <td class="mono">${f.publishedCount}</td>
                <td>
                  <div class="action-btns">
                    <button class="btn-action-icon" onclick="openFacultyDrawer('${f.id}')">Details</button>
                    <button class="btn-action-icon" onclick="toggleFacultyStatus('${f.id}')">${f.status === 'active' ? 'Suspend' : 'Reactivate'}</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  window.toggleFacultyStatus = function (id) {
    const fac = state.faculty.find(f => f.id === id);
    if (fac) {
      fac.status = fac.status === 'active' ? 'suspended' : 'active';
      renderFacultyView();
    }
  };

  window.openFacultyDrawer = function (id) {
    const fac = state.faculty.find(f => f.id === id);
    if (!fac) return;
    const drawer = document.getElementById('facultyDrawer');
    const content = document.getElementById('drawerContent');
    if (drawer && content) {
      content.innerHTML = `
        <h2 style="font-family:var(--font-display); font-size:1.4rem; font-weight:700;">${fac.name}</h2>
        <p class="mono" style="font-size:0.8rem; color:var(--ink-soft); margin-bottom:16px;">${fac.facultyId} &bull; ${fac.department}</p>
        <p><strong>Designation:</strong> ${fac.designation}</p>
        <p><strong>Assigned Bench:</strong> ${fac.subjects.join(', ')}</p>
        <p><strong>Published Simulations:</strong> ${fac.publishedCount}</p>
        <p><strong>Student Feedback Summary:</strong> ${fac.rating}</p>
        <hr style="margin:20px 0; border:none; border-top:1px solid rgba(21,42,80,0.1);">
        <button class="btn-primary-action" onclick="closeFacultyDrawer()">Close Drawer</button>
      `;
      drawer.classList.add('active');
    }
  };

  window.closeFacultyDrawer = function () {
    document.getElementById('facultyDrawer')?.classList.remove('active');
  };

  // 5. Render Manage Experiments View
  function renderExperimentsView() {
    const container = document.getElementById('view-experiments');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Manage Lab Experiments</h1>
      <p class="view-subtitle">Complete catalog of virtual science lab experiments across Chemistry, Physics, and Electrical engineering.</p>

      <div class="cards-grid-3">
        ${state.experiments.map(e => `
          <div class="exp-card" onclick="alert('Viewing detailed workbench specs for: ${e.title}')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="mono" style="font-size:0.75rem; color:var(--ink-soft);">${e.tag}</span>
                <span class="pill pill-${e.status}">${e.status}</span>
              </div>
              <h3 style="font-family:var(--font-display); font-size:1.05rem; font-weight:700; margin-bottom:6px;">${e.title}</h3>
              <p style="font-size:0.82rem; color:var(--ink-soft);">Faculty: ${e.facultyName}</p>
            </div>
            <div class="mono" style="font-size:0.72rem; color:var(--ink-soft); margin-top:14px;">Last updated: ${e.lastUpdated}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 6. Render Approve / Remove Content View
  function renderApprovalsView() {
    const container = document.getElementById('view-approvals');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Content Approval Queue</h1>
      <p class="view-subtitle">Review submitted experiment modules and media files uploaded by faculty prior to publication.</p>

      <div class="approval-queue">
        ${state.approvalQueue.length === 0 ? '<p>No pending approvals in queue.</p>' : state.approvalQueue.map(a => `
          <div class="approval-card">
            <div>
              <span class="badge-subject physics">${a.subject}</span>
              <h3 style="font-family:var(--font-display); font-size:1.1rem; font-weight:700; margin:6px 0 4px 0;">${a.title}</h3>
              <p style="font-size:0.85rem; color:var(--ink-soft);">Submitted by <strong>${a.facultyName}</strong> on <span class="mono">${a.submittedAt}</span> (${a.mediaCount} media assets attached)</p>
            </div>
            <div class="action-btns">
              <button class="btn-btn-add" style="background:var(--chem);" onclick="approveContent('${a.id}')">Approve</button>
              <button class="btn-action-icon" onclick="requestChanges('${a.id}')">Request Changes</button>
              <button class="btn-action-icon danger" onclick="removeContent('${a.id}')">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.approveContent = function (id) {
    const item = state.approvalQueue.find(a => a.id === id);
    if (item) {
      alert(`Approved "${item.title}". Item published to live lab catalog.`);
      state.approvalQueue = state.approvalQueue.filter(a => a.id !== id);
      renderApprovalsView();
    }
  };

  window.requestChanges = function (id) {
    const comment = prompt('Enter notes for faculty changes requested:');
    if (comment) {
      alert(`Requested changes sent to faculty lead.`);
      state.approvalQueue = state.approvalQueue.filter(a => a.id !== id);
      renderApprovalsView();
    }
  };

  window.removeContent = function (id) {
    if (confirm('Are you sure you want to archive and remove this submission?')) {
      state.approvalQueue = state.approvalQueue.filter(a => a.id !== id);
      renderApprovalsView();
    }
  };

  // 7. Render Notifications View
  function renderNotificationsView() {
    const container = document.getElementById('view-notifications');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Manage System Notifications</h1>
      <p class="view-subtitle">Broadcast portal-wide alerts, schedule maintenance windows, and review notification history.</p>

      <div class="compose-panel">
        <h2 style="font-family:var(--font-display); font-size:1.1rem; font-weight:700; margin-bottom:14px;">Compose New Broadcast Announcement</h2>
        <div class="form-field">
          <label>Target Audience</label>
          <select id="notifTarget" class="filter-select" style="width:100%;">
            <option>All Users (Students & Faculty)</option>
            <option>Students Only</option>
            <option>Faculty Only</option>
            <option>Chemistry Bench Students</option>
            <option>Physics Bench Students</option>
            <option>Electrical Bench Students</option>
          </select>
        </div>
        <div class="form-field">
          <label>Announcement Text</label>
          <textarea id="notifMsg" rows="3" placeholder="Enter message text..."></textarea>
        </div>
        <button class="btn-btn-add" onclick="sendNotification()">Send Broadcast</button>
      </div>

      <div class="panel-card">
        <h2 class="panel-title" style="margin-bottom:16px;">Notification Delivery History</h2>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Message Content</th>
              <th>Audience</th>
              <th>Sender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.notifications.map(n => `
              <tr>
                <td class="mono" style="font-size:0.78rem;">${n.sentAt}</td>
                <td>${n.message}</td>
                <td class="mono">${n.audience}</td>
                <td>${n.sender}</td>
                <td><span class="pill pill-good">${n.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  window.sendNotification = function () {
    const msg = document.getElementById('notifMsg')?.value;
    const target = document.getElementById('notifTarget')?.value;
    if (!msg) return alert('Enter notification message.');

    state.notifications.unshift({
      id: `notif-${Date.now()}`,
      message: msg,
      audience: target,
      sentAt: 'Just now',
      sender: state.admin.name,
      status: 'delivered'
    });
    alert('Broadcast sent successfully!');
    renderNotificationsView();
  };

  // 8. Render Reports View
  function renderReportsView() {
    const container = document.getElementById('view-reports');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">System Analytics & Reports</h1>
      <p class="view-subtitle">Platform-wide usage metrics, experiment completion rates, and downloadable summaries.</p>

      <div class="chart-container">
        <h2 style="font-family:var(--font-display); font-size:1.1rem; font-weight:700; margin-bottom:12px;">Weekly Student Lab Activity by Subject</h2>
        <div class="chart-placeholder">
          <div class="chart-bar-wrap"><div class="chart-bar chem" style="height: 75%;"></div><span class="mono" style="font-size:0.75rem;">CHEM</span></div>
          <div class="chart-bar-wrap"><div class="chart-bar phy" style="height: 85%;"></div><span class="mono" style="font-size:0.75rem;">PHYS</span></div>
          <div class="chart-bar-wrap"><div class="chart-bar elec" style="height: 95%;"></div><span class="mono" style="font-size:0.75rem;">ELEC</span></div>
        </div>
      </div>

      <div class="toolbar" style="justify-content:flex-end;">
        <button class="btn-btn-add" onclick="generateReportSimulation()">📊 Download Full Analytics Report (PDF)</button>
      </div>
    `;
  }

  window.generateReportSimulation = function () {
    alert('Generating report... PDF compilation complete. Downloading summary report.');
  };

  // 9. Render Activity Monitor View
  function renderActivityView() {
    const container = document.getElementById('view-activity');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">User Activity Monitor</h1>
      <p class="view-subtitle">Live telemetry of logins, experiment runs, and security audit flags.</p>

      <div class="panel-card" style="padding:0; overflow:hidden;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>User</th>
              <th>Role</th>
              <th>Action Description</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            ${state.activityLog.map(a => `
              <tr style="${a.flagged ? 'background:rgba(217,99,76,0.08);' : ''}">
                <td>${a.flagged ? '⚠️' : '✅'}</td>
                <td><strong>${a.userName}</strong></td>
                <td class="mono">${a.role}</td>
                <td>${a.action}</td>
                <td class="mono" style="font-size:0.78rem;">${a.timestamp}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // 10. Render Backup & Settings View
  function renderSettingsView() {
    const container = document.getElementById('view-settings');
    if (!container) return;

    container.innerHTML = `
      <h1 class="view-title">Backup & Platform Settings</h1>
      <p class="view-subtitle">Trigger portal data backups, configure site parameters, and adjust clearance policies.</p>

      <!-- Backup Control -->
      <div class="settings-section">
        <h2 style="font-family:var(--font-display); font-size:1.1rem; font-weight:700; margin-bottom:12px;">Database & Artifact Backup</h2>
        <p style="font-size:0.88rem; color:var(--ink-soft); margin-bottom:16px;">Last automated backup ran today at 04:00 AM IST (142.8 MB).</p>
        <button class="btn-btn-add" onclick="runBackupNow()">Run Backup Now</button>
      </div>

      <!-- Settings Panel -->
      <div class="settings-section">
        <h2 style="font-family:var(--font-display); font-size:1.1rem; font-weight:700; margin-bottom:16px;">Portal Configuration</h2>
        <div class="form-field">
          <label>Portal Display Name</label>
          <input type="text" value="${state.settings.siteName}">
        </div>
        <div class="form-field">
          <label>Administrator Support Email</label>
          <input type="email" value="${state.settings.supportEmail}">
        </div>
        <button class="btn-primary-action" style="width:auto;" onclick="alert('Settings saved successfully!')">Save Settings</button>
      </div>
    `;
  }

  window.runBackupNow = function () {
    alert('Initiating database backup simulation... Backup completed successfully (143.1 MB).');
    state.backups.unshift({
      id: `bak-${Date.now()}`,
      timestamp: 'Just now',
      sizeMb: '143.1 MB',
      status: 'Successful',
      type: 'Manual Admin Trigger'
    });
    renderSettingsView();
  };

  // Modals Open/Close Handlers
  window.openAddUserModal = function () {
    const name = prompt('Enter Student Full Name:');
    const roll = prompt('Enter Roll Number:');
    const program = prompt('Enter Program (e.g. B.Tech AI&DS):');
    const batch = prompt('Enter Batch (e.g. 2022-26):');

    if (name && roll) {
      state.users.unshift({
        id: `usr-${Date.now()}`,
        name, roll,
        program: program || 'B.Tech CS',
        batch: batch || '2023-27',
        status: 'active',
        lastLogin: 'Never'
      });
      renderUsersView();
    }
  };

  window.openAddSubjectModal = function () {
    const name = prompt('Enter Subject Name:');
    const tag = prompt('Enter Subject Tag (e.g. BIOTECH):');
    if (name && tag) {
      state.subjects[tag.toLowerCase()] = {
        tag, name, color: '#37B7A0', description: 'Newly added virtual lab subject.', facultyCount: 1, studentCount: 0, experimentsCount: 0
      };
      renderSubjectsView();
    }
  };

  window.openAddFacultyModal = function () {
    const name = prompt('Enter Faculty Full Name:');
    const department = prompt('Enter Department:');
    if (name) {
      state.faculty.unshift({
        id: `fac-${Date.now()}`,
        name,
        facultyId: `FAC-${Math.floor(100 + Math.random() * 900)}`,
        department: department || 'General Science',
        designation: 'Assistant Professor',
        subjects: ['Chemistry Lab'],
        status: 'active',
        publishedCount: 0,
        rating: '5.0/5'
      });
      renderFacultyView();
    }
  };

  // Initial Auto-load
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('appShell')?.style.display !== 'none') {
      switchView('dashboard');
    }
  });

})();
