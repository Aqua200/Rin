import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '🌸 Información',
  'search': '🔍 Búsquedas',
  'game': '🎮 Juegos',
  'serbot': '🤖 Sub Bots',
  'rpg': '✨ RPG',
  'rg': '📂 Registro',
  'sticker': '🏞 Stickers',
  'img': '📸 Imágenes',
  'group': '👥 Grupos',
  'logo': '🎨 Logos',
  'nable': '📴 On / Off', 
  'downloader': '📥 Descargas',
  'tools': '🛠 Herramientas',
  'fun': '🎭 Diversión',
  'nsfw': '🔞 NSFW', 
  'owner': '👑 Creadora', 
  'audio': '🔊 Audios', 
  'advanced': '💎 Avanzado',
}

const defaultMenu = {
  before: `
╭───────────🌸✧˚·  
│  𝑯𝒐𝒍𝒂, *%name*! 💖  
│  🌷 ¿𝑪𝒐́𝒎𝒐 𝒆𝒔𝒕𝒂́𝒔 𝒉𝒐𝒚?  
│  ☁️ Espero que tengas un *día hermoso*.  
╰───────────🌸✧˚·  

┏━━━━━━━━━━━━━━━❀
┃ *🌟 𝑻𝒖 𝑰𝒏𝒇𝒐:*  
┃ 💖 Nombre: *%name*  
┃ 🍭 Dulces: *%limit*  
┃ ✨ XP: *%totalexp*  
┃ 🌟 Nivel: *%level*  
┗━━━━━━━━━━━━━━━❀  

🌸 *𝑴𝑬𝑵𝑼́ 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺* 🌸
`.trimStart(),
  header: '🌸✧˚· *%category* ✧˚·🌸',
  body: '❀ ✨ *%cmd*\n',
  footer: '🌷✧˚·────────────✧˚·💖\n',
  after: '',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      level, limit, name, week, date, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    // Lista de imágenes aleatorias
    let images = [
      './storage/img/miniurl.jpg',
      './storage/img/Anika.jpg',
      './storage/img/Anikabot.jpg', 
      './storage/img/Anikanew.jpg'
    ];

    // Seleccionar una imagen aleatoria
    let randomImage = images[Math.floor(Math.random() * images.length)];

    // Enviar menú con imagen aleatoria
    await conn.sendFile(m.chat, randomImage, 'thumbnail.jpg', text.trim(), m);

  } catch (e) {
    conn.reply(m.chat, 'Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
