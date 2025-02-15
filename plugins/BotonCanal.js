const { generateWAMessage } = require('@whiskeysockets/baileys');

async function sendButtons(m) {
    const buttons = [
        {
            buttonId: 'joinChannel', // Identificador único para el botón
            buttonText: { displayText: 'Únete al canal' },
            type: 1,
        },
    ];

    // El mensaje con el texto "Hola" y el botón
    const buttonMessage = {
        text: 'Hola, ¡haz clic en el botón para unirte al canal!',
        footerText: 'Aquí tienes un canal interesante.',
        buttons: buttons,
        headerType: 1,
    };

    // Generar el mensaje interactivo
    const message = await generateWAMessage(m.chat, buttonMessage, {
        userJid: conn.user.id,
    });

    // Aquí pones la URL del canal de WhatsApp de prueba
    const channelLink = 'https://chat.whatsapp.com/ID_DEL_CANAL_O_GRUPO'; // Reemplaza con un ID de canal real

    // Enviar el mensaje con texto "Hola" y el link del canal
    conn.sendMessage(m.chat, {
        text: `Hola, ¡haz clic aquí para unirte al canal! ${channelLink}`,
        contextInfo: { mentionedJid: [m.sender] }, // Opcional: Mencionar al usuario
    }, { quoted: message });
}
