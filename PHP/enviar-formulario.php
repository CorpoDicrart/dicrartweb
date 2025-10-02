<?php
// ============================
// Script: enviar-formulario.php
// ============================

// Dirección de correo destino
$destinatario = "corporaciondicrart@gmail.com";

// Función para limpiar y validar entradas
function limpiar($dato) {
    return htmlspecialchars(trim($dato), ENT_QUOTES, 'UTF-8');
}

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Capturar y sanitizar datos
    $nombre   = limpiar($_POST["nombre"] ?? "");
    $email    = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $telefono = limpiar($_POST["telefono"] ?? "");
    $mensaje  = limpiar($_POST["mensaje"] ?? "");

    // Validación básica
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo "Por favor, completa todos los campos obligatorios.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El correo electrónico no es válido.";
        exit;
    }

    // Validar longitud de mensaje
    if (strlen($mensaje) < 10) {
        echo "El mensaje debe tener al menos 10 caracteres.";
        exit;
    }

    // Construcción del mensaje
    $asunto = "Nuevo mensaje desde la web - Corporación Dicrart";
    $cuerpo = "Has recibido un nuevo mensaje desde el formulario de contacto:\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";

    // Encabezados del correo
    $headers = "From: Corporación Dicrart <no-reply@dicrartweb.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
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