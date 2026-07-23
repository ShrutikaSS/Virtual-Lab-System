<?php
session_start();

include("include/dbConfig.php");

$email = $_SESSION['otp_email'] ?? '';
$role = $_SESSION['otp_role'] ?? '';
$verified = $_SESSION['otp_verified'] ?? false;

// Direct access protection
if (empty($email) || empty($role) || $verified !== true) {
    header("Location: forgot_password.php?error=Unauthorized+access.+Please+verify+OTP+first.");
    exit();
}

$role_config = [
    'student' => [
        'accent' => '#37B7A0',
        'accent_dim' => 'rgba(55, 183, 160, 0.18)',
        'eyebrow' => 'STUDENT ACCESS — NEW PASSWORD',
        'title' => 'Set new password',
        'note' => 'Choose a strong new password for your student bench access.'
    ],
    'faculty' => [
        'accent' => '#F0B33E',
        'accent_dim' => 'rgba(240, 179, 62, 0.18)',
        'eyebrow' => 'FACULTY ACCESS — NEW PASSWORD',
        'title' => 'Set new console password',
        'note' => 'Choose a strong new password for your faculty console.'
    ],
    'admin' => [
        'accent' => '#9C8CF0',
        'accent_dim' => 'rgba(156, 140, 240, 0.18)',
        'eyebrow' => 'ADMINISTRATOR ACCESS — NEW PASSWORD',
        'title' => 'Set elevated account password',
        'note' => 'Choose a highly secure password for root access.'
    ]
];

$config = $role_config[$role] ?? $role_config['student'];
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    if (empty($new_password) || empty($confirm_password)) {
        $error = 'Please fill in all password fields.';
    } elseif ($new_password !== $confirm_password) {
        $error = 'New password and confirmation password do not match.';
    } elseif (strlen($new_password) < 6) {
        $error = 'Password must be at least 6 characters long.';
    } else {
        // Hash the new password securely
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

        // Update password in users table
        $sql = "UPDATE users SET password = ? WHERE email = ? AND role = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $hashed_password, $email, $role);

        if (mysqli_stmt_execute($stmt)) {
            // Delete used OTP records
            $del_sql = "DELETE FROM password_resets WHERE email = ? AND role = ?";
            $del_stmt = mysqli_prepare($conn, $del_sql);
            mysqli_stmt_bind_param($del_stmt, "ss", $email, $role);
            mysqli_stmt_execute($del_stmt);

            // Destroy recovery session variables
            unset($_SESSION['otp_email']);
            unset($_SESSION['otp_role']);
            unset($_SESSION['otp_verified']);
            unset($_SESSION['otp_reset_token']);
            unset($_SESSION['debug_otp']);

            // Redirect back to login with success message
            header("Location: login.php?msg=Password+updated+successfully.+Please+sign+in+with+your+new+password.");
            exit();
        } else {
            $error = 'Failed to update password. Please try again.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password — ZealVirtual Science Lab</title>

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
  </style>
</head>
<body>

<div class="stage">

  <!-- LEFT COLUMN: ACCESS TERMINAL -->
  <div class="panel">
    <div class="brand">
      <a href="login.php" class="back-link mono">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Cancel & Return to Login
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
        <span class="mono brand-label">Credentials Reset Phase</span>
      </div>
      <h1 class="headline">Set New<br><span>Password</span></h1>
      <p class="sub">Role: <strong><?php echo ucfirst(htmlspecialchars($role)); ?></strong><br>Account: <strong><?php echo htmlspecialchars($email); ?></strong></p>
    </div>

    <div class="readout mono">
      <span>RESET.PWD</span>
      <span id="clock">--:--:--</span>
      <span>REV 3.2</span>
    </div>
  </div>

  <!-- RIGHT COLUMN: FORM -->
  <div class="form-side">
    <div class="form-wrap">
      <p class="form-eyebrow mono"><?php echo htmlspecialchars($config['eyebrow']); ?></p>
      <h2 class="form-title"><?php echo htmlspecialchars($config['title']); ?></h2>
      <p class="form-note"><?php echo htmlspecialchars($config['note']); ?></p>

      <?php if (!empty($error)): ?>
        <p class="error-message"><?php echo htmlspecialchars($error); ?></p>
      <?php endif; ?>

      <form action="reset_password.php" method="POST">
        <div class="field">
          <label for="passField">New Password</label>
          <div class="input-wrap">
            <input 
              id="passField" 
              name="password" 
              type="password" 
              placeholder="••••••••••••" 
              required 
              autocomplete="new-password"
              autofocus
            >
            <button type="button" class="toggle-pass mono" onclick="togglePass('passField', this)">SHOW</button>
          </div>
        </div>

        <div class="field">
          <label for="confirmPassField">Confirm New Password</label>
          <div class="input-wrap">
            <input 
              id="confirmPassField" 
              name="confirm_password" 
              type="password" 
              placeholder="••••••••••••" 
              required 
              autocomplete="new-password"
            >
            <button type="button" class="toggle-pass mono" onclick="togglePass('confirmPassField', this)">SHOW</button>
          </div>
        </div>

        <button class="submit" type="submit">Update Password & Login</button>
      </form>
    </div>
  </div>

</div>

<script>
  function togglePass(fieldId, btn) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const isPassword = field.type === 'password';
    field.type = isPassword ? 'text' : 'password';
    btn.textContent = isPassword ? 'HIDE' : 'SHOW';
  }

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
