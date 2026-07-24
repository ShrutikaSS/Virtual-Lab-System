<?php
session_start();

$faculty = null;

if (isset($_SESSION['user_id']) && $_SESSION['role'] === 'faculty') {
    try {
        @include_once '../include/dbConfig.php';
        if (isset($conn) && $conn) {
            $user_id = $_SESSION['user_id'];
            $sql = "SELECT * FROM users WHERE id = ? AND role = 'faculty'";
            $stmt = mysqli_prepare($conn, $sql);
            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $user_id);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                $faculty = mysqli_fetch_assoc($result);
                mysqli_stmt_close($stmt);
            }
        }
    } catch (Exception $e) {
        // Fall back to mock faculty
    }
}

$broadcasts = [];
$students_list = [];
if (isset($conn) && $conn) {
    try {
        $res = mysqli_query($conn, "SELECT * FROM broadcasts ORDER BY created_at DESC LIMIT 20");
        if ($res) {
            while ($row = mysqli_fetch_assoc($res)) {
                $broadcasts[] = $row;
            }
        }
        $res2 = mysqli_query($conn, "SELECT id, full_name, username, email, role, created_at FROM users WHERE role = 'student' ORDER BY id DESC");
        if ($res2) {
            while ($row = mysqli_fetch_assoc($res2)) {
                $students_list[] = $row;
            }
        }
    } catch (Exception $e) {
        // Suppress errors
    }
}

if ($faculty) {
    $faculty['full_name'] = $faculty['full_name'] ?? ($_SESSION['full_name'] ?? 'Faculty Member');
    $faculty['email'] = $faculty['email'] ?? ($_SESSION['email'] ?? 'faculty@vidyut.edu');
    $faculty['username'] = $faculty['username'] ?? ($_SESSION['username'] ?? 'faculty');
} else {
    $faculty = [
        'id' => $_SESSION['user_id'] ?? 1,
        'full_name' => $_SESSION['full_name'] ?? 'Dr. Sunita Patil',
        'username' => $_SESSION['username'] ?? 'sunita.patil',
        'email' => $_SESSION['email'] ?? 'sunita.patil@vidyut.edu',
        'phone' => '+91 98765 01234',
        'department' => 'Department of Applied Sciences & Engineering',
        'designation' => 'Professor & Lab Director'
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ZealVirtual Science Lab — Faculty Console for managing Virtual Lab subjects, experiments, student performance, and notifications.">
  <title>Zeal Virtual Lab — Faculty Console</title>

  <!-- Google Fonts matching landing & auth pages -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Faculty Console Stylesheet -->
  <link rel="stylesheet" href="../assets/css/faculty/faculty.css">
  <!-- Custom Animations & Cursor -->
  <link rel="stylesheet" href="../animations.css">
</head>
<body>

<!-- Main Faculty App Shell -->
<div id="appShell" class="app-container">

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
          <div class="avatar-initials" id="headerInitials">RS</div>
          <span class="profile-chip-name" id="headerName">Dr. Rajesh Sharma</span>
        </div>

        <!-- Direct Logout Button -->
        <button class="btn-logout-icon" title="Log out" aria-label="Log out" onclick="handleLogout()">
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

    <!-- GLOBAL FOOTER (Appears on every page) -->
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

<!-- Custom Animations & Cursor -->
<script src="../animations.js"></script>
<script>
    window.loggedInFaculty = <?php echo json_encode($faculty); ?>;
    window.serverBroadcasts = <?php echo json_encode($broadcasts); ?>;
    window.serverStudents = <?php echo json_encode($students_list); ?>;
</script>
<!-- Client-side Faculty Console Application Script -->
<script src="../assets/js/faculty/faculty.js"></script>

</body>
</html>
