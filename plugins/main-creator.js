let handler = async (m, { conn, usedPrefix, isOwner }) => {
  // URL de la imagen original
  let imageUrl = 'https://qu.ax/CDFVv.jpg'; // Cambia esta URL por la imagen que desees

  // URL redimensionada usando imgix
  let resizedImageUrl = `https://qu.ax/CDFVv.jpg?w=300&h=300&fit=crop`; // Redimensiona la imagen a 300x300px

  // Enviar el mensaje de información con la imagen redimensionada
  await conn.sendMessage(m.chat, { image: { url: resizedImageUrl }, caption: '🌹info de la bot✨' }, { quoted: m });

  // VCard del propietario
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Daniel 🇦🇱;;\nFN:Daniel 🇦🇱\nORG:Daniel 🇦🇱\nTITLE:\nitem1.TEL;waid=51955918117:51955918117\nitem1.X-ABLabel:Daniel 🇦🇱\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Daniel 🇦🇱\nEND:VCARD`;

  // Enviar el vcard
  await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] } }, { quoted: m });
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler;
