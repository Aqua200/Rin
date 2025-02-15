import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  const contact = ["5216631079388", "Anika Dm", 1];
  const [number, name] = contact;
  const jid = `${number}@s.whatsapp.net`;

  let displayName;
  try {
    displayName = await conn.getName(jid);
  } catch (err) {
    displayName = name || "Desconocido";
  }

  let bio = "Sin descripción";
  try {
    const biografia = await conn.fetchStatus(jid);
    bio = biografia?.status || bio;
  } catch (err) {
    bio = "Sin descripción";
  }

  const newsletterName = '120363206717994793@newsletter';
  const newsletterInviteLink = 'https://whatsapp.com/channel/0029VazHywx0rGiUAYluYB24'; // Reemplaza con el enlace de invitación real

  let mensaje = `*╔══════════════════╗*\n`;
  mensaje += `*║ 💞 CREADOR DE LA BOT 💋*  \n`;
  mensaje += `*╚══════════════════╝*\n\n`;

  mensaje += `📢 *¡Hey! Aquí tienes la información de mi creador!* 👇\n\n`;

  mensaje += `💖 *Nombre:* ${displayName}\n`;
  mensaje += `📜 *Bio:* ${bio}\n\n`;

  mensaje += `🔹 Si tienes dudas, sugerencias o quieres reportar algo, contáctame. 😎\n\n`;
  mensaje += `✨ *¡Gracias por usar mi bot!* 💖\n\n`;

  mensaje += `📌 *Canal Oficial:* ${newsletterName}\n\n`;

  // URL del video (MP4)
  const videoUrl = 'https://qu.ax/TNCDy.mp4'; // Asegúrate de que dure menos de 6 segundos

  try {
    const videoResponse = await fetch(videoUrl);
    const videoBuffer = await videoResponse.buffer();

    await conn.sendMessage(m.chat, {
      video: videoBuffer,
      caption: mensaje,
      mimetype: 'video/mp4',
      gifPlayback: true // Esto hace que WhatsApp lo trate como GIF
    }, { quoted: m });

  } catch (error) {
    console.error('Error al enviar el video como GIF:', error);
  }

  // Enviar el contacto del owner en formato VCARD
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${displayName};;;
FN:${displayName}
ORG:${displayName}
TITLE:
TEL;waid=${number}:${number}
X-ABLabel:${bio}
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: displayName,
      contacts: [{ vcard }]
    }
  }, { quoted: m });

  // Envía el mensaje con el botón "Ver canal" (sin repetir el texto)
  await conn.sendMessage(m.chat, {
    text: '🔗 *¡Únete a nuestro canal oficial!*',
    footer: 'Presiona el botón para ver el canal',
    buttons: [
      { buttonId: 'idVerCanal', buttonText: { displayText: 'Ver canal' }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m });
};

// Manejador para el botón "Ver canal"
handler.command = /^(idVerCanal)$/i;
handler.action = async (m) => {
  const newsletterInviteLink = 'https://whatsapp.com/channel/0029VazHywx0rGiUAYluYB24'; // Reemplaza con el enlace de invitación real
  await conn.sendMessage(m.chat, { text: `🔗 *¡Únete a nuestro canal oficial!*\n\n${newsletterInviteLink}` }, { quoted: m });
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
