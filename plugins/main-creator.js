import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  const contact = ["526631079388", "Anika Dm", 1];
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

  const newsletterName = 'Seguirme bb 😘';
  let mensaje = `*💞 Creador de la Bot 💋*\n\n`;
  mensaje += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;
  mensaje += `• *${displayName}*\n📄 ${bio}\n\n`;
  mensaje += `Canal: ${newsletterName}\n\n`;

  // URL del video (MP4)
  const videoUrl = 'https://qu.ax/TNCDy.mp4'; // Reemplázalo con un enlace MP4 válido

  try {
    const videoResponse = await fetch(videoUrl);
    const videoBuffer = await videoResponse.buffer();
    
    await conn.sendMessage(m.chat, { 
      video: videoBuffer,
      caption: mensaje,
      mimetype: 'video/mp4'
    }, { quoted: m });

  } catch (error) {
    console.error('Error al enviar el video:', error);
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
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
