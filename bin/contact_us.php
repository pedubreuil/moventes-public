<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo json_encode(array(
    'message' => sprintf("Erreur lors de l'envoi du message."),
    success =>false
));
	return false;
   }

$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$company = $_POST['company'];
$message = $_POST['message'];

$now = new DateTime(null, new DateTimeZone('Europe/Paris'));


// Create the email and send the message
$to = 'contact@moventes.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Contact par le site web de Moventes";
$email_body = "\n\n---------------------------\nFrom: $name <$email_address> \nDate:".$now->format('d M Y H:i')."\nPhone: $phone\nCompany: $company\n\n\n$message";
$headers = "From: noreply@moventes.com\n";
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
echo json_encode(array(
    'message' => sprintf('Votre message a bien &eacute;t&eacute; envoy&eacute;.'),
    success =>true
));

return true;
?>
