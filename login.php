<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ZealVirtual Science Lab — Secure clearance panel. Select your role (Student, Faculty, Admin) and authenticate to access your virtual bench.">
  <title>Virtual Lab — Sign in</title>

  <!-- Google Fonts matching index page -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">

  <!-- Unified Theme Stylesheet -->
  <link rel="stylesheet" href="assets/css/auth/login.css">
</head>
<body>

<div class="stage">

  <!-- LEFT COLUMN: ACCESS TERMINAL (Blueprint Theme) -->
  <div class="panel">
    <div class="brand">
      <a href="index.php" class="back-link mono" aria-label="Return to Virtual Lab portal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Portal
      </a>

      <!-- Brand Logo Block matching Landing Page -->
      <a href="index.php" class="logo-block" aria-label="ZealVirtual Science Lab — Home">
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
          <span class="logo-name">Zeal Institute</span>
          <span class="logo-sub">Virtual Science Lab Portal</span>
        </div>
      </a>

      <div class="brand-mark">
        <div class="brand-dot" id="brandDot"></div>
        <span class="mono brand-label">Access Terminal</span>
      </div>
      <h1 class="headline">Virtual Lab<br><span id="headlineAccent">clearance panel</span></h1>
      <p class="sub" id="sideNote">Select a clearance level, then sign in with your credentials. Each level unlocks a different set of instruments.</p>
    </div>

    <!-- Clearance Role Switchboard -->
    <div class="switchboard">
      <div class="switch-label-row">
        <span class="mono">Clearance level</span>
        <span class="mono" id="roleCount">01 / 03</span>
      </div>

      <button class="role-switch active" data-role="student" onclick="selectRole('student')" aria-label="Select student clearance level">
        <span class="role-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M9 2v6l-5 8a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-8V2"/>
            <path d="M7 2h10"/>
            <path d="M9 15h6"/>
          </svg>
        </span>
        <span class="role-text">
          <p class="role-name">Student</p>
          <p class="role-desc">Run simulations, submit reports, view grades</p>
        </span>
        <span class="led" aria-hidden="true"></span>
        <span class="arrow mono" aria-hidden="true">→</span>
      </button>

      <button class="role-switch" data-role="faculty" onclick="selectRole('faculty')" aria-label="Select faculty clearance level">
        <span class="role-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M9 12l2 2 4-4"/>
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <path d="M3 9h18"/>
          </svg>
        </span>
        <span class="role-text">
          <p class="role-name">Faculty</p>
          <p class="role-desc">Review submissions, grade experiments, manage sessions</p>
        </span>
        <span class="led" aria-hidden="true"></span>
        <span class="arrow mono" aria-hidden="true">→</span>
      </button>

      <button class="role-switch" data-role="admin" onclick="selectRole('admin')" aria-label="Select administrator clearance level">
        <span class="role-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/>
            <path d="M9.5 12l1.8 1.8L14.5 10"/>
          </svg>
        </span>
        <span class="role-text">
          <p class="role-name">Administrator</p>
          <p class="role-desc">Manage users, configure modules, audit activity</p>
        </span>
        <span class="led" aria-hidden="true"></span>
        <span class="arrow mono" aria-hidden="true">→</span>
      </button>
    </div>

    <!-- System Readout Info -->
    <div class="readout mono">
      <span>SYS.OK</span>
      <span id="clock" aria-label="System clock">--:--:--</span>
      <span>REV 3.2</span>
    </div>
  </div>

  <!-- RIGHT COLUMN: FORM (Paper Theme) -->
  <div class="form-side">
    <div class="form-wrap">
      <p class="form-eyebrow mono" id="formEyebrow">STUDENT ACCESS</p>
      <h2 class="form-title" id="formTitle">Sign in to your bench</h2>
      <p class="form-note" id="formNote">Use your institute email and roll number password to continue.</p>
 <?php
$error = $_GET['error'] ?? '';
$msg = $_GET['msg'] ?? '';
?>

      <?php if (!empty($msg)): ?>
      <p class="success-message" style="color: #2e7d32; background: rgba(46, 125, 50, 0.1); border: 1px solid rgba(46, 125, 50, 0.3); padding: 12px 15px; margin-bottom: 20px; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">
        <?php echo htmlspecialchars($msg); ?>
      </p>
      <?php endif; ?>

      <?php if ($error === 'invalid_password'): ?>
      <p class="error-message">
        Incorrect password. Please try again.
    </p>
     <?php elseif ($error === 'invalid_credentials'): ?>
    <p class="error-message">
        Invalid username or role.
    </p>
<?php endif; ?>
      <form action="ajax/auth/login.php" method="POST">
         <input type="hidden" name="role" id="roleField" value="student">

        <div class="field">
          <label id="idLabel" for="idField">Email or roll number</label>
          <input 
  id="idField" 
  name="username"
  type="text" 
  placeholder="e.g. 21ai045@institute.edu" 
  required 
  autocomplete="username"
>
        </div>

        <!-- Role specific extra details drawer -->
        <div class="extra-field show" id="extraField">
          <div class="extra-field-inner">
            <div class="field">
              <label id="extraLabel" for="extraInput">Batch / course code</label>
              <input id="extraInput" type="text" placeholder="e.g. CS-3B" autocomplete="off">
            </div>
          </div>
        </div>

        <div class="field">
          <label for="passField">Password</label>
          <div class="input-wrap">
            <input 
  id="passField" 
  name="password"
  type="password" 
  placeholder="••••••••••" 
  required 
  autocomplete="current-password"
>
            <button type="button" class="toggle-pass mono" onclick="togglePass()" aria-label="Toggle password visibility">SHOW</button>
          </div>
        </div>

        <div class="row-between">
          <label class="check"><input type="checkbox"> Remember this device</label>
          <a href="forgot_password.php?role=student" id="forgotPasswordLink">Forgot password?</a>
        </div>

        <button class="submit" type="submit" id="submitBtn">Enter lab</button>
      </form>

      <div class="divider mono">OR</div>

      <button class="sso" onclick="alert('Connect this to your institution SSO provider.')" aria-label="Sign in using institution SSO">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Continue with institution SSO
      </button>

      <p class="footnote">New here? <span onclick="alert('Link this to your registration flow.')">Request access</span></p>
    </div>
  </div>

</div>

<!-- Interactive Client-side Script -->
<script src="assets/js/auth/login.js"></script>

</body>
</html>
