<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$phone = $_POST['number-phone'];
$name = $_POST['person-name'];
$address = $_POST['input-address'];
$noteOrder = $_POST['note-order'];
$courierComment = $_POST['courier-comment'];
$product = $_POST['product'];
$totalSum = $_POST['total-sum'];
$file = $_FILES['file'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = ''; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = ''; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom(''); // от кого будет уходить письмо?
$mail->addAddress('');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'ЗАЯВКА С САЙТА';
// $mail->Body    = '' .$name. ' оставил заявку, его телефон ' .$phone. '<br>Адрес: ' .$address. '<br>Пожелание к заказу: ' .$noteOrder. '<br>Комментарий для курьера: ' .$courierComment;

$mail->Body    = '<table style="width: 100%;">
  <tr style="background-color: #f8f8f8;">
    <td style="padding: 10px; border: #e9e9e9 1px solid;">Имя: </td>
    <td style="padding: 10px; border: #e9e9e9 1px solid;">' .$name. '</td>
  </tr>
  <tr style="background-color: #f8f8f8;">
    <td style="padding: 10px; border: #e9e9e9 1px solid;">Телефон: </td>
    <td style="padding: 10px; border: #e9e9e9 1px solid;">' .$phone. '</td>
  </tr>
  <tr style="background-color: #f8f8f8;">
    <td style="padding: 10px; border: #e9e9e9 1px solid;">Адрес: </td>
    <td style="padding: 10px; border: #e9e9e9 1px solid;">' .$address. '</td>
  </tr>
  <tr style="background-color: #f8f8f8;">
    <td style="padding: 10px; border: #e9e9e9 1px solid;">Пожелание к заказу: </td>
    <td style="padding: 10px; border: #e9e9e9 1px solid;">' .$noteOrder. '</td>
  </tr>
  <tr style="background-color: #f8f8f8;">
    <td style="padding: 10px; border: #e9e9e9 1px solid;">Комментарий для курьера: </td>
    <td style="padding: 10px; border: #e9e9e9 1px solid;">' .$courierComment. '</td>
  </tr>
  <tr style="background-color: #f8f8f8;">
    <td style="padding: 10px; border: #e9e9e9 1px solid;">Заказал: </td>
    <td style="padding: 10px; border: #e9e9e9 1px solid;">' .$product. '</td>
  </tr>
  <tr style="background-color: #f8f8f8;">
    <td style="padding: 10px; border: #e9e9e9 1px solid; color: red; font-weight: 700;">Итоговый чек: </td>
    <td style="padding: 10px; border: #e9e9e9 1px solid;">' .$totalSum. '</td>
  </tr>
</table>';


$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo 'Success';
}
?>
