<?php
// Konfigurationseinstellungen
$empfaenger = "ihre-email@example.com"; // Ändern Sie dies zu Ihrer E-Mail-Adresse
$betreff = "Neue Anfrage von der Avanti-Webseite";

// Überprüfen, ob das Formular abgesendet wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sammeln der Formulardaten
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : 'Nicht angegeben';
    $firma = isset($_POST['company']) ? htmlspecialchars($_POST['company']) : 'Nicht angegeben';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : 'Nicht angegeben';
    $telefon = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : 'Nicht angegeben';
    $service = isset($_POST['service']) ? htmlspecialchars($_POST['service']) : 'Nicht angegeben';
    $datenschutz = isset($_POST['privacy_policy']) ? "Akzeptiert" : "Nicht akzeptiert";
    $marketing = isset($_POST['marketing_agreement']) ? "Akzeptiert" : "Nicht akzeptiert";
    
    // E-Mail-Inhalt erstellen
    $nachricht = "Neue Anfrage von der Avanti-Website:\n\n";
    $nachricht .= "Name: " . $name . "\n";
    $nachricht .= "Firma: " . $firma . "\n";
    $nachricht .= "E-Mail: " . $email . "\n";
    $nachricht .= "Telefon: " . $telefon . "\n";
    $nachricht .= "Gewünschter Service: " . $service . "\n";
    $nachricht .= "Datenschutzerklärung: " . $datenschutz . "\n";
    $nachricht .= "Marketing-Einwilligung: " . $marketing . "\n\n";
    $nachricht .= "Diese Nachricht wurde am " . date("d.m.Y") . " um " . date("H:i") . " Uhr gesendet.";
    
    // Header für die E-Mail
    $header = "From: " . $name . " <" . $email . ">\r\n";
    $header .= "Reply-To: " . $email . "\r\n";
    $header .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Senden der E-Mail
    $mail_sent = mail($empfaenger, $betreff, $nachricht, $header);
    
    // Antwort als JSON zurückgeben
    header('Content-Type: application/json');
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie uns telefonisch.']);
    }
    
    exit; // Beenden Sie das Skript nach dem Senden
}

// Wenn jemand direkt auf diese Datei zugreift, ohne das Formular abzuschicken
echo "Direkter Zugriff auf dieses Skript ist nicht erlaubt.";
?>
