import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // Datos del owner
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
  
  // Construir el mensaje de texto (caption)
  let txt = `*💞 Creador de la Bot 💋*\n\n`;
  txt += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;
  txt += `• *${displayName}*\n📄 ${bio}\n\n`;
  
  // Descargar la imagen desde la URL
  const imageUrl = 'https://qu.ax/DnkVz.jpg';
  const response = await fetch(imageUrl);
  const img = await response.buffer();
  
  // Crear el mensaje con botón usando templateButtons
  const buttonMessage = {
    image: img,
    caption: txt,
    footer: 'Pulsa el botón para acceder al canal',
    templateButtons: [
      {
        index: 1,
        quickReplyButton: {
          displayText: 'Canal',
          id: '120363392571425662@newsletter'
        }
      }
    ]
  };
  
  // Enviar el mensaje con el botón
  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
  
  // Reaccionar al mensaje
  await m.react('✅');
  
  // Opcional: Enviar el contacto en formato VCARD
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
    contacts: { displayName, contacts: [{ vcard }] } 
  }, { quoted: m });
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
