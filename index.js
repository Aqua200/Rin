console.log('Iniciando 🚀🚀🚀');

import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';
import path from 'path';
import os from 'os';
import { promises as fsPromises } from 'fs';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('db.json')
const db = new Low(adapter)

await db.read()
db.data ||= { users: [] }
await db.write()

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('China-Mitzuki-Bot-MD', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
});
say(`Bot personalizado`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
});

var isRunning = false;

async function start(file) {
  if (isRunning) return;
  isRunning = true;

  const currentFilePath = new URL(import.meta.url).pathname;
  let args = [join(__dirname, file), ...process.argv.slice(2)];

  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  });

  setupMaster({ exec: args[0], args: args.slice(1) });
  let p = fork();

  p.on('message', (data) => {
    console.log('╭--------- - - - ✓\n┆ ✅ TIEMPO DE ACTIVIDAD ACTUALIZADA\n╰-------------------- - - -', data);
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('⚠️ ERROR ⚠️ >> ', code);
    start('start.js');

    if (code === 0) return;
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
  const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
  const packageJsonPath = path.join(path.dirname(currentFilePath), './package.json');

  try {
    const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
    const packageJsonObj = JSON.parse(packageJsonData);
    const currentTime = new Date().toLocaleString();
    let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';

    console.log(chalk.yellow(`╭${lineM}`));
    console.log(chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
    console.log(chalk.blueBright('┊') + chalk.yellow(`🖥️ ${os.type()}, ${os.release()} - ${os.arch()}`)); // 🔹 CORRECCIÓN AQUÍ
    console.log(chalk.blueBright('┊') + chalk.yellow(`💾 Total RAM: ${ramInGB.toFixed(2)} GB`));
    console.log(chalk.blueBright('┊') + chalk.yellow(`💽 Free RAM: ${freeRamInGB.toFixed(2)} GB`));
    console.log(chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
    console.log(chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
    console.log(chalk.blueBright('┊') + chalk.blue.bold('🟢 INFORMACIÓN :'));
    console.log(chalk.blueBright('┊') + chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
    console.log(chalk.blueBright('┊') + chalk.cyan(`💚 Nombre: ${packageJsonObj.name}`));
    console.log(chalk.blueBright('┊') + chalk.cyan(`𓃠 Versión: ${packageJsonObj.version}`));
    console.log(chalk.blueBright('┊') + chalk.cyan(`💜 Descripción: ${packageJsonObj.description}`));
    console.log(chalk.blueBright('┊') + chalk.cyan(`💕 Dueña : 𝕮𝖍𝖎𝖓𝖆 𝕸𝖎𝖙𝖟𝖚𝖐𝖎 💋`));
    console.log(chalk.blueBright('┊') + chalk.cyan(`ღ Project Author, bot personalizado hecho por:  ${packageJsonObj.author.name}`));
    console.log(chalk.blueBright('┊') + chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
    console.log(chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
    console.log(chalk.blueBright('┊') + chalk.cyan(`⏰ Hora Actual :`));
    console.log(chalk.blueBright('┊') + chalk.cyan(`${currentTime}`));
    console.log(chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
    console.log(chalk.yellow(`╰${lineM}`));

    setInterval(() => {}, 1000);
  } catch (err) {
    console.error(chalk.red(`❌ No se pudo leer el archivo package.json: ${err}`));
  }

  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim());
    });
}

start('start.js');
