import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // Definimos el número y nombre del único owner aquí
  const contact = ["5216631079388", "Neykoor", 1]; // Número y nombre del único owner
  
  const [number, name] = contact;
  const jid = `${number}@s.whatsapp.net`;
  const displayName = await conn.getName(jid).catch(() => name || "Desconocido");
  const biografia = await conn.fetchStatus(jid).catch(() => null);
  const bio = biografia?.status || "Sin descripción";

  let mensaje = `*💞 Creador de la Bot 💋*\n\n`;
  mensaje += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;

  // Solo mostramos el mensaje del único owner
  mensaje += `• *${displayName}*\n📞 +${number}\n📄 ${bio}\n\n`;

  await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

  // Enviar el contacto del único owner en formato VCARD
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${displayName};;;\nFN:${displayName}\nORG:${displayName}\nTITLE:\nTEL;waid=${number}:${number}\nX-ABLabel:${bio}\nEND:VCARD`;

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
