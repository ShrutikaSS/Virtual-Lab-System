<?php
session_start();

include("../include/dbConfig.php");

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $full_name = trim($_POST['full_name'] ?? '');
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($full_name) || empty($username) || empty($email) || empty($password)) {
        $message = "Please fill in all required fields.";
    } else {
        // Hash the temporary password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Faculty role is fixed as 'faculty'
        $sql = "INSERT INTO users
                (full_name, username, email, password, role)
                VALUES (?, ?, ?, ?, 'faculty')";

        $stmt = mysqli_prepare($conn, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param(
                $stmt,
                "ssss",
                $full_name,
                $username,
                $email,
                $hashedPassword
            );

            if (mysqli_stmt_execute($stmt)) {
                $message = "Faculty account created successfully!";
            } else {
                $message = "Error: Username or email may already exist.";
            }

            mysqli_stmt_close($stmt);
        } else {
            $message = "Database error: Could not prepare query.";
        }
    }
}

?>

<!DOCTYPE html>
<html>

<head>
    <title>Create Faculty Account</title>
    <!-- Custom Animations & Cursor -->
    <link rel="stylesheet" href="../animations.css">
</head>

<body>

<h2>Create Faculty Account</h2>

<p><?php echo $message; ?></p>

<form method="POST">

    <label>Faculty Full Name</label>
    <br>
    <input type="text" name="full_name" required>

    <br><br>

    <label>Username</label>
    <br>
    <input type="text" name="username" required>

    <br><br>

    <label>Email</label>
    <br>
    <input type="email" name="email" required>

    <br><br>

    <label>Temporary Password</label>
    <br>
    <input type="password" name="password" required>

    <br><br>

    <button type="submit">
        Create Faculty Account
    </button>

</form>

<!-- Custom Animations & Cursor -->
<script src="../animations.js"></script>
</body>

</html>