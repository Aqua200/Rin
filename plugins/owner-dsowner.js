import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import fetch from 'node-fetch';
import { createWriteStream } from 'fs';

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: '🍭 Este comando solo puede ser utilizado en el bot principal.'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: '🍭 Iniciando...'}, {quoted: m});
  const sessionPath = './sessions';
  try {
    if (!existsSync(sessionPath)) {
      return await conn.sendMessage(m.chat, {text: '🍭 La carpeta sessions no existe o está vacía.'}, {quoted: m});
    }
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: '🍭 No se encontró ningún archivo para eliminar en la carpeta sessions.'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `🍭 Se eliminaron ${filesDeleted} archivos.`}, {quoted: m});
    }
  } catch {
    await conn.sendMessage(m.chat, {text: '🍭 Ocurrió un error al eliminar los archivos de sesión.'}, {quoted: m});
  }

  // URL del archivo MP4
  const mp4Url = 'https://example.com/video.mp4'; // Reemplaza con la URL del archivo MP4
  const mp4Path = './input.mp4'; // Ruta donde se guardará el archivo MP4 descargado
  const gifPath = './output.gif'; // Ruta del archivo GIF

  // Descargar el archivo MP4 desde la URL
  const response = await fetch(mp4Url);
  if (!response.ok) {
    throw new Error(`Error al descargar el archivo: ${response.statusText}`);
  }
  const fileStream = createWriteStream(mp4Path);
  response.body.pipe(fileStream);

  fileStream.on('finish', () => {
    // Convertir MP4 a GIF
    exec(`ffmpeg -i `${{mp4Path} -vf "fps=10,scale=320:-1:flags=lanczos"}$`{gifPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al convertir el archivo: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`ffmpeg stderr: ${stderr}`);
      }
      console.log(`Archivo convertido con éxito: ${stdout}`);
      conn.sendMessage(m.chat, {text: `¡Hola! ¿Ahora me ves?`}, {quoted: m});
    });
  });

  fileStream.on('error', (error) => {
    console.error(`Error al guardar el archivo: ${error.message}`);
  });
};

//handler.tags = ['owner']
//handler.help = ['dsowner']
handler.command = /^(del_reg_in_session_owner|dsowner|clearallsession)$/i;
handler.rowner = true;
export default handler;
