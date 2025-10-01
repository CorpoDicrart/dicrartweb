<?php
// ============================
// Script: enviar-formulario.php
// ============================

// Dirección de correo destino (CAMBIA si deseas otro)
$destinatario = "corporaciondicrart@gmail.com";

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Capturar datos y sanitizar
    $nombre   = htmlspecialchars(trim($_POST["nombre"]));
    $email    = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST["telefono"]));
    $mensaje  = htmlspecialchars(trim($_POST["mensaje"]));

    // Validación básica
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo "Por favor, completa todos los campos obligatorios.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El correo electrónico no es válido.";
        exit;
    }

    // Construcción del mensaje
    $asunto = "Nuevo mensaje desde la web - Corporación Dicrart";
    $cuerpo = "
    Has recibido un nuevo mensaje desde el formulario de contacto:

    Nombre: $nombre
    Email: $email
    Teléfono: $telefono
    Mensaje:
    $mensaje
    ";

    // Encabezados del correo
    $headers = "From: $nombre <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar correo
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo "✅ Gracias $nombre, tu mensaje fue enviado correctamente. Nos pondremos en contacto pronto.";
    } else {
        echo "❌ Lo sentimos, ocurrió un error al enviar tu mensaje. Intenta más tarde.";
    }

} else {
    echo "Acceso inválido.";
}
?>