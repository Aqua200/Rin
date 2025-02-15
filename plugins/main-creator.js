let handler = async (m, { conn, usedPrefix, isOwner }) => {
  // URL de la imagen que deseas enviar
  let imageUrl = 'https://qu.ax/CDFVv.jpg'; // Cambia esta URL por la imagen que desees

  // Enviar el mensaje de información con la imagen
  await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: '🌹info de la bot✨' }, { quoted: m });

  // VCard del propietario
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Daniel 🇦🇱;;\nFN:Daniel 🇦🇱\nORG:Daniel 🇦🇱\nTITLE:\nitem1.TEL;waid=51955918117:51955918117\nitem1.X-ABLabel:Daniel 🇦🇱\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Daniel 🇦🇱\nEND:VCARD`;

  // Enviar el vcard
  await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] } }, { quoted: m });
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler;
