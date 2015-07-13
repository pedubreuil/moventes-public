<?php

// Check for empty fields
if (empty($_POST['email']) ) {
    echo json_encode(array(
        'message' => sprintf("Erreur d'envoi : l'adresse email n'est pas définie"),
        success =>false
        ));
    return false;
}
else if(empty($_POST['message'])){
    echo json_encode(array(
        'message' => sprintf("Erreur d'envoi : le message n'est pas défini"),
        success =>false
        ));
    return false;

}
else if(!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array(
        'message' => sprintf("Erreur d'envoi : l'adresse email n'est pas valide"),
        success =>false
        ));
    return false;
}
else {

    $firstname = $_POST['firstname'];
    $name = strtoupper($_POST['lastname']);
    $email_address = $_POST['email'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];
    $message = $_POST['message'];

    $now = new DateTime(null, new DateTimeZone('Europe/Paris'));


// Create the email and send the message
$email1_to = 'contact@moventes.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email1_subject = "Contact par le site web de Moventes";
$email1_body = "\n\n---------------------------\nFrom: $firstname $name <$email_address> \nDate:".$now->format('d M Y H:i')."\nPhone: $phone\nCompany: $company\n\n\n$message";
$email1_headers = "From: noreply@moventes.com\n";
$email1_headers .= "Reply-To: $email_address";
$email1_result = mail($email1_to,$email1_subject,$email1_body,$email1_headers);

$email2_to = $email_address; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email2_subject = "Confirmation d'envoi de votre message";
$email2_body = "<html><body> $firstname $name,";
$email2_body .= '<br/><br/>Nous vous remercions pour votre message.<br/>Nous traitons votre demande dans les plus brefs d&eacute;lais.<br/><br/>L\'&eacute;quipe Moventes<br/><img src="http://moventes.com/img/signature_mail.png" style="width:300px"></body></html>';
$email2_headers = "MIME-Version: 1.0" . "\r\n";
$email2_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$email2_headers .= "From: noreply@moventes.com". "\r\n";
$email2_headers .= "Reply-To: contact@moventes.com". "\r\n";

$email2_result = mail($email2_to,$email2_subject,$email2_body,$email2_headers);


if($email1_result){
echo json_encode(array(
    'message' => sprintf('Votre message a bien &eacute;t&eacute; envoy&eacute;.'),
    success =>true
    ));
return true;
}
else {
     echo json_encode(array(
        'message' => sprintf("Erreur lors de l'envoi du message"),
        success =>false
        ));
    return false;

}

}

?>
