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

  // Construir el mensaje de texto
  let txt = `*💞 Creador de la Bot 💋*\n\n`;
  txt += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴄɪᴏ́ɴ\n\n`;
  txt += `• *${displayName}*\n📄 ${bio}\n\n`;

  // Descargar la imagen desde la URL
  const imageUrl = 'https://qu.ax/DnkVz.jpg';
  const response = await fetch(imageUrl);
  const img = await response.buffer();

  // Enlace directo al canal
  const canal = '120363206717994793@newsletter';  // ID del canal
  const canalLink = `https://chat.whatsapp.com/${canal}`;  // Enlace directo al canal

  // Crear el mensaje con el enlace al canal en un botón
  const message = {
    image: img,
    caption: txt,
    footer: 'Pulsa el botón para unirte al canal',
    buttons: [
      {
        buttonId: `join_${canal}`, // ID del canal
        buttonText: { displayText: 'Unirse al Canal' }, // Texto del botón
        type: 1
      }
    ],
    headerType: 4
  };

  // Enviar el mensaje con el botón para unirse al canal
  await conn.sendMessage(m.chat, message, { quoted: m });

  // Reaccionar al mensaje
  await m.react('✅');
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
