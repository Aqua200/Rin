let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
	
let kickte = `Ehm... *perdón por molestar*... ¿Podrías decirme a quién quieres eliminar? 🥺 *Si no es mucha molestia...* 💗`

if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)}) 
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
