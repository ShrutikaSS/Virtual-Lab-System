<?php
session_start();

$student = null;

if (isset($_SESSION['user_id'])) {
    try {
        @include_once "../include/dbConfig.php";
        if (isset($conn) && $conn) {
            $user_id = $_SESSION['user_id'];
            $sql = "SELECT * FROM users WHERE id = ?";
            $stmt = mysqli_prepare($conn, $sql);
            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $user_id);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                $student = mysqli_fetch_assoc($result);
            }
        }
    } catch (Exception $e) {
        $student = null;
    }
}

// Fallback mock student for local preview and prototype presentation
if (!$student) {
    $student = [
        'id' => 1,
        'username' => '21ai045@institute.edu',
        'full_name' => 'Aarav Sharma',
        'roll_no' => '21AI045',
        'academic_program' => 'B.E. Computer Engineering',
        'semester' => 'Semester III',
        'batch' => 'CS-3B',
        'email' => 'aarav.sharma@zeal.edu.in',
        'phone' => '+91 98765 43210',
        'faculty_mentor' => 'Dr. Rajesh Sharma'
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ZealVirtual Science Lab — Interactive Student Dashboard for Chemistry, Physics, and Electrical virtual lab experiments.">
  <title>Zeal Virtual Lab — Student Dashboard</title>

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
          <span class="logo-name">Zeal Virtual Lab</span>
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

    <!-- GLOBAL STICKY HEADER -->
    <header class="global-header">
      <div class="global-header-left">
        <div class="header-brand">
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
          <div>
            <div class="header-brand-title">Virtual Science Lab</div>
            <div class="header-brand-sub">Zeal Institute Student Portal</div>
          </div>
        </div>
      </div>

      <!-- Center Search Bar -->
      <div class="global-search-wrap" id="headerSearchWrap">
        <svg class="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" onclick="toggleMobileSearch()">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="globalSearchInput" class="global-search-input" placeholder="Search subjects, experiments..." oninput="handleGlobalSearch(this.value)">
        <!-- Live Search Results Dropdown -->
        <div id="globalSearchResults" class="search-results-dropdown"></div>
      </div>

      <!-- Right Controls -->
      <div class="global-header-right" id="headerRightControls">
        <!-- Notification Bell -->
        <button class="btn-notif-bell" title="System Notifications" aria-label="Notifications" onclick="toggleNotifDropdown()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="notif-badge" id="notifBadgeCount">3</span>
        </button>

        <!-- Notification Panel Dropdown -->
        <div id="notifDropdownPanel" class="notif-dropdown-panel">
          <div class="notif-header">
            <span>Student Notifications</span>
            <span class="mono" style="font-size:0.7rem; color:var(--bad);" id="notifUnreadText">3 New</span>
          </div>
          <div class="notif-list" id="headerNotifList">
            <div class="notif-item">
              <strong>Chemistry Lab Assignment Published</strong>
              <div style="font-size:0.78rem; color:var(--ink-soft);">Titration experiment lab manual is updated.</div>
            </div>
            <div class="notif-item">
              <strong>New Announcement from Dept</strong>
              <div style="font-size:0.78rem; color:var(--ink-soft);">All first-year virtual lab records must be finalized this week.</div>
            </div>
            <div class="notif-item">
              <strong>Ohm's Law Quiz Open</strong>
              <div style="font-size:0.78rem; color:var(--ink-soft);">Check your quiz readiness on the electrical lab bench.</div>
            </div>
          </div>
        </div>

        <!-- Language Selector -->
        <select class="lang-select" onchange="handleLanguageChange(this.value)" aria-label="Language selector">
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
        </select>

        <!-- User Profile Chip with Dropdown -->
        <div class="header-user-chip" onclick="toggleProfileDropdown()">
          <div class="avatar-initials" id="headerInitials">AS</div>
          <div style="text-align: left;">
            <span class="profile-chip-name" style="font-size:0.85rem; color:var(--white); display: block;" id="headerName">Aarav Sharma</span>
            <span class="profile-chip-role" style="font-size:0.65rem; color:rgba(251,250,245,0.7); display: block;">Student</span>
          </div>
          
          <!-- Profile Menu Dropdown -->
          <div id="profileDropdownPanel" class="profile-dropdown-panel">
            <div class="profile-dropdown-item" onclick="window.location.hash='#profile'">My Profile</div>
            <div class="profile-dropdown-item" onclick="window.location.hash='#profile'">Settings</div>
            <div class="profile-dropdown-item" style="color:var(--bad);" onclick="handleLogout()">Logout</div>
          </div>
        </div>

        <!-- Direct Logout Button -->
        <button class="btn-logout-icon" title="Log out" aria-label="Log out" onclick="handleLogout()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button for Overflow -->
      <button class="btn-mobile-overflow" id="btnMobileOverflow" onclick="toggleMobileOverflow()" style="display: none;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </button>

      <!-- Mobile Overflow Dropdown Panel -->
      <div id="mobileOverflowPanel" class="mobile-overflow-panel">
        <div class="mobile-notif-wrap" style="padding: 12px; border-bottom: 1px solid rgba(226, 236, 255, 0.08);">
          <div style="font-weight: 700; margin-bottom: 6px; display: flex; justify-content: space-between;">
            <span>Notifications</span>
            <span class="mono" style="color: var(--electrical);" id="mobileNotifCount">3</span>
          </div>
          <div id="mobileNotifsList" style="max-height: 120px; overflow-y: auto; font-size: 0.8rem; color: rgba(251,250,245,0.85);">
            <!-- Dynamic Notifications -->
          </div>
        </div>
        <div style="padding: 12px; border-bottom: 1px solid rgba(226, 236, 255, 0.08);">
          <label style="display: block; font-weight: 700; margin-bottom: 6px;">Language</label>
          <select class="lang-select" onchange="handleLanguageChange(this.value)" style="width: 100%;">
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>
        </div>
        <div style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
          <button onclick="window.location.hash='#profile'; toggleMobileOverflow();" style="text-align: left; color: var(--white); font-weight: 600; font-size: 0.9rem;">My Profile</button>
          <button onclick="handleLogout()" style="text-align: left; color: var(--bad); font-weight: 600; font-size: 0.9rem;">Logout</button>
        </div>
      </div>
    </header>

    <!-- Top Bar Breadcrumbs -->
    <div class="top-bar">
      <nav class="breadcrumb" id="breadcrumbContainer" aria-label="Breadcrumb navigation">
        <span class="breadcrumb-crumb active">Dashboard</span>
      </nav>
    </div>

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

    <!-- Global Footer -->
    <footer class="global-footer">
      <div class="footer-row-top">
        <span>&copy; 2026 Department of First Year Engineering</span>
        <span class="footer-divider">&bull;</span>
        <span>Virtual Science Lab Portal</span>
      </div>
      <div class="footer-row-bottom">
        <a href="javascript:void(0)" onclick="openFooterModal('privacyModal')">Privacy Policy</a>
        <span class="footer-divider">&bull;</span>
        <a href="javascript:void(0)" onclick="openFooterModal('termsModal')">Terms & Conditions</a>
        <span class="footer-divider">&bull;</span>
        <a href="javascript:void(0)" onclick="openFooterModal('helpModal')">Help & Support</a>
        <span class="footer-divider">&bull;</span>
        <a href="mailto:support.vlab@zeal.edu.in">support.vlab@zeal.edu.in</a>
        <span class="footer-divider">&bull;</span>
        <span class="tag-pill mono" style="font-size: 0.68rem; padding: 2px 6px;">v1.0.3</span>
        <span class="footer-divider">&bull;</span>
        <span class="mono" style="font-size: 0.68rem;">Last Updated: 2026-07-22</span>
      </div>
    </footer>

  </div>

</div>

<!-- Modals for Footer Links -->
<div id="privacyModal" class="modal-overlay" onclick="closeFooterModal('privacyModal')">
  <div class="modal-card" onclick="event.stopPropagation()">
    <span class="modal-close" onclick="closeFooterModal('privacyModal')">&times;</span>
    <h2 class="modal-title">Privacy Policy</h2>
    <div class="modal-body">
      <p>This Privacy Policy outlines how the Zeal Virtual Science Lab Portal collects, uses, and safeguards student lab session details, metrics, quiz logs, and telemetry data for academic progress monitoring.</p>
      <p>All stored data is strictly accessible to verified faculty mentors and administrators and is handled securely in compliance with institutional regulations.</p>
    </div>
  </div>
</div>

<div id="termsModal" class="modal-overlay" onclick="closeFooterModal('termsModal')">
  <div class="modal-card" onclick="event.stopPropagation()">
    <span class="modal-close" onclick="closeFooterModal('termsModal')">&times;</span>
    <h2 class="modal-title">Terms & Conditions</h2>
    <div class="modal-body">
      <p>By accessing this virtual science lab console, you agree to adhere to standard academic integrity guidelines. Plagiarism in lab readings, copying quiz answers, or using unauthorized automation tools is strictly prohibited and subject to institutional discipline.</p>
    </div>
  </div>
</div>

<div id="helpModal" class="modal-overlay" onclick="closeFooterModal('helpModal')">
  <div class="modal-card" onclick="event.stopPropagation()">
    <span class="modal-close" onclick="closeFooterModal('helpModal')">&times;</span>
    <h2 class="modal-title">Help & Support</h2>
    <div class="modal-body">
      <p>If you encounter simulation lag, incorrect calculations, or login issues, please contact the laboratory coordinator at the Department of First Year Engineering.</p>
      <p>Email: <a href="mailto:support.vlab@zeal.edu.in" style="color: var(--chem); font-weight: 700;">support.vlab@zeal.edu.in</a></p>
    </div>
  </div>
</div>

<script>
    window.loggedInStudent = <?php echo json_encode($student); ?>;
</script>

<!-- Client-side Dashboard Application Script -->
<script src="../assets/js/dashboard/dashboard.js"></script>

</body>
</html>
