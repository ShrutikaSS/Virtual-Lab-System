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
        WHERE (username = ? OR email = ?)
        AND role = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "sss",
    $username,
    $username,
    $role
);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) === 1) {

    $user = mysqli_fetch_assoc($result);

    if (password_verify($password, $user['password'])) {

        // Reset session array to ensure previous user data is cleared
        $_SESSION = [];

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['full_name'] = $user['full_name'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'];

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