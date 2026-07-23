/* ============================================================
   ZealVirtual Science Lab — Sign-In Script
   Architecture: assets/js/auth/login.js
   ============================================================ */

(function () {
  'use strict';

  // Role terminal configurations aligning with index theme accents
  const roles = {
    student: {
      accent: '#37B7A0', // Chemistry Teal
      accentDim: 'rgba(55, 183, 160, 0.15)',
      headlineAccent: 'clearance panel',
      note: 'Select a clearance level, then sign in with your credentials. Each level unlocks a different set of instruments.',
      eyebrow: 'STUDENT ACCESS',
      title: 'Sign in to your bench',
      formNote: 'Use your username and password to continue.',
      idLabel: 'Username',
      idPlaceholder: 'e.g. 21ai045 or sujal12',
      showExtra: false,
      extraLabel: 'Batch / course code',
      extraPlaceholder: 'e.g. CS-3B',
      submit: 'Enter lab',
      index: '01 / 03'
    },
    faculty: {
      accent: '#F0B33E', // Electrical Amber
      accentDim: 'rgba(240, 179, 62, 0.15)',
      headlineAccent: 'faculty console',
      note: 'Faculty access unlocks grading tools, session scheduling, and lab module oversight.',
      eyebrow: 'FACULTY ACCESS',
      title: 'Sign in to the console',
      formNote: 'Use your faculty ID and institutional password to continue.',
      idLabel: 'Faculty ID or email',
      idPlaceholder: 'e.g. faculty.rao@institute.edu',
      showExtra: false,
      extraLabel: 'Department',
      extraPlaceholder: 'e.g. Electronics & Comm.',
      submit: 'Enter console',
      index: '02 / 03'
    },
    admin: {
      accent: '#9C8CF0', // Physics Violet
      accentDim: 'rgba(156, 140, 240, 0.15)',
      headlineAccent: 'root access',
      note: 'Administrator access is logged and audited. Two-factor verification is required after password entry.',
      eyebrow: 'ADMINISTRATOR ACCESS',
      title: 'Sign in with elevated rights',
      formNote: 'Admin sessions require a verification code sent to your registered device.',
      idLabel: 'Admin email',
      idPlaceholder: 'e.g. admin@institute.edu',
      showExtra: true,
      extraLabel: '2FA verification code',
      extraPlaceholder: '6-digit code',
      submit: 'Verify & enter',
      index: '03 / 03'
    }
  };

  /**
   * Switches the active interface profile based on clearance role
   * @param {string} roleName 
   */
  function selectRole(roleName) {
    const roleConfig = roles[roleName];
    if (!roleConfig) return;

    // Toggle active state classes on buttons
    document.querySelectorAll('.role-switch').forEach(el => {
      el.classList.toggle('active', el.dataset.role === roleName);
    });
    // Store selected role for PHP backend
    const roleField = document.getElementById('roleField');
    if (roleField) roleField.value = roleName;
    const roleInput = document.getElementById('roleInput');
    if (roleInput) roleInput.value = roleName;
    // Update Forgot Password link according to selected role
    const forgotPasswordLink =
      document.getElementById('forgotPasswordLink');

    if (forgotPasswordLink) {
      forgotPasswordLink.href =
        'forgot_password.php?role=' + roleName;
    }

    // Update dynamic CSS theme variables
    document.documentElement.style.setProperty('--accent', roleConfig.accent);
    document.documentElement.style.setProperty('--accent-dim', roleConfig.accentDim);

    // Update Access Terminal text strings
    const headlineAccent = document.getElementById('headlineAccent');
    const sideNote = document.getElementById('sideNote');
    const formEyebrow = document.getElementById('formEyebrow');
    const formTitle = document.getElementById('formTitle');
    const formNote = document.getElementById('formNote');
    const idLabel = document.getElementById('idLabel');
    const idField = document.getElementById('idField');
    const extraLabel = document.getElementById('extraLabel');
    const extraInput = document.getElementById('extraInput');
    const submitBtn = document.getElementById('submitBtn');
    const roleCount = document.getElementById('roleCount');
    const extraField = document.getElementById('extraField');

    if (headlineAccent) headlineAccent.textContent = roleConfig.headlineAccent;
    if (sideNote) sideNote.textContent = roleConfig.note;
    if (formEyebrow) formEyebrow.textContent = roleConfig.eyebrow;
    if (formTitle) formTitle.textContent = roleConfig.title;
    if (formNote) formNote.textContent = roleConfig.formNote;
    if (idLabel) idLabel.textContent = roleConfig.idLabel;
    if (idField) idField.placeholder = roleConfig.idPlaceholder;
    if (extraLabel) extraLabel.textContent = roleConfig.extraLabel;
    if (extraInput) extraInput.placeholder = roleConfig.extraPlaceholder;
    if (submitBtn) submitBtn.textContent = roleConfig.submit;
    if (roleCount) roleCount.textContent = roleConfig.index;

    // Drawer slide-down / slide-up for role-specific extra fields
    if (extraField) {
      extraField.classList.toggle('show', roleConfig.showExtra);
    }
  }

  /**
   * Toggles the visibility of the password input field
   */
  function togglePass() {
    const passField = document.getElementById('passField');
    const toggleBtn = document.querySelector('.toggle-pass');
    if (!passField || !toggleBtn) return;

    const isPassword = passField.type === 'password';
    passField.type = isPassword ? 'text' : 'password';
    toggleBtn.textContent = isPassword ? 'HIDE' : 'SHOW';
  }

  /**
   * Updates clock readout with local terminal time
   */
  function updateClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('en-GB');
  }

  /**
   * Role-based form authentication router
   */
  function handleAuthSubmit(e) {
    if (e) e.preventDefault();

    const activeRoleBtn = document.querySelector('.role-switch.active');
    const role = activeRoleBtn ? activeRoleBtn.dataset.role : 'student';

    if (role === 'faculty') {
      window.location.href = 'faculty/dashboard.php#dashboard';
    } else if (role === 'admin') {
      window.location.href = 'admin/dashboard.php';
    } else {
      window.location.href = 'student/dashboard.php';
    }
  }
  // Bind functions to window so inline onclick handlers in HTML continue working
  window.selectRole = selectRole;
  window.togglePass = togglePass;
  window.handleAuthSubmit = handleAuthSubmit;

  // Initialize terminal elements
  document.addEventListener('DOMContentLoaded', () => {
    // Start local clock
    updateClock();
    setInterval(updateClock, 1000);

    // Initial role activation
    selectRole('student');
  });

})();
