import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, { text: '🍭 Este comando solo puede ser utilizado en el bot principal.' }, { quoted: m });
  }

  await conn.sendMessage(m.chat, { text: '🍭 Iniciando...' }, { quoted: m });

  const sessionPath = './sessions';

  try {
    if (!existsSync(sessionPath)) {
      return await conn.sendMessage(m.chat, { text: '🍭 La carpeta sessions no existe o está vacía.' }, { quoted: m });
    }

    const files = await fs.readdir(sessionPath);

    if (files.length === 0) {
      return await conn.sendMessage(m.chat, { text: '🍭 La carpeta sessions está vacía.' }, { quoted: m });
    }

    let filesDeleted = 0;
    let filesList = 'Archivos en la carpeta sessions:\n';

    for (const file of files) {
      filesList += `- ${file}\n`;
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }

    await conn.sendMessage(m.chat, { text: filesList }, { quoted: m });

    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, { text: '🍭 No se encontró ningún archivo para eliminar en la carpeta sessions.' }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: `🍭 Se eliminaron ${filesDeleted} archivos.` }, { quoted: m });
    }

    // Enviar mensaje con GIF desde URL
    const gifUrl = 'https://example.com/path/to/your/image.gif'; // Reemplaza con la URL de tu GIF
    await conn.sendMessage(m.chat, { video: { url: gifUrl }, gifPlayback: true, caption: '¡Hola! ¿Ahora me ves?' }, { quoted: m });

  } catch (error) {
    console.error('Error al eliminar archivos de sesión:', error);
    await conn.sendMessage(m.chat, { text: '🍭 Hubo un error al ejecutar el comando.' }, { quoted: m });
  }
};

// Cambiar el nombre del comando a dsowneranix
handler.command = new RegExp(`^(`${{prefix}del_reg_in_session_owner|}$`{prefix}dsowneranix|`${{prefix}clearallsession)}$``, 'i');
handler.rowner = true;

export default handler;
