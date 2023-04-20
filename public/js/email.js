const nodemailer = require('nodemailer');

function enviarCorreoElectronico(destinatario, asunto, contenido) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'fabio.capriotti20@gmail.com',
      pass: 'tu_contraseña'
    }
  });

  let mailOptions = {
    from: 'fabio.capriotti20@gmail.com',
    to: destinatario,
    subject: asunto,
    text: contenido
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
}

module.exports = { enviarCorreoElectronico };
