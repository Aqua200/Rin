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
  
  // Definir variables para el mensaje y canal
  const newsletterName = 'Seguirme bb 😘';
  
  // Mensaje que se mostrará en el texto (caption)
  let txt = `*💞 Creador de la Bot 💋*\n\n`;
  txt += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;
  txt += `• *${displayName}*\n📄 ${bio}\n\n`;
  txt += `Canal: ${newsletterName}\n\n`;
  
  // Descargamos la imagen desde la URL
  const imageUrl = 'https://qu.ax/DnkVz.jpg';
  const response = await fetch(imageUrl);
  const img = await response.buffer();
  
  // Variables adicionales para sendAi
  const botname = "MiBot";       // Cambia este valor según tu bot
  const textbot = "Texto Bot";   // Cambia este valor según prefieras
  const canal = newsletterName;  // En este ejemplo, canal es el mismo newsletterName
  
  // Enviamos el mensaje usando sendAi (los parámetros pueden variar según tu implementación)
  await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m);
  
  // Reaccionamos al mensaje con el emoji de verificación
  await m.react('✅');
  
  // Opcional: enviar el contacto del owner en formato VCARD
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
