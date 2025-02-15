import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  // Definir variables que faltan
  const wm = "Tu mensaje o firma aquí"; // Definir wm
  const bot = "Anika Bot"; // Definir nombre del bot
  const ig = "Instagram: @tuInstagram"; // Tu cuenta de Instagram
  const fb = "Facebook: @tuFacebook"; // Tu cuenta de Facebook
  const imagen2 = "url_de_imagen"; // URL de la imagen para el anuncio
  const md = "https://enlace.com"; // Un enlace o URL para usar en el anuncio
  const fkontak = { /* tu objeto de contacto */ }; // Asegúrate de que esto esté correctamente definido

  // Verificar si global.official está definido y es un array
  const contacts = Array.isArray(global.official) ? global.official.filter(([_, __, status]) => status === 1) : [];

  const lista = [];
  
  for (const contact of contacts) {
    const [number, name, status] = contact;
    const jid = `${number}@s.whatsapp.net`;
    const displayName = await conn.getName(jid);
    const biografia = await conn.fetchStatus(jid).catch(() => null);
    const bio = biografia?.status || "Sin descripción";

    lista.push({ number, name: displayName || name || "Desconocido", bio });
  }

  let cat = `${wm}
* ${bot}

*---------------------*

*💞 Creador de la bot𝖎 💋*
*${ig}*

*Creador Neykoor*
${fb}

*---------------------*

> ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪᴏɴ sᴇ ᴇɴᴠɪᴀʀᴀɴ ʟᴏs ᴄᴏɴᴛᴀᴄᴛᴏs ᴅᴇ ᴍɪ ᴘʀᴏᴘɪᴇᴛᴀʀɪ@ / ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs`

  for (const item of lista) {
    const { number, name, bio } = item;
    cat += `• ${name}\n   📞 +${number}\n   📄 ${bio}\n\n`;
  }

  await conn.sendMessage(m.chat, { text: cat, contextInfo: { forwardedNewsletterMessageInfo: { 
        newsletterJid: '120363392571425662@newsletter', 
        serverMessageId: '', 
        newsletterName: 'Seguirme bb 😘'
      },
      forwardingScore: 9999999,
      isForwarded: true,   
      externalAdReply: {  
        showAdAttribution: true,  
        renderLargerThumbnail: true,  
        title: wm,   
        containsAutoReply: true,  
        mediaType: 1,   
        thumbnail: imagen2, 
        sourceUrl: md
      }
    } 
  }, { quoted: fkontak });

  for (const contact of lista) {
    const { number, name, bio } = contact;
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nTEL;waid=${number}:${number}\nX-ABLabel:${bio}\nEND:VCARD`;
    await conn.sendMessage(m.chat, { 
      contacts: { 
        displayName: name, 
        contacts: [{ vcard }] 
      }
    }, { quoted: m });
  }
};

handler.help = ['owner', 'creator', 'creador', 'dueño', 'fgowner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño', 'fgowner'];

export default handler;
