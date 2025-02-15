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
  
  // Variables para el mensaje y botón
  const botname = "MiBot";       // Cambia según corresponda
  const textbot = "Texto Bot";   // Cambia según corresponda
  
  // Construimos el mensaje de texto (caption)
  let txt = `*💞 Creador de la Bot 💋*\n\n`;
  txt += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;
  txt += `• *${displayName}*\n📄 ${bio}\n\n`;
  
  // Descargamos la imagen desde la URL
  const imageUrl = 'https://qu.ax/DnkVz.jpg';
  const response = await fetch(imageUrl);
  const img = await response.buffer();
  
  // Definimos el botón para el canal
  const canalButton = {
    buttonId: '120363392571425662@newsletter', 
    buttonText: { displayText: 'Canal' }, 
    type: 1
  };

  // Enviamos el mensaje usando sendAi (asegúrate de que esta función acepte un objeto botón)
  await conn.sendAi(m.chat, botname, textbot, txt, img, img, canalButton, m);
  
  // Reaccionamos al mensaje
  await m.react('✅');
  
  // Enviar opcionalmente el contacto en formato VCARD
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
