let images = [
  './storage/img/miniurl.jpg',    // Primera imagen
  './storage/img/Anika.jpg'    // Segunda imagen
];

let randomImage = images[Math.floor(Math.random() * images.length)];

await conn.sendFile(m.chat, randomImage, 'thumbnail.jpg', text.trim(), m, null, rcanal);
