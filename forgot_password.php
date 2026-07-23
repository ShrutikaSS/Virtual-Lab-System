<?php
session_start();

$role = $_GET['role'] ?? ($_SESSION['otp_role'] ?? 'student');
$allowed_roles = ['student', 'faculty', 'admin'];
if (!in_array($role, $allowed_roles, true)) {
    $role = 'student';
}

$role_config = [
    'student' => [
        'accent' => '#37B7A0',
        'accent_dim' => 'rgba(55, 183, 160, 0.18)',
        'eyebrow' => 'STUDENT ACCESS — RECOVERY',
        'title' => 'Reset your password',
        'note' => 'Enter your registered student email address to receive a 6-digit verification code.'
    ],
    'faculty' => [
        'accent' => '#F0B33E',
        'accent_dim' => 'rgba(240, 179, 62, 0.18)',
        'eyebrow' => 'FACULTY ACCESS — RECOVERY',
        'title' => 'Reset console password',
        'note' => 'Enter your institutional faculty email address to receive a 6-digit verification code.'
    ],
    'admin' => [
        'accent' => '#9C8CF0',
        'accent_dim' => 'rgba(156, 140, 240, 0.18)',
        'eyebrow' => 'ADMINISTRATOR ACCESS — RECOVERY',
        'title' => 'Elevated access recovery',
        'note' => 'Enter your registered administrator email address to initiate verification.'
    ]
];

$config = $role_config[$role];
$error = $_GET['error'] ?? '';
$msg = $_GET['msg'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ZealVirtual Science Lab — Forgot Password Recovery">
  <title>Forgot Password — ZealVirtual Science Lab</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">

  <!-- Unified Theme Stylesheet -->
  <link rel="stylesheet" href="assets/css/auth/login.css">
  <style>
    :root {
      --accent: <?php echo $config['accent']; ?>;
      --accent-dim: <?php echo $config['accent_dim']; ?>;
    }
    .success-message {
      color: #2e7d32;
      background: rgba(46, 125, 50, 0.1);
      border: 1px solid rgba(46, 125, 50, 0.3);
      padding: 12px 15px;
      margin-bottom: 20px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 13px;
    }
  </style>
</head>
<body>

<div class="stage">

  <!-- LEFT COLUMN: ACCESS TERMINAL (Blueprint Theme) -->
  <div class="panel">
    <div class="brand">
      <a href="login.php" class="back-link mono" aria-label="Return to Sign in">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Sign in
      </a>

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
        <div class="brand-dot" style="background: <?php echo $config['accent']; ?>; box-shadow: 0 0 12px <?php echo $config['accent']; ?>;"></div>
        <span class="mono brand-label">Account Security Terminal</span>
      </div>
      <h1 class="headline">Password<br><span>Recovery</span></h1>
      <p class="sub">Clearance level selected: <strong><?php echo ucfirst(htmlspecialchars($role)); ?></strong>. Submit your registered email address to verify ownership.</p>
    </div>

    <div class="readout mono">
      <span>SEC.VERIFY</span>
      <span id="clock">--:--:--</span>
      <span>REV 3.2</span>
    </div>
  </div>

  <!-- RIGHT COLUMN: FORM (Paper Theme) -->
  <div class="form-side">
    <div class="form-wrap">
      <p class="form-eyebrow mono"><?php echo htmlspecialchars($config['eyebrow']); ?></p>
      <h2 class="form-title"><?php echo htmlspecialchars($config['title']); ?></h2>
      <p class="form-note"><?php echo htmlspecialchars($config['note']); ?></p>

      <?php if ($error === 'invalid_role'): ?>
        <p class="error-message">Invalid clearance role specified.</p>
      <?php elseif ($error === 'email_not_found'): ?>
        <p class="error-message">No registered account found with that email for the selected role.</p>
      <?php elseif ($error === 'mail_failed'): ?>
        <p class="error-message">Failed to send OTP email. Please check server configuration or try again later.</p>
      <?php elseif ($error === 'session_expired'): ?>
        <p class="error-message">Your recovery session has expired. Please request a new OTP.</p>
      <?php elseif (!empty($error)): ?>
        <p class="error-message"><?php echo htmlspecialchars($error); ?></p>
      <?php endif; ?>

      <?php if (!empty($msg)): ?>
        <p class="success-message"><?php echo htmlspecialchars($msg); ?></p>
      <?php endif; ?>

      <form action="send_otp.php" method="POST">
        <input type="hidden" name="role" value="<?php echo htmlspecialchars($role); ?>">

        <div class="field">
          <label for="emailInput">Registered Email Address</label>
          <input 
            id="emailInput" 
            name="email" 
            type="email" 
            placeholder="e.g. user@institute.edu" 
            required 
            autocomplete="email"
          >
        </div>

        <button class="submit" type="submit">Send Verification Code</button>
      </form>

      <div class="divider mono">OR</div>

      <p class="footnote">Remember your credentials? <a href="login.php" style="color: var(--accent); font-weight: 600; text-decoration: none;">Return to Login</a></p>
    </div>
  </div>

</div>

<script>
  function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString('en-GB');
    }
  }
  updateClock();
  setInterval(updateClock, 1000);
</script>

</body>
</html>