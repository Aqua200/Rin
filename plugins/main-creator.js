import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // Definimos el número y nombre del único owner aquí
  const contact = ["526631079388", "Anika Dm", 1]; // Número y nombre del único owner
  
  const [number, name] = contact;
  const jid = `${number}@s.whatsapp.net`;
  
  let displayName;
  try {
    displayName = await conn.getName(jid); // Obtenemos el nombre del contacto
  } catch (err) {
    displayName = name || "Desconocido"; // Si ocurre un error, usamos el nombre por defecto
  }

  let bio = "Sin descripción";
  try {
    const biografia = await conn.fetchStatus(jid); // Obtenemos la biografía del contacto
    bio = biografia?.status || bio; // Si tiene biografía, la usamos
  } catch (err) {
    bio = "Sin descripción"; // Si no tiene biografía, usamos el valor por defecto
  }

  let mensaje = `*💞 Creador de la Bot 💋*\n\n`;
  mensaje += `> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏ́ɴ sᴇ ᴇɴᴠɪᴀʀᴀ́ɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs\n\n`;

  // Solo mostramos el mensaje del único owner sin repetir el número
  mensaje += `• *${displayName}*\n📄 ${bio}\n\n`;

  // Descargar la imagen de la URL
  const imageUrl = 'https://qu.ax/DnkVz.jpg';
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();

  // Enviar el mensaje con la imagen descargada
  await conn.sendMessage(m.chat, { 
    text: mensaje, 
    image: buffer, // Usamos el buffer de la imagen descargada
    caption: 'Aquí está la imagen de bienvenida' // Puedes poner un texto adicional en la imagen
  }, { quoted: m });

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
