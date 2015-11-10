<?php
/** MySQL database name */
$DB_NAME='moventespxdb';

/** Database host (in most cases it's localhost) */
$DB_HOST= 'moventespxdb.mysql.db';

/** MySQL username (must be assigned to the database) */
$DB_USER= 'moventespxdb';

/** MySQL password */
$DB_PASSWORD= 'z3rWapr278x';



// Check for empty fields
if (empty($_POST['email']) ) {
    echo json_encode(array(
        'message' => sprintf("Erreur d'envoi : l'adresse email n'est pas définie"),
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
    $name = $_POST['lastname'];//strtoupper($_POST['lastname']);
    $email_address = $_POST['email'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];
    $activity = $_POST['activity'];
    $message = $_POST['message'];
    $newsletter = $_POST['newsletter'] == 1;
    $mobilityPotential = $_POST['mobilityPotential']  == 1;
    $quotation = $_POST['quotation']  == 1;


    $now = new DateTime(null, new DateTimeZone('Europe/Paris'));


    // Create the email and send the message
    $email1_to = 'contact@moventes.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
    $email1_subject = "Contact par le site web de Moventes";
    $email1_body = "\n\n---------------------------\nFrom: $firstname $name <$email_address> \nDate:".$now->format('d M Y H:i')."\nPhone: $phone\nCompany: $company\nActivity: $activity\n\n\n$message";


    if($newsletter){
        $email1_body .= "\n- Newsletter mensuelle";
    }
    if($mobilityPotential){
        $email1_body .= "\n- Etude du potentiel mobilité";
    }
    if($quotation){
        $email1_body .= "\n- Devis d'application mobile";
    }

    $email1_headers = "From: noreply@moventes.com\n";
    $email1_headers .= "Reply-To: $email_address";
    $email1_result = mail($email1_to,$email1_subject,$email1_body,$email1_headers);



    if($mobilityPotential || $quotation || $message){
        $email2_to = $email_address; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
        $email2_subject = "Confirmation d'envoi de votre message";
        $email2_body = "<html><body> $firstname $name,";
        $email2_body .= '<br/><br/>Nous vous remercions pour votre message.<br/>Nous traitons votre demande dans les plus brefs d&eacute;lais.<br/><br/>L\'&eacute;quipe Moventes<br/><img src="http://moventes.com/img/signature_mail.png" style="width:250px"></body></html>';
        $email2_headers = "MIME-Version: 1.0" . "\r\n";
        $email2_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $email2_headers .= "From: noreply@moventes.com". "\r\n";
        $email2_headers .= "Reply-To: contact@moventes.com". "\r\n";

        $email2_result = mail($email2_to,$email2_subject,$email2_body,$email2_headers);

    }

    //----------------------------------------------
    //----------------------------------------------
    //----------------------------------------------


    // Create connection
    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO www_contact (firstname, name, email_address,phone,company,activity,message,newsletter,mobilityPotential,quotation )
VALUES (    '$firstname',
    '$name',
    '$email_address',
    '$phone',
    '$company',
    '$activity',
    '$message',
    '$newsletter',
    '$mobilityPotential',
    '$quotation'
)";

    $sql_query_result = $conn->query($sql);

    $conn->close();


    //----------------------------------------------
    //----------------------------------------------
    //----------------------------------------------

    if($newsletter){

        $url = 'http://moventes.us10.list-manage.com/subscribe/post?u=ff9ae9b8849871b2a6431cf02&amp;id=49374b003f';
        $myvars = 'EMAIL=' . $email_address
            . '&LNAME=' . $name
            . '&C0MPNY='. $company
            . '&ACTIVT='. $activity;


        //create cURL connection
        $curl_connection = curl_init( $url );

        //set options
        curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($curl_connection, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
        curl_setopt( $curl_connection, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt( $curl_connection, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt( $curl_connection, CURLOPT_POST, 1);
        curl_setopt( $curl_connection, CURLOPT_HEADER, 0);

        //set data to be posted
        curl_setopt( $curl_connection, CURLOPT_POSTFIELDS, $myvars);

        //perform our request
        $result = curl_exec($curl_connection);

        //show information regarding the request
        //        print_r(curl_getinfo($curl_connection));
        //        echo curl_errno($curl_connection) . '-' .
        //            curl_error($curl_connection);

        //close the connection
        curl_close($curl_connection);



    }








    //----------------------------------------------
    //----------------------------------------------
    //----------------------------------------------


    if($email1_result && $sql_query_result === TRUE){
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
