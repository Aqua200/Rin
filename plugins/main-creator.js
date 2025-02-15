import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // Lista de contactos oficiales (Asegúrate de definir 'global.official' en tu bot)
  const contacts = global.official.filter(([_, __, status]) => status === 1);
  const lista = [];

  for (const contact of contacts) {
    const [number, name] = contact;
    const jid = `${number}@s.whatsapp.net`;
    const displayName = await conn.getName(jid);
    const biografia = await conn.fetchStatus(jid).catch(() => null);
    const bio = biografia?.status || "Sin descripción";

    lista.push({ number, name: displayName || name || "Desconocido", bio });
  }

  // Mensaje de introducción
  let mensaje = `*💞 Creador de la Bot 💋*\n\n`;
  mensaje += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;

  for (const { number, name, bio } of lista) {
    mensaje += `• *${name}*\n📞 +${number}\n📄 ${bio}\n\n`;
  }

  // Enviar mensaje con los contactos
  await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

  // Enviar contactos en formato VCARD
  for (const { number, name, bio } of lista) {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nTEL;waid=${number}:${number}\nX-ABLabel:${bio}\nEND:VCARD`;

    await conn.sendMessage(m.chat, { 
      contacts: { 
        displayName: name, 
        contacts: [{ vcard }] 
      }
    }, { quoted: m });
  }
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
