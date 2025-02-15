import sharp from 'sharp';
import axios from 'axios';
import fs from 'fs';

let handler = async (m, { conn, usedPrefix, isOwner }) => {
  // URL de la imagen original
  let imageUrl = 'https://qu.ax/CDFVv.jpg'; // URL de la imagen

  // Descargar la imagen
  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  // Redimensionar la imagen usando sharp
  let buffer = await sharp(response.data)
    .resize(300) // Cambia 300 por el tamaño que desees
    .toBuffer();

  // Enviar el mensaje de información con la imagen redimensionada
  await conn.sendMessage(m.chat, { image: { url: buffer }, caption: '🌹info de la bot✨' }, { quoted: m });

  // VCard del propietario
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Daniel 🇦🇱;;\nFN:Daniel 🇦🇱\nORG:Daniel 🇦🇱\nTITLE:\nitem1.TEL;waid=51955918117:51955918117\nitem1.X-ABLabel:Daniel 🇦🇱\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Daniel 🇦🇱\nEND:VCARD`;

  // Enviar el vcard
  await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] } }, { quoted: m });
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler;
