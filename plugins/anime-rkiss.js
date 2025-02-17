import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let who
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    } else {
        who = m.chat
    }
    
    if (!who) throw `✳️ Menciona a alguien para darle un beso.\n\n📌 Ejemplo: ${usedPrefix + command} @usuario`

    let name = conn.getName(who) 
    let name2 = conn.getName(m.sender) 
    m.react('⏳') // Reacción de espera

    try {
        let rki = await fetch(`https://api.waifu.pics/sfw/kiss`)
        if (!rki.ok) throw await rki.text()
        
        let jkis = await rki.json()
        let { url } = jkis
        let stiker = await sticker(null, url, `(${name2}) le da un beso a (${name})`, `${name}`)
        
        await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
        m.react('😚') // Reacción final
    } catch (err) {
        throw '❌ Hubo un error al obtener la imagen. Inténtalo de nuevo más tarde.'
    }
}

handler.help = ['kiss @tag']
handler.tags = ['anime']
handler.command = /^(kiss|beso)$/i
handler.diamond = true
handler.group = true

export default handler
