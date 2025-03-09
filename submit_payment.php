<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['yourName']);
    $recipient = htmlspecialchars($_POST['recipientName']);
    $message = htmlspecialchars($_POST['customMessage']);
    $transactionId = htmlspecialchars($_POST['transactionId']);

    // Save details to a text file (you can change this to a database later)
    $file = fopen("payments.txt", "a");
    fwrite($file, "Name: $name\nRecipient: $recipient\nMessage: $message\nTransaction ID: $transactionId\n---\n");
    fclose($file);

    echo "Payment submitted successfully! We will verify it soon.";
} else {
    echo "Invalid request.";
}
?>
