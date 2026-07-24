<?php
session_start();
include "../include/dbConfig.php";

header('Content-Type: application/json');

// Check if user is logged in and is either admin or faculty
if (!isset($_SESSION['user_id']) || !in_array($_SESSION['role'], ['admin', 'faculty'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized access. Only admin or faculty can send broadcasts.']);
    exit();
}

$message = trim($_POST['message'] ?? '');
$audience = trim($_POST['audience'] ?? 'All Users');
$sender = trim($_SESSION['full_name'] ?? ($_SESSION['role'] === 'admin' ? 'System Administrator' : 'Faculty Member'));

if (empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Message content is required.']);
    exit();
}

$sql = "INSERT INTO broadcasts (message, audience, sender) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "sss", $message, $audience, $sender);
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            'success' => true,
            'broadcast' => [
                'id' => mysqli_insert_id($conn),
                'message' => $message,
                'audience' => $audience,
                'sender' => $sender,
                'created_at' => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Database execution failed: ' . mysqli_stmt_error($stmt)]);
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Database prepare statement failed.']);
}
?>
