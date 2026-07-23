<?php
session_start();

include("include/dbConfig.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: forgot_password.php");
    exit();
}

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$role = trim($_POST['role'] ?? '');

$allowed_roles = ['student', 'faculty', 'admin'];

if (!$email || !in_array($role, $allowed_roles, true)) {
    header("Location: forgot_password.php?role=" . urlencode($role) . "&error=Invalid+email+or+role+selected");
    exit();
}

// Check if user exists in database with matching role
$sql = "SELECT id, full_name FROM users WHERE email = ? AND role = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ss", $email, $role);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (!$result || mysqli_num_rows($result) !== 1) {
    // For security against email enumeration or clear user feedback
    header("Location: forgot_password.php?role=" . urlencode($role) . "&error=email_not_found");
    exit();
}

$user = mysqli_fetch_assoc($result);
$full_name = $user['full_name'] ?? 'User';

// Generate secure 6-digit OTP
$otp = (string) random_int(100000, 999999);
$otp_hash = password_hash($otp, PASSWORD_DEFAULT);
$expires_at = date('Y-m-d H:i:s', time() + (10 * 60)); // 10 minutes from now

// Invalidate/Delete any old OTPs for this email and role
$delete_sql = "DELETE FROM password_resets WHERE email = ? AND role = ?";
$delete_stmt = mysqli_prepare($conn, $delete_sql);
mysqli_stmt_bind_param($delete_stmt, "ss", $email, $role);
mysqli_stmt_execute($delete_stmt);

// Insert new OTP record
$insert_sql = "INSERT INTO password_resets (email, role, otp, otp_hash, expires_at, attempts) VALUES (?, ?, ?, ?, ?, 0)";
$insert_stmt = mysqli_prepare($conn, $insert_sql);
mysqli_stmt_bind_param($insert_stmt, "sssss", $email, $role, $otp, $otp_hash, $expires_at);

if (!mysqli_stmt_execute($insert_stmt)) {
    header("Location: forgot_password.php?role=" . urlencode($role) . "&error=Failed+to+generate+OTP.+Please+try+again.");
    exit();
}

// Store session variables for verification step
$_SESSION['otp_email'] = $email;
$_SESSION['otp_role'] = $role;
$_SESSION['otp_verified'] = false;
$_SESSION['otp_user_name'] = $full_name;

// Send OTP Email
$mail_sent = false;

// Check if PHPMailer exists
$phpmailer_path = __DIR__ . '/vendor/autoload.php';
if (file_exists($phpmailer_path)) {
    require_once $phpmailer_path;
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        try {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            
            // Environment / Config variables or default local SMTP
            $smtp_host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
            $smtp_port = getenv('SMTP_PORT') ?: 587;
            $smtp_user = getenv('SMTP_USER') ?: '';
            $smtp_pass = getenv('SMTP_PASS') ?: '';
            
            if (!empty($smtp_user) && !empty($smtp_pass)) {
                $mail->isSMTP();
                $mail->Host       = $smtp_host;
                $mail->SMTPAuth   = true;
                $mail->Username   = $smtp_user;
                $mail->Password   = $smtp_pass;
                $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = $smtp_port;
            }
            
            $mail->setFrom(getenv('MAIL_FROM') ?: 'no-reply@zealvirtuallab.edu', 'ZealVirtual Science Lab');
            $mail->addAddress($email, $full_name);
            $mail->isHTML(true);
            $mail->Subject = 'ZealVirtual Science Lab — Your Password Reset OTP';
            $mail->Body    = "
                <div style='font-family: Arial, sans-serif; background-color: #F5F2E9; padding: 30px; color: #152A50;'>
                    <div style='max-width: 500px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2ecff;'>
                        <h2 style='color: #152A50; margin-top: 0;'>ZealVirtual Science Lab</h2>
                        <p>Hello <strong>" . htmlspecialchars($full_name) . "</strong>,</p>
                        <p>You requested a password reset for your <strong>" . htmlspecialchars(ucfirst($role)) . "</strong> account.</p>
                        <p>Your 6-digit Verification OTP code is:</p>
                        <div style='text-align: center; margin: 25px 0;'>
                            <span style='font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 6px; background: #152A50; color: #37B7A0; padding: 12px 24px; border-radius: 6px; display: inline-block;'>" . htmlspecialchars($otp) . "</span>
                        </div>
                        <p style='color: #d9534f; font-size: 13px;'><strong>Note:</strong> This code will expire in 10 minutes. Do not share this OTP with anyone.</p>
                        <hr style='border: none; border-top: 1px solid #eeeeee; margin: 20px 0;'>
                        <p style='font-size: 12px; color: #777777;'>If you did not request this password reset, please ignore this message.</p>
                    </div>
                </div>
            ";
            
            $mail->send();
            $mail_sent = true;
        } catch (Exception $e) {
            $mail_sent = false;
        }
    }
}

if (!$mail_sent) {
    // Standard PHP mail fallback
    $subject = "ZealVirtual Science Lab - Password Reset OTP";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <no-reply@zealvirtuallab.edu>' . "\r\n";
    $body = "
        <h2>ZealVirtual Science Lab</h2>
        <p>Hello " . htmlspecialchars($full_name) . ",</p>
        <p>Your OTP for password reset (" . htmlspecialchars(ucfirst($role)) . ") is: <strong>" . htmlspecialchars($otp) . "</strong></p>
        <p>This code expires in 10 minutes. Do not share it with anyone.</p>
    ";
    
    @mail($email, $subject, $body, $headers);
    
    // For local testing environment (XAMPP without active mail server), log OTP in session for testing ease
    $_SESSION['debug_otp'] = $otp;
}

header("Location: verify_otp.php");
exit();
