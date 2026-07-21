<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ZealVirtual Science Lab — Interactive Student Dashboard for Chemistry, Physics, and Electrical virtual lab experiments.">
  <title>Vidyut Virtual Lab — Student Dashboard</title>

  <!-- Google Fonts matching landing & auth pages -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Dashboard Stylesheet -->
  <link rel="stylesheet" href="../assets/css/dashboard/dashboard.css">
</head>
<body>

<div class="app-container">

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
          <span class="logo-sub">Student Portal</span>
        </div>
      </a>
    </div>

    <!-- Navigation Items -->
    <nav class="sidebar-nav" aria-label="Main Dashboard Navigation">
      <div class="nav-item active" data-view="dashboard" tabIndex="0" role="button" aria-label="Navigate to Dashboard Home">
        <span class="nav-dot"></span>
        <span>Dashboard</span>
      </div>
      <div class="nav-item" data-view="chem" tabIndex="0" role="button" aria-label="Navigate to Chemistry Lab Bench">
        <span class="nav-dot"></span>
        <span>Chemistry</span>
      </div>
      <div class="nav-item" data-view="phy" tabIndex="0" role="button" aria-label="Navigate to Physics Lab Bench">
        <span class="nav-dot"></span>
        <span>Physics</span>
      </div>
      <div class="nav-item" data-view="elec" tabIndex="0" role="button" aria-label="Navigate to Electrical BEEE Lab Bench">
        <span class="nav-dot"></span>
        <span>Electrical (BEEE)</span>
      </div>
      <div class="nav-item" data-view="profile" tabIndex="0" role="button" aria-label="Navigate to My Student Profile">
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

      <div class="profile-chip" id="profileChip" role="button" tabIndex="0" aria-label="Open student profile">
        <div class="avatar-initials">AR</div>
        <span class="profile-chip-name">Aarav Rao</span>
      </div>
    </header>

    <!-- Dynamic View Containers -->
    <main class="content-area">

      <!-- View 1: Dashboard Home -->
      <div id="view-dashboard" class="view active"></div>

      <!-- View 2: Subject Grid -->
      <div id="view-subject" class="view"></div>

      <!-- View 3: Experiment Detail Workbench -->
      <div id="view-experiment" class="view"></div>

      <!-- View 4: Profile View -->
      <div id="view-profile" class="view"></div>

    </main>

  </div>

</div>

<!-- Client-side Dashboard Application Script -->
<script src="../assets/js/dashboard/dashboard.js"></script>

</body>
</html>
