<?php
session_start();

$admin = null;

if (isset($_SESSION['user_id']) && $_SESSION['role'] === 'admin') {
    try {
        @include_once '../include/dbConfig.php';
        if (isset($conn) && $conn) {
            $user_id = $_SESSION['user_id'];
            $sql = "SELECT * FROM users WHERE id = ? AND role = 'admin'";
            $stmt = mysqli_prepare($conn, $sql);
            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $user_id);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                $admin = mysqli_fetch_assoc($result);
                mysqli_stmt_close($stmt);
            }
        }
    } catch (Exception $e) {
        // Fall back to session or mock admin
    }
}

$broadcasts = [];
$users_list = [];
if (isset($conn) && $conn) {
    try {
        $res = mysqli_query($conn, "SELECT * FROM broadcasts ORDER BY created_at DESC LIMIT 20");
        if ($res) {
            while ($row = mysqli_fetch_assoc($res)) {
                $broadcasts[] = $row;
            }
        }
        $res2 = mysqli_query($conn, "SELECT id, full_name, username, email, role, created_at FROM users ORDER BY id DESC");
        if ($res2) {
            while ($row = mysqli_fetch_assoc($res2)) {
                $users_list[] = $row;
            }
        }
    } catch (Exception $e) {
        // Suppress errors
    }
}

if ($admin) {
    $admin['full_name'] = $admin['full_name'] ?? ($_SESSION['full_name'] ?? 'Administrator');
    $admin['email'] = $admin['email'] ?? ($_SESSION['email'] ?? 'admin@vidyut.edu');
    $admin['username'] = $admin['username'] ?? ($_SESSION['username'] ?? 'admin');
} else {
    $admin = [
        'id' => $_SESSION['user_id'] ?? 1,
        'full_name' => $_SESSION['full_name'] ?? 'Dr. Sunita Patil',
        'username' => $_SESSION['username'] ?? 'admin',
        'email' => $_SESSION['email'] ?? 'sunita.patil@vidyut.edu'
    ];
}

// Generate initials from full name
$words = explode(' ', trim($admin['full_name']));
$initials = '';
foreach ($words as $w) {
    if (!empty($w)) {
        $initials .= strtoupper($w[0]);
    }
}
$admin_initials = substr($initials, 0, 2) ?: 'AD';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ZealVirtual Science Lab — Administrator Dashboard for portal user management, subject oversight, faculty administration, content approval, and system telemetry.">
  <title>Zeal Virtual Lab — Administrator Dashboard</title>

  <!-- Google Fonts matching Student & Faculty dashboards -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Admin Dashboard Stylesheet -->
  <link rel="stylesheet" href="../assets/css/admin/admin.css">
  <!-- Custom Animations & Cursor -->
  <link rel="stylesheet" href="../animations.css">
</head>
<body>

<!-- Main Admin App Shell -->
<div id="appShell" class="app-container" style="display: flex;">

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
          <span class="logo-sub">Admin Portal</span>
        </div>
      </a>
    </div>

    <!-- Navigation Items -->
    <nav class="sidebar-nav" aria-label="Administrator Navigation">
      <div class="nav-item active" data-view="dashboard" tabIndex="0" role="button" aria-label="Admin Dashboard Home" onclick="switchView('dashboard')">
        <span class="nav-dot"></span>
        <span>Dashboard</span>
      </div>
      <div class="nav-item" data-view="users" tabIndex="0" role="button" aria-label="Manage Student Users" onclick="switchView('users')">
        <span class="nav-dot"></span>
        <span>Manage Users</span>
      </div>
      <div class="nav-item" data-view="subjects" tabIndex="0" role="button" aria-label="Manage Subjects" onclick="switchView('subjects')">
        <span class="nav-dot"></span>
        <span>Manage Subjects</span>
      </div>
      <div class="nav-item" data-view="faculty" tabIndex="0" role="button" aria-label="Manage Faculty Accounts" onclick="switchView('faculty')">
        <span class="nav-dot"></span>
        <span>Manage Faculty</span>
      </div>
      <div class="nav-item" data-view="experiments" tabIndex="0" role="button" aria-label="Manage Experiments Catalog" onclick="switchView('experiments')">
        <span class="nav-dot"></span>
        <span>Manage Experiments</span>
      </div>
      <div class="nav-item" data-view="approvals" tabIndex="0" role="button" aria-label="Content Approval Queue" onclick="switchView('approvals')">
        <span class="nav-dot"></span>
        <span>Content Approval</span>
      </div>
      <div class="nav-item" data-view="notifications" tabIndex="0" role="button" aria-label="System Notifications" onclick="switchView('notifications')">
        <span class="nav-dot"></span>
        <span>Notifications</span>
      </div>
      <div class="nav-item" data-view="reports" tabIndex="0" role="button" aria-label="View System Reports" onclick="switchView('reports')">
        <span class="nav-dot"></span>
        <span>Reports</span>
      </div>
      <div class="nav-item" data-view="activity" tabIndex="0" role="button" aria-label="Monitor User Activity" onclick="switchView('activity')">
        <span class="nav-dot"></span>
        <span>Activity Monitor</span>
      </div>
      <div class="nav-item" data-view="settings" tabIndex="0" role="button" aria-label="Backup & Settings" onclick="switchView('settings')">
        <span class="nav-dot"></span>
        <span>Backup / Settings</span>
      </div>
    </nav>

    <div class="sidebar-footer mono">
      <span>SYS.OK &bull; REV 3.2</span>
    </div>
  </aside>

  <!-- MAIN WRAPPER -->
  <div class="main-wrapper">

    <!-- GLOBAL STICKY HEADER (Appears on every page after login) -->
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
            <div class="header-brand-sub">Zeal Institute Portal</div>
          </div>
        </div>
      </div>

      <!-- Global Search Bar (Center) -->
      <div class="global-search-wrap">
        <svg class="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="global-search-input" placeholder="Search users, faculty, subjects, experiments..." oninput="handleGlobalSearch(this.value)">
        
        <!-- Live Search Results Dropdown -->
        <div id="globalSearchResults" class="search-results-dropdown"></div>
      </div>

      <!-- Header Right Controls -->
      <div class="global-header-right">
        
        <!-- Notification Bell -->
        <button class="btn-notif-bell" title="System Notifications" aria-label="Notifications" onclick="toggleNotifDropdown()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="notif-badge">3</span>
        </button>

        <!-- Notification Panel Dropdown -->
        <div id="notifDropdownPanel" class="notif-dropdown-panel">
          <div class="notif-header">
            <span>System Notifications</span>
            <span class="mono" style="font-size:0.7rem; color:var(--bad);">3 New</span>
          </div>
          <div class="notif-list">
            <div class="notif-item">
              <strong>Pending Content Review</strong>
              <div style="font-size:0.78rem; color:var(--ink-soft);">Prof. Meera Kulkarni submitted Newton Rings Physics experiment.</div>
            </div>
            <div class="notif-item">
              <strong>Failed Login Security Alert</strong>
              <div style="font-size:0.78rem; color:var(--ink-soft);">5 repeated invalid login attempts from external IP.</div>
            </div>
            <div class="notif-item">
              <strong>Automated Backup Complete</strong>
              <div style="font-size:0.78rem; color:var(--ink-soft);">Daily snapshot (142.8 MB) archived successfully.</div>
            </div>
          </div>
        </div>

        <!-- Language Selector Dropdown -->
        <select class="lang-select" onchange="handleLanguageChange(this.value)" aria-label="Language selector">
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
        </select>

        <!-- User Profile Chip with Dropdown -->
        <div class="header-user-chip" onclick="toggleProfileDropdown()">
          <div class="avatar-initials"><?php echo htmlspecialchars($admin_initials); ?></div>
          <span class="profile-chip-name" style="font-size:0.85rem; color:var(--white);"><?php echo htmlspecialchars($admin['full_name']); ?></span>
          
          <!-- Profile Menu Dropdown -->
          <div id="profileDropdownPanel" class="profile-dropdown-panel">
            <div class="profile-dropdown-item" onclick="switchView('settings')">My Profile</div>
            <div class="profile-dropdown-item" onclick="switchView('settings')">Settings</div>
            <div class="profile-dropdown-item" style="color:var(--bad);" onclick="handleAdminLogout()">Logout</div>
          </div>
        </div>

        <!-- Direct Logout Button -->
        <button class="btn-logout-icon" title="Log out" aria-label="Log out" onclick="handleAdminLogout()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
        </button>

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

      <!-- View 2: Manage Users -->
      <div id="view-users" class="view"></div>

      <!-- View 3: Manage Subjects -->
      <div id="view-subjects" class="view"></div>

      <!-- View 4: Manage Faculty -->
      <div id="view-faculty" class="view"></div>

      <!-- View 5: Manage Experiments -->
      <div id="view-experiments" class="view"></div>

      <!-- View 6: Content Approval Queue -->
      <div id="view-approvals" class="view"></div>

      <!-- View 7: Notifications -->
      <div id="view-notifications" class="view"></div>

      <!-- View 8: View System Reports -->
      <div id="view-reports" class="view"></div>

      <!-- View 9: Monitor User Activity -->
      <div id="view-activity" class="view"></div>

      <!-- View 10: Backup & Settings -->
      <div id="view-settings" class="view"></div>

    </main>

    <!-- GLOBAL FOOTER (Appears on every page after login) -->
    <footer class="global-footer">
      <div class="footer-left">
        <span>&copy; 2026 Department of First Year Engineering &bull; <strong>Virtual Science Lab Portal</strong></span>
      </div>
      <div class="footer-right">
        <div class="footer-links">
          <span class="footer-link" onclick="openPrivacyModal()">Privacy Policy</span>
          <span class="dot-divider">&bull;</span>
          <span class="footer-link" onclick="openTermsModal()">Terms & Conditions</span>
          <span class="dot-divider">&bull;</span>
          <span class="footer-link" onclick="openHelpModal()">Help & Support</span>
          <span class="dot-divider">&bull;</span>
          <a href="mailto:support@vidyut-labs.edu" class="footer-link">support@vidyut-labs.edu</a>
        </div>
        <span class="mono" style="font-size:0.75rem; background:rgba(21,42,80,0.08); padding:2px 8px; border-radius:4px;">v1.0.3 &bull; 2026-07-21</span>
      </div>
    </footer>

  </div>

</div>

<!-- Drawer Container for Faculty Detail View -->
<div id="facultyDrawer" class="drawer-overlay">
  <div class="drawer-card" id="drawerContent"></div>
</div>

<!-- Legal & Help Modals -->
<div id="privacyModal" class="modal-overlay">
  <div class="modal-card">
    <h3 class="modal-title">Privacy Policy</h3>
    <div class="modal-body-text">
      <p>The Zeal Virtual Science Lab portal collects telemetry data strictly for educational progress tracking and platform optimization.</p>
      <p>All student experiment logs, quiz scores, and activity timestamps are encrypted and stored in accordance with institutional data compliance policies.</p>
    </div>
    <div class="modal-actions">
      <button class="btn-btn-add" onclick="closeLegalModal('privacyModal')">Close</button>
    </div>
  </div>
</div>

<div id="termsModal" class="modal-overlay">
  <div class="modal-card">
    <h3 class="modal-title">Terms & Conditions</h3>
    <div class="modal-body-text">
      <p>Access to the Virtual Science Lab Administrator Portal is restricted to authorized faculty and system administration personnel.</p>
      <p>Unauthorized sharing of clearance credentials or modification of course module parameters is strictly prohibited and logged.</p>
    </div>
    <div class="modal-actions">
      <button class="btn-btn-add" onclick="closeLegalModal('termsModal')">Close</button>
    </div>
  </div>
</div>

<div id="helpModal" class="modal-overlay">
  <div class="modal-card">
    <h3 class="modal-title">Help & Support</h3>
    <div class="modal-body-text">
      <p><strong>Technical Assistance:</strong> Contact the IT Services Helpdesk at <a href="mailto:support@vidyut-labs.edu">support@vidyut-labs.edu</a>.</p>
      <p><strong>Operating Hours:</strong> Monday through Saturday, 09:00 AM &ndash; 06:00 PM IST.</p>
      <p><strong>Version Telemetry:</strong> Portal Version 1.0.3 (Build 2026-07-21).</p>
    </div>
    <div class="modal-actions">
      <button class="btn-btn-add" onclick="closeLegalModal('helpModal')">Close</button>
    </div>
  </div>
</div>

<!-- Inject server-side admin data -->
<script>
  window.SERVER_ADMIN = {
    name: <?php echo json_encode($admin['full_name']); ?>,
    initials: <?php echo json_encode($admin_initials); ?>,
    email: <?php echo json_encode($admin['email']); ?>,
    username: <?php echo json_encode($admin['username']); ?>
  };
  window.serverBroadcasts = <?php echo json_encode($broadcasts); ?>;
  window.serverUsers = <?php echo json_encode($users_list); ?>;
</script>
<!-- Client-side Admin Dashboard Application Script -->
<script src="../assets/js/admin/admin.js"></script>

</body>
</html>
