<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ZealVirtual Science Lab — Faculty Console for managing Virtual Lab subjects, experiments, student performance, and notifications.">
  <title>Vidyut Virtual Lab — Faculty Console</title>

  <!-- Google Fonts matching landing & auth pages -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Faculty Console Stylesheet -->
  <link rel="stylesheet" href="../assets/css/faculty/faculty.css">
</head>
<body>

<!-- Standalone Faculty Login Stage -->
<div id="view-login" class="login-stage" style="display: flex;">
  <div class="login-card">
    <div class="logo-block" style="margin-bottom: 20px;">
      <div class="logo-ring" aria-hidden="true" style="color: var(--ink);">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3.5" opacity="0.6"/>
          <circle cx="24" cy="24" r="17.5" stroke="currentColor" stroke-width="1" opacity="0.35"/>
          <path d="M20.5 12.5 H27.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M22.5 12.5 V19 L16 30.5 a2.5 2.5 0 0 0 2.2 3.7 H29.8 a2.5 2.5 0 0 0 2.2 -3.7 L26 19 V12.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M24 19 V24 H20" stroke="#F0B33E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="20" cy="24" r="2.2" fill="#F0B33E"/>
          <path d="M24 24 V27.5 H28" stroke="#37B7A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="28" cy="27.5" r="2" fill="#37B7A0"/>
        </svg>
      </div>
      <div class="logo-text">
        <span class="logo-name" style="color: var(--ink);">Vidyut Virtual Lab</span>
        <span class="logo-sub">Faculty Console</span>
      </div>
    </div>

    <p class="login-tag mono">ELEVATED CLEARANCE REQUIRED</p>
    <h1 class="login-title">Faculty Portal Sign In</h1>
    <p class="login-subtitle">Authenticate with your institutional faculty credentials to manage lab benches.</p>

    <form onsubmit="event.preventDefault(); handleFacultyLogin();">
      <div class="form-field">
        <label>Faculty Email / ID</label>
        <input type="text" placeholder="e.g. rajesh.sharma@institute.edu" required value="rajesh.sharma@institute.edu">
      </div>
      <div class="form-field">
        <label>Password</label>
        <input type="password" placeholder="••••••••••••" required value="password123">
      </div>
      <button class="btn-primary-action" type="submit">Log in to Faculty Console</button>
    </form>
  </div>
</div>

<!-- Main Faculty App Shell -->
<div id="appShell" class="app-container" style="display: none;">

  <!-- LEFT SIDEBAR (236px, --blueprint Theme) -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <a href="../index.php" class="logo-block" aria-label="ZealVirtual Science Lab Portal — Home">
        <div class="logo-ring" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3.5" opacity="0.6"/>
            <circle cx="24" cy="24" r="17.5" stroke="currentColor" stroke-width="1" opacity="0.35"/>
            <path d="M20.5 12.5 H27.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M22.5 12.5 V19 L16 30.5 a2.5 2.5 0 0 0 2.2 3.7 H29.8 a2.5 2.5 0 0 0 2.2 -3.7 L26 19 V12.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M24 19 V24 H20" stroke="#F0B33E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="20" cy="24" r="2.2" fill="#F0B33E"/>
            <path d="M24 24 V27.5 H28" stroke="#37B7A0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="28" cy="27.5" r="2" fill="#37B7A0"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">Vidyut Virtual Lab</span>
          <span class="logo-sub">Faculty Console</span>
        </div>
      </a>
    </div>

    <!-- Navigation Links -->
    <nav class="sidebar-nav" aria-label="Faculty Console Navigation">
      <div class="nav-item active" data-view="dashboard" tabIndex="0" role="button" aria-label="Faculty Dashboard Home">
        <span class="nav-dot"></span>
        <span>Dashboard</span>
      </div>
      <div class="nav-item" data-view="subjects" tabIndex="0" role="button" aria-label="Manage Subjects">
        <span class="nav-dot"></span>
        <span>Manage Subjects</span>
      </div>
      <div class="nav-item" data-view="experiments" tabIndex="0" role="button" aria-label="Manage Experiments">
        <span class="nav-dot"></span>
        <span>Manage Experiments</span>
      </div>
      <div class="nav-item" data-view="reports" tabIndex="0" role="button" aria-label="Performance Reports">
        <span class="nav-dot"></span>
        <span>Reports</span>
      </div>
      <div class="nav-item" data-view="notifications" tabIndex="0" role="button" aria-label="Send Notifications">
        <span class="nav-dot"></span>
        <span>Notifications</span>
      </div>
      <div class="nav-item" data-view="profile" tabIndex="0" role="button" aria-label="My Profile">
        <span class="nav-dot"></span>
        <span>My Profile</span>
      </div>
    </nav>

    <div class="sidebar-footer mono">
      <span>SYS.OK &bull; REV 3.2</span>
    </div>
  </aside>

  <!-- MAIN WRAPPER -->
  <div class="main-wrapper">

    <!-- Top Bar -->
    <header class="top-bar">
      <nav class="breadcrumb" id="breadcrumbContainer" aria-label="Breadcrumb navigation">
        <span class="breadcrumb-crumb active">Dashboard</span>
      </nav>

      <div class="top-bar-right">
        <div class="profile-chip" id="profileChip" role="button" tabIndex="0" aria-label="Open faculty profile">
          <div class="avatar-initials">RS</div>
          <span class="profile-chip-name">Dr. Rajesh Sharma</span>
        </div>
        <button class="btn-logout-icon" id="logoutBtn" title="Log out from Faculty Console" aria-label="Log out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Dynamic View Containers -->
    <main class="content-area">

      <!-- View 1: Dashboard Home -->
      <div id="view-dashboard" class="view active"></div>

      <!-- View 2: Manage Subjects -->
      <div id="view-subjects" class="view"></div>

      <!-- View 3: Manage Experiments -->
      <div id="view-experiments" class="view"></div>

      <!-- View 4: Create Experiment Wizard -->
      <div id="view-create-exp" class="view"></div>

      <!-- View 5: Reports -->
      <div id="view-reports" class="view"></div>

      <!-- View 6: Notifications -->
      <div id="view-notifications" class="view"></div>

      <!-- View 7: Faculty Profile -->
      <div id="view-profile" class="view"></div>

    </main>

  </div>

</div>

<!-- Modal Overlays -->
<div id="subjectModal" class="modal-overlay">
  <div class="modal-card">
    <h3 class="modal-title" id="subModalTitle">Add New Subject</h3>
    <div class="form-field">
      <label>Subject Name</label>
      <input type="text" id="subNameInput" placeholder="e.g. Quantum Physics Lab">
    </div>
    <div class="form-field">
      <label>Subject Tag Code</label>
      <input type="text" id="subTagInput" placeholder="e.g. QUANTUM">
    </div>
    <div class="form-field">
      <label>Short Description</label>
      <textarea id="subDescInput" rows="3" placeholder="Subject overview..."></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn-action-icon" onclick="closeSubjectModal()">Cancel</button>
      <button class="btn-btn-add" onclick="saveSubject()">Save Subject</button>
    </div>
  </div>
</div>

<!-- Client-side Faculty Console Application Script -->
<script src="../assets/js/faculty/faculty.js"></script>

</body>
</html>
