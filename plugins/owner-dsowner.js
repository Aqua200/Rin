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
  } catch (error) {
    console.error('Error al eliminar archivos de sesión:', error);
    await conn.sendMessage(m.chat, { text: '🍭 Ocurrió un error al eliminar los archivos de sesión.' }, { quoted: m });
  }

  await conn.sendMessage(m.chat, { text: `¡Hola! ¿Ahora me ves?` }, { quoted: m });
};

//handler.tags = ['owner']
//handler.help = ['dsowner']
handler.command = /^(del_reg_in_session_owner|dsowner|clearallsession)$/i;
handler.rowner = true;

export default handler;
