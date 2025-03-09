<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $txnId = htmlspecialchars($_POST['txn_id']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);

    // Handle file upload (payment screenshot)
    if (isset($_FILES['screenshot'])) {
        $targetDir = "uploads/";
        $targetFile = $targetDir . basename($_FILES["screenshot"]["name"]);
        move_uploaded_file($_FILES["screenshot"]["tmp_name"], $targetFile);
    }

    // Save the details to a text file or database
    $file = fopen("payment_details.txt", "a");
    fwrite($file, "Name: $name\nTransaction ID: $txnId\nEmail: $email\nPhone: $phone\nScreenshot: $targetFile\n---\n");
    fclose($file);

    echo "Payment details submitted! We will verify your payment and send the personalized link soon.";
} else {
    echo "Invalid request.";
}
?>
