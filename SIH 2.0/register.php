<?php

$uname1 = $_POST['uname1'];
$email  = $_POST['email'];
$upswd1 = $_POST['upswd1'];

// Check if all fields are filled
if (!empty($uname1) && !empty($email) && !empty($upswd1))
{
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "faketrace";

    // Create connection
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if (mysqli_connect_error()) {
        die('Connect Error ('. mysqli_connect_errno() .') '. mysqli_connect_error());
    } else {
        $SELECT = "SELECT email FROM nsignup WHERE email = ? LIMIT 1";
        $INSERT = "INSERT INTO nsignup (uname1, email, upswd1) VALUES (?, ?, ?)";

        // Prepare statement for selecting email
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($email);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        // Check if the email already exists
        if ($rnum == 0) {
            $stmt->close();

            // Prepare statement for inserting new user
            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("sss", $uname1, $email, $upswd1);
            $stmt->execute();
            echo "New record inserted successfully";
        } else {
            echo "Someone already registered using this email";
        }

        $stmt->close();
        $conn->close();
    }
} else {
    echo "All fields are required";
    die();
}
?>
