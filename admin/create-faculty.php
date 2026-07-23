<?php
session_start();

$message = "";
$db_connected = false;

try {
    @include_once("../include/dbConfig.php");
    if (isset($conn) && $conn) {
        $db_connected = true;
    }
} catch (Exception $e) {
    // Database connection failed
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!$db_connected) {
        $message = "Database is currently offline. Cannot create account in preview mode.";
    } else {
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
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Faculty Account — Zeal Virtual Lab</title>
    
    <!-- Google Fonts matching Zeal theme -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400;1,8..60,500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom Animations & Cursor -->
    <link rel="stylesheet" href="../animations.css">
    
    <style>
        :root {
            --blueprint: #152A50;
            --blueprint-deep: #0D1D3B;
            --paper: #F5F2E9;
            --paper-dim: #EAE6D8;
            --ink: #152A50;
            --ink-soft: #48597E;
            --white: #FBFAF5;
            --accent: #F0B33E;
            
            --font-display: 'Space Grotesk', sans-serif;
            --font-body: 'Source Serif 4', serif;
            --font-mono: 'IBM Plex Mono', monospace;
            
            --r-sm: 4px;
            --r-md: 8px;
            --r-lg: 12px;
        }

        body {
            margin: 0;
            padding: 24px;
            font-family: var(--font-body);
            background-color: var(--blueprint-deep);
            color: var(--ink);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow-x: hidden;
            box-sizing: border-box;
        }

        /* Background blueprint grid lines */
        body::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(rgba(226, 236, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(226, 236, 255, 0.05) 1px, transparent 1px);
            background-size: 32px 32px;
            pointer-events: none;
            z-index: 0;
        }

        .form-container {
            background-color: var(--paper);
            border-radius: var(--r-lg);
            padding: 40px;
            width: 100%;
            max-width: 480px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1;
            border: 1px solid rgba(21, 42, 80, 0.12);
            box-sizing: border-box;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--ink-soft);
            text-decoration: none;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 24px;
            transition: color 0.2s ease;
        }
        .back-link:hover {
            color: var(--blueprint);
        }

        .mono-tag {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--ink-soft);
            margin-bottom: 8px;
        }

        .form-title {
            font-family: var(--font-display);
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--blueprint);
            margin: 0 0 8px 0;
            line-height: 1.2;
        }

        .form-subtitle {
            font-size: 0.9rem;
            color: var(--ink-soft);
            margin: 0 0 28px 0;
            line-height: 1.4;
        }

        .message-box {
            padding: 12px 16px;
            border-radius: var(--r-md);
            font-family: var(--font-mono);
            font-size: 0.8rem;
            margin-bottom: 24px;
        }
        .message-box.success {
            background-color: rgba(55, 183, 160, 0.1);
            color: #2e7d32;
            border: 1px solid rgba(55, 183, 160, 0.3);
        }
        .message-box.error {
            background-color: rgba(217, 99, 76, 0.1);
            color: #c62828;
            border: 1px solid rgba(217, 99, 76, 0.3);
        }

        .form-group {
            margin-bottom: 18px;
        }

        .form-group label {
            display: block;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--ink);
            margin-bottom: 6px;
        }

        .form-group input {
            width: 100%;
            padding: 10px 14px;
            border: 1.5px solid rgba(21, 42, 80, 0.2);
            background-color: rgba(21, 42, 80, 0.03);
            border-radius: var(--r-sm);
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--ink);
            transition: border-color 0.2s ease, background-color 0.2s ease;
            box-sizing: border-box;
        }
        .form-group input:focus {
            outline: none;
            border-color: var(--blueprint);
            background-color: var(--white);
        }

        .submit-btn {
            width: 100%;
            padding: 12px;
            background-color: var(--blueprint);
            color: var(--white);
            border: none;
            border-radius: var(--r-sm);
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: transform 0.2s ease, background-color 0.2s ease;
            margin-top: 10px;
        }
        .submit-btn:hover {
            background-color: var(--blueprint-deep);
            transform: translateY(-2px);
        }
    </style>
</head>

<body>

    <div class="form-container">
        <a href="dashboard.php" class="back-link">
            &larr; Back to Dashboard
        </a>

        <div class="mono-tag">Elevated Access Panel</div>
        <h1 class="form-title">Create Faculty</h1>
        <p class="form-subtitle">Register a new faculty account to grant them experiment management permissions.</p>

        <?php if (!$db_connected): ?>
            <div class="message-box error">
                <strong>Preview Mode:</strong> Database connection is offline. Form submission is disabled.
            </div>
        <?php endif; ?>

        <?php if (!empty($message)): ?>
            <div class="message-box <?php echo (strpos($message, 'successfully') !== false) ? 'success' : 'error'; ?>">
                <?php echo htmlspecialchars($message); ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <div class="form-group">
                <label for="full_name">Faculty Full Name</label>
                <input type="text" id="full_name" name="full_name" placeholder="e.g. Dr. Sunita Patil" required <?php echo !$db_connected ? 'disabled' : ''; ?>>
            </div>

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="e.g. sunita.patil" required <?php echo !$db_connected ? 'disabled' : ''; ?>>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="e.g. sunita.patil@vidyut.edu" required <?php echo !$db_connected ? 'disabled' : ''; ?>>
            </div>

            <div class="form-group">
                <label for="password">Temporary Password</label>
                <input type="password" id="password" name="password" placeholder="••••••••" required <?php echo !$db_connected ? 'disabled' : ''; ?>>
            </div>

            <button type="submit" class="submit-btn" <?php echo !$db_connected ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''; ?>>
                Create Faculty Account
            </button>
        </form>
    </div>

    <!-- Custom Animations & Cursor -->
    <script src="../animations.js"></script>
</body>

</html>