import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // Definimos el número y nombre del único owner aquí
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

  // Nombre del canal que queremos mostrar en el texto
  const newsletterName = 'Seguirme bb 😘';

  // Creamos el mensaje de texto (caption) incluyendo la información del canal
  let mensaje = `*💞 Creador de la Bot 💋*\n\n`;
  mensaje += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;
  mensaje += `• *${displayName}*\n📄 ${bio}\n\n`;
  mensaje += `Canal: ${newsletterName}\n\n`;

  // Descargamos la imagen desde la URL
  const imageUrl = 'https://qu.ax/DnkVz.jpg';
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();

  // Enviamos la imagen con el texto (caption) que incluye la información del canal
  await conn.sendMessage(m.chat, { 
    image: buffer,
    caption: mensaje,
    mimetype: 'image/jpeg'
  }, { quoted: m });

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
