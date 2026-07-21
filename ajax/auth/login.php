<?php

session_start();

include("../../include/dbConfig.php");

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';

if (empty($username) || empty($password) || empty($role)) {
    die("Please fill all required fields.");
}

$sql = "SELECT * FROM users
        WHERE username = ?
        AND role = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "ss",
    $username,
    $role
);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) === 1) {

    $user = mysqli_fetch_assoc($result);

    if (password_verify($password, $user['password'])) {

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['full_name'] = $user['full_name'];
        $_SESSION['role'] = $user['role'];

        if ($user['must_change_password'] == 1) {
            header("Location: ../../change-password.php");
            exit();
        }

        if ($user['role'] === 'student') {
            header("Location: ../../student/dashboard.php");
        } elseif ($user['role'] === 'faculty') {
            header("Location: ../../faculty/dashboard.php");
        } elseif ($user['role'] === 'admin') {
            header("Location: ../../admin/dashboard.php");
        }

        exit();

    } else {
        header("Location: ../../login.php?error=invalid_password");
  exit();
    }

} else {
    header("Location: ../../login.php?error=invalid_credentials");
exit();
}

?>