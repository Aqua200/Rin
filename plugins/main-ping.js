import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn }) => {
    let timestamp = speed();
    let latensi = speed() - timestamp;
    exec(`neofetch --stdout`, (error, stdout, stderr) => {
        let child = stdout.toString("utf-8");
        let ssd = child.replace(/Memory:/, "Ram:");

        // Mensaje de latencia y sistema
        let text = '*`☁️ Mi Velocidad es de:`*' + ` ${latensi.toFixed(4)} _ms_` + '\n' + `\n${ssd}`;

        // Enviar la imagen con el mensaje
        let pp = './storage/img/miniurl.jpg';
        conn.sendFile(m.chat, pp, 'thumbnail.jpg', text.trim(), m, null, null); // rcanal no está definido, lo dejamos como null por ahora
    });
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed', 'p']

export default handler
