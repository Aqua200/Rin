let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
	
let kickte = `Ehm... *perdón por molestar*... ¿Podrías decirme a quién quieres eliminar? 🥺 *Si no es mucha molestia...* 💗`

if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)})

// Verificación para asegurarse de que el comando siga funcionando incluso si el chat está baneado
let isBanned = global.db.data.chats[m.chat].isBanned || false
if (isBanned) {
  return m.reply("¡Lo siento mucho! 😔 El chat está actualmente baneado, por lo que no puedo realizar esta acción. 💖")
}

let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
m.reply(`*¡Oh no! Lo siento mucho... El usuario fue eliminado...* 😔💗 *Espero que no me odies...* 🥺🌸`)
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = ['kick', 'expulsar'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
