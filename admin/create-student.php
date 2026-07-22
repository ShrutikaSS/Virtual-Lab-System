<?php
session_start();
include("../include/dbConfig.php");

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $full_name = trim($_POST['full_name']);
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users
            (full_name, username, email, password, role)
            VALUES (?, ?, ?, ?, 'student')";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "ssss",
        $full_name,
        $username,
        $email,
        $hashedPassword
    );

    if (mysqli_stmt_execute($stmt)) {
        $message = "Student account created successfully!";
    } else {
        $message = "Error: Username or email may already exist.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Create Student</title>
</head>
<body>

<h2>Create Student Account</h2>

<p><?php echo $message; ?></p>

<form method="POST">

    <label>Full Name</label>
    <input type="text" name="full_name" required>

    <br><br>

    <label>Username</label>
    <input type="text" name="username" required>

    <br><br>

    <label>Email</label>
    <input type="email" name="email">

    <br><br>

    <label>Temporary Password</label>
    <input type="password" name="password" required>

    <br><br>

    <button type="submit">Create Student</button>

</form>

</body>
</html>