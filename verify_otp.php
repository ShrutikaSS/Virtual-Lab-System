<?php
session_start();

include("include/dbConfig.php");

$email = $_SESSION['otp_email'] ?? '';
$role = $_SESSION['otp_role'] ?? '';

if (empty($email) || empty($role)) {
    header("Location: forgot_password.php?error=Session+invalid.+Please+request+OTP+again.");
    exit();
}

$role_config = [
    'student' => [
        'accent' => '#37B7A0',
        'accent_dim' => 'rgba(55, 183, 160, 0.18)',
        'eyebrow' => 'STUDENT ACCESS — OTP VERIFICATION',
        'title' => 'Verify 6-digit OTP',
        'note' => 'Enter the code sent to ' . htmlspecialchars($email) . '. It will expire in 10 minutes.'
    ],
    'faculty' => [
        'accent' => '#F0B33E',
        'accent_dim' => 'rgba(240, 179, 62, 0.18)',
        'eyebrow' => 'FACULTY ACCESS — OTP VERIFICATION',
        'title' => 'Verify console code',
        'note' => 'Enter the code sent to ' . htmlspecialchars($email) . '. It will expire in 10 minutes.'
    ],
    'admin' => [
        'accent' => '#9C8CF0',
        'accent_dim' => 'rgba(156, 140, 240, 0.18)',
        'eyebrow' => 'ADMINISTRATOR ACCESS — OTP VERIFICATION',
        'title' => 'Verify identity code',
        'note' => 'Enter the elevated security code sent to ' . htmlspecialchars($email) . '.'
    ]
];

$config = $role_config[$role] ?? $role_config['student'];
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitted_otp = trim($_POST['otp'] ?? '');

    if (empty($submitted_otp) || strlen($submitted_otp) !== 6) {
        $error = 'Please enter a valid 6-digit verification code.';
    } else {
        // Fetch active OTP record for this email and role
        $sql = "SELECT id, otp, otp_hash, expires_at, attempts FROM password_resets WHERE email = ? AND role = ? ORDER BY id DESC LIMIT 1";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $email, $role);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($result && mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            $record_id = $row['id'];
            $attempts = (int) $row['attempts'];
            $expires_at = strtotime($row['expires_at']);
            $current_time = time();

            if ($current_time > $expires_at) {
                $error = 'Verification code has expired. Please request a new OTP.';
            } elseif ($attempts >= 5) {
                // Delete invalid record due to too many attempts
                $del_sql = "DELETE FROM password_resets WHERE id = ?";
                $del_stmt = mysqli_prepare($conn, $del_sql);
                mysqli_stmt_bind_param($del_stmt, "i", $record_id);
                mysqli_stmt_execute($del_stmt);

                $error = 'Too many failed attempts. Security lock triggered. Please request a new OTP.';
            } else {
                // Verify OTP against hash or direct value
                $is_valid = false;
                if (!empty($row['otp_hash']) && password_verify($submitted_otp, $row['otp_hash'])) {
                    $is_valid = true;
                } elseif ($submitted_otp === $row['otp']) {
                    $is_valid = true;
                }

                if ($is_valid) {
                    // Mark as verified in session
                    $_SESSION['otp_verified'] = true;
                    $_SESSION['otp_reset_token'] = bin2hex(random_bytes(16));
                    
                    header("Location: reset_password.php");
                    exit();
                } else {
                    // Increment failed attempt count
                    $new_attempts = $attempts + 1;
                    $upd_sql = "UPDATE password_resets SET attempts = ? WHERE id = ?";
                    $upd_stmt = mysqli_prepare($conn, $upd_sql);
                    mysqli_stmt_bind_param($upd_stmt, "ii", $new_attempts, $record_id);
                    mysqli_stmt_execute($upd_stmt);

                    $remaining = 5 - $new_attempts;
                    if ($remaining > 0) {
                        $error = "Incorrect verification code. You have {$remaining} attempt(s) remaining.";
                    } else {
                        $error = "Too many failed attempts. Please request a new OTP.";
                    }
                }
            }
        } else {
            $error = 'No active OTP request found. Please request a new OTP.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify OTP — ZealVirtual Science Lab</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="assets/css/auth/login.css">
  <style>
    :root {
      --accent: <?php echo $config['accent']; ?>;
      --accent-dim: <?php echo $config['accent_dim']; ?>;
    }
    .otp-input {
      letter-spacing: 12px;
      font-size: 24px !important;
      text-align: center;
      font-family: 'IBM Plex Mono', monospace !important;
      font-weight: 700;
    }
    .debug-notice {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeeba;
      padding: 10px 14px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>

<div class="stage">

  <!-- LEFT COLUMN: ACCESS TERMINAL -->
  <div class="panel">
    <div class="brand">
      <a href="forgot_password.php?role=<?php echo urlencode($role); ?>" class="back-link mono">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Email Request
      </a>

      <a href="index.php" class="logo-block">
        <div class="logo-ring">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3.5" opacity="0.6"/>
            <circle cx="24" cy="24" r="17.5" stroke="currentColor" stroke-width="1" opacity="0.35"/>
            <path d="M20.5 12.5 H27.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M22.5 12.5 V19 L16 30.5 a2.5 2.5 0 0 0 2.2 3.7 H29.8 a2.5 2.5 0 0 0 2.2 -3.7 L26 19 V12.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">Zeal Institute</span>
          <span class="logo-sub">Virtual Science Lab Portal</span>
        </div>
      </a>

      <div class="brand-mark">
        <div class="brand-dot" style="background: <?php echo $config['accent']; ?>; box-shadow: 0 0 12px <?php echo $config['accent']; ?>;"></div>
        <span class="mono brand-label">OTP Verification Phase</span>
      </div>
      <h1 class="headline">Code<br><span>Verification</span></h1>
      <p class="sub">Role: <strong><?php echo ucfirst(htmlspecialchars($role)); ?></strong><br>Target Email: <strong><?php echo htmlspecialchars($email); ?></strong></p>
    </div>

    <div class="readout mono">
      <span>OTP.CHECK</span>
      <span id="clock">--:--:--</span>
      <span>REV 3.2</span>
    </div>
  </div>

  <!-- RIGHT COLUMN: FORM -->
  <div class="form-side">
    <div class="form-wrap">
      <p class="form-eyebrow mono"><?php echo htmlspecialchars($config['eyebrow']); ?></p>
      <h2 class="form-title"><?php echo htmlspecialchars($config['title']); ?></h2>
      <p class="form-note"><?php echo $config['note']; ?></p>

      <?php if (!empty($_SESSION['debug_otp'])): ?>
        <div class="debug-notice">
          <strong>[Local Demo Info]:</strong> Your OTP is <strong><?php echo htmlspecialchars($_SESSION['debug_otp']); ?></strong>
        </div>
      <?php endif; ?>

      <?php if (!empty($error)): ?>
        <p class="error-message"><?php echo htmlspecialchars($error); ?></p>
      <?php endif; ?>

      <form action="verify_otp.php" method="POST">
        <div class="field">
          <label for="otpInput">Enter 6-Digit OTP</label>
          <input 
            id="otpInput" 
            name="otp" 
            type="text" 
            maxlength="6" 
            pattern="[0-9]{6}" 
            placeholder="000000" 
            required 
            class="otp-input"
            autocomplete="one-time-code"
            autofocus
          >
        </div>

        <button class="submit" type="submit">Verify & Proceed</button>
      </form>

      <div class="divider mono">OR</div>

      <p class="footnote">Didn't receive the code? <a href="forgot_password.php?role=<?php echo urlencode($role); ?>" style="color: var(--accent); font-weight: 600; text-decoration: none;">Resend OTP</a></p>
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
